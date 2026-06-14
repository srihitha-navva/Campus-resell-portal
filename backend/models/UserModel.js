//UserModel.js

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
      trim: true,
    },

    studentId: {
      type: String,
      required: [true, "Student ID Required"],
      unique: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: [true, "Mobile Number Required"],
      match: [/^[0-9]{10}$/, "Enter valid mobile number"],
    },

    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter valid email"],
    },

    password: {
      type: String,
      required: [true, "Password Required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    profilePic: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["STUDENT", "ADMIN"],
      default: "STUDENT",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", userSchema);