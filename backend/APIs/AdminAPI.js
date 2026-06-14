// AdminAPI.js

import exp from "express";
import { isValidObjectId } from "mongoose";
import { UserModel } from "../models/UserModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { CartModel } from "../models/CartModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const adminApp = exp.Router();

// Dashboard
adminApp.get("/dashboard",verifyToken("ADMIN"),async (req, res, next) => {
    try {
      const totalUsers = await UserModel.countDocuments()
      const totalProducts = await ProductModel.countDocuments()
      const availableProducts = await ProductModel.countDocuments({status: "AVAILABLE"})
      const soldProducts = await ProductModel.countDocuments({status: "SOLD"})
      res.status(200).json({message: "Dashboard Data",payload:{
          totalUsers,
          totalProducts,
          availableProducts,
          soldProducts,
        }})
    } catch (err) {
      next(err)
    }
  }
)

// Get all users
adminApp.get("/users",verifyToken("ADMIN"),async (req, res, next) => {
    try {
      const users = await UserModel.find().select("-password")
      res.status(200).json({message: "Users List",payload: users})
    } catch (err) {
      next(err)
    }
  }
)

// Get single user
adminApp.get("/users/:id",verifyToken("ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid User ID"})
      const user = await UserModel.findById(req.params.id).select("-password")
      if (!user) 
        return res.status(404).json({message: "User Not Found"})
      res.status(200).json({payload: user})
    } catch (err) {
      next(err)
    }
  }
)

// Delete user
adminApp.delete("/users/:id",
  verifyToken("ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid User ID"})
      const user = await UserModel.findById(req.params.id)
      if (!user) 
        return res.status(404).json({message: "User Not Found"})
      await UserModel.findByIdAndDelete(req.params.id)
      const products = await ProductModel.find({seller: req.params.id}).select("_id")
      const productIds = products.map((product) => product._id)
      await ProductModel.deleteMany({seller: req.params.id})
      await CartModel.deleteMany({
        $or: [
          {user: req.params.id},
          {product: {$in: productIds}},
        ],
      })
      res.status(200).json({message: "User Deleted Successfully"})
    } catch (err) {
      next(err)
    }
  }
)

// Get all products
adminApp.get("/products",verifyToken("ADMIN"),async (req, res, next) => {
    try {
      const products = await ProductModel.find().populate("seller","name email studentId")
      res.status(200).json({message: "Products List",payload: products})
    } catch (err) {
      next(err)
    }
  }
)

// Get single product
adminApp.get("/products/:id",verifyToken("ADMIN"),
  async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid Product ID"})
      const product = await ProductModel.findById(req.params.id).populate("seller","name email studentId")
      if (!product)
        return res.status(404).json({message: "Product Not Found"})
      res.status(200).json({payload: product})
    } catch (err) {
      next(err)
    }
  }
)

// Delete Product
adminApp.delete("/products/:id",verifyToken("ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid Product ID"})
      const product = await ProductModel.findById(req.params.id)
      if (!product) 
        return res.status(404).json({message: "Product Not Found"})
      await ProductModel.findByIdAndDelete(req.params.id)
      await CartModel.deleteMany({product: req.params.id})
      res.status(200).json({message: "Product Deleted Successfully"})
    } catch (err) {
      next(err)
    }
  }
)
