// CommonAPI.js

import exp from "express";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const { sign } = jwt;

export const commonApp = exp.Router();

// Register
commonApp.post(
  "/users",
  upload.single("profilePic"),
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      const newUser = req.body;

      if (!newUser.password)
        return res.status(400).json({ message: "Password Required" });

      // Always register as STUDENT
      newUser.role = "STUDENT";

      // Upload profile picture
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        newUser.profilePic = cloudinaryResult.secure_url;
      }

      // Hash password
      newUser.password = await hash(newUser.password, 10);

      // Create user
      const createdUser = await UserModel.create(newUser);

      // Generate JWT
      const token = sign(
        {
          id: createdUser._id,
          email: createdUser.email,
          role: createdUser.role
        },
        process.env.SECRET_KEY,
        { expiresIn: "10h" }
      );

      // Store token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });

      const userObj = createdUser.toObject();
      delete userObj.password;

      res.status(201).json({
        message: "User Registered Successfully",
        payload: userObj
      });
    } catch (err) {
      console.log(err);

      // Rollback uploaded image
      if (cloudinaryResult?.public_id)
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);

      next(err);
    }
  }
);

// Login
commonApp.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatched = await compare(password, user.password);

    if (!isMatched)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ message: "Login Successful", payload: userObj });
  } catch (err) {
    next(err);
  }
});

// Logout
commonApp.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.status(200).json({ message: "Logout Successful" });
});

// Change Password
commonApp.put(
  "/password",
  verifyToken("STUDENT", "ADMIN"),
  async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword)
        return res.status(400).json({
          message: "Current password and new password are required"
        });

      const user = await UserModel.findById(req.user.id);

      if (!user) return res.status(404).json({ message: "User Not Found" });

      const isCurrentPasswordCorrect = await compare(
        currentPassword,
        user.password
      );

      if (!isCurrentPasswordCorrect)
        return res.status(400).json({ message: "Current Password Incorrect" });

      const isSamePassword = await compare(newPassword, user.password);

      if (isSamePassword)
        return res.status(400).json({
          message: "New Password cannot be same as Old Password"
        });

      user.password = await hash(newPassword, 10);
      await user.save();

      res.status(200).json({ message: "Password Updated Successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Page Refresh
commonApp.get(
  "/check-auth",
  verifyToken("STUDENT", "ADMIN"),
  async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id).select("-password");

      if (!user) return res.status(404).json({ message: "User Not Found" });

      res
        .status(200)
        .json({ message: "Authenticated", payload: user });
    } catch (err) {
      next(err);
    }
  }
);
