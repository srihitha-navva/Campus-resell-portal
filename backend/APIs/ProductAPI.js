// ProductAPI.js

import exp from "express";
import { isValidObjectId } from "mongoose";
import { ProductModel } from "../models/ProductModel.js";
import { CartModel } from "../models/CartModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

export const productApp = exp.Router();

//Add Product
productApp.post("/",verifyToken("STUDENT", "ADMIN"),upload.single("image"),async (req, res, next) => {
    let cloudinaryResult
    try {
      const product = req.body
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer)
        product.image = cloudinaryResult.secure_url
      }
      product.seller = req.user.id
      const createdProduct = await ProductModel.create(product)
      res.status(201).json({message: "Product Added Successfully",payload: createdProduct})
    } catch (err) {
      if (cloudinaryResult?.public_id) 
        await cloudinary.uploader.destroy(cloudinaryResult.public_id)
      next(err)
    }
  }
)

//Get all Products
productApp.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find({status: "AVAILABLE",}).populate("seller", "name email mobile studentId")
    res.status(200).json({payload: products,})
  } catch (err) {
    next(err)
  }
})

//Get my Products
productApp.get("/my/products",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      const products = await ProductModel.find({seller: req.user.id})
      res.status(200).json({payload: products})
    } catch (err) {
      next(err)
    }
  }
)

//Get single Product
productApp.get("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({message: "Invalid Product ID"})
    const product = await ProductModel.findById(req.params.id).populate("seller","name email mobile studentId")
    if (!product) 
      return res.status(404).json({message: "Product Not Found"})
    res.status(200).json({payload: product})
  } catch (err) {
    next(err)
  }
})

//Update Product
productApp.put("/:id",verifyToken("STUDENT", "ADMIN"),upload.single("image"),async (req, res, next) => {
    let cloudinaryResult
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid Product ID"})
      const product = await ProductModel.findById(req.params.id)
      if (!product) 
        return res.status(404).json({message: "Product Not Found"})
      if (product.seller.toString() !== req.user.id && req.user.role !== "ADMIN")
    return res.status(403).json({message: "Unauthorized"})
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer)
        req.body.image = cloudinaryResult.secure_url
      }
      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true })
      res.status(200).json({message: "Product Updated Successfully",payload: updatedProduct})
    } catch (err) {
      if (cloudinaryResult?.public_id)
        await cloudinary.uploader.destroy(cloudinaryResult.public_id)
      next(err)
    }
  }
)

// Delete Product
productApp.delete("/:id",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid Product ID"})
      const product = await ProductModel.findById(req.params.id)
      if (!product) 
        return res.status(404).json({message: "Product Not Found"})
      if (product.seller.toString() !== req.user.id && req.user.role !== "ADMIN")
        return res.status(403).json({message: "Unauthorized"})
      await ProductModel.findByIdAndDelete(req.params.id)
      await CartModel.deleteMany({product: req.params.id})
      res.status(200).json({message: "Product Deleted Successfully"})
    } catch (err) {
      next(err)
    }
  }
)

// Mark as sold (soft delete)
productApp.patch("/sold/:id",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.id))
        return res.status(400).json({message: "Invalid Product ID"})
      const product = await ProductModel.findById(req.params.id)
      if (!product) 
        return res.status(404).json({message: "Product Not Found"})
     if (product.seller.toString() !== req.user.id && req.user.role !== "ADMIN")
        return res.status(403).json({message: "Unauthorized"})
      product.status = "SOLD"
      await product.save()
      res.status(200).json({message: "Product Marked As Sold",payload: product})
    } catch (err) {
      next(err)
    }
  }
)
