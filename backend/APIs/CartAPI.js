//CartAPI.js

import exp from "express";
import { isValidObjectId } from "mongoose";

import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const cartApp = exp.Router();

// Add to cart
cartApp.post("/:productId",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      const { productId } = req.params
      const requestedQuantity = Number(req.body.quantity || 1)
      if (!isValidObjectId(productId))
        return res.status(400).json({message: "Invalid Product ID"})
      if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1)
        return res.status(400).json({message: "Quantity must be at least 1"})
      // Check product exists
      const product = await ProductModel.findById(productId)
      if (!product) 
        return res.status(404).json({message: "Product Not Found"})
      const availableQuantity = product.quantity ?? 1
      if (product.seller.toString() === req.user.id)
        return res.status(400).json({message: "You cannot add your own product to cart"})
      // Prevent adding sold products
      if (product.status === "SOLD") 
        return res.status(400).json({message: "Product is already sold"})
      if (availableQuantity < 1)
        return res.status(400).json({message: "Product is out of stock"})
      if (requestedQuantity > availableQuantity)
        return res.status(400).json({message: `Only ${availableQuantity} item(s) available`})
      // Check duplicate
      const alreadyExists = await CartModel.findOne({user: req.user.id,product: productId})
      if (alreadyExists) {
        const nextQuantity = alreadyExists.quantity + requestedQuantity
        if (nextQuantity > availableQuantity)
          return res.status(400).json({message: `Only ${availableQuantity} item(s) available`})
        alreadyExists.quantity = nextQuantity
        await alreadyExists.save()
        return res.status(200).json({message: "Cart quantity updated",payload: alreadyExists})
      }
      const cartItem = await CartModel.create({user: req.user.id,product: productId,quantity: requestedQuantity})
      res.status(201).json({message: "Product added to cart",payload: cartItem})
    } catch (err) {
      next(err)
    }
  }
)

// Get my cart
cartApp.get("/",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      const cartItems = await CartModel.find({user: req.user.id,}).populate({
        path: "product",
        populate: {
          path: "seller",
          select: "name email mobile studentId"
        }
      })
      res.status(200).json({message: "Cart fetched successfully",payload: cartItems})
    } catch (err) {
      next(err)
    }
  }
)

// Update cart item quantity
cartApp.put("/item/:cartItemId",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.cartItemId))
        return res.status(400).json({message: "Invalid Cart Item ID"})
      const quantity = Number(req.body.quantity)
      if (!Number.isInteger(quantity) || quantity < 1)
        return res.status(400).json({message: "Quantity must be at least 1"})
      const cartItem = await CartModel.findOne({user: req.user.id,_id: req.params.cartItemId}).populate("product")
      if (!cartItem)
        return res.status(404).json({message: "Cart item not found"})
      if (!cartItem.product)
        return res.status(404).json({message: "Product unavailable"})
      const availableQuantity = cartItem.product.quantity ?? 1
      if (cartItem.product.status === "SOLD" || availableQuantity < 1)
        return res.status(400).json({message: "Product is out of stock"})
      if (quantity > availableQuantity)
        return res.status(400).json({message: `Only ${availableQuantity} item(s) available`})
      cartItem.quantity = quantity
      await cartItem.save()
      res.status(200).json({message: "Cart quantity updated",payload: cartItem})
    } catch (err) {
      next(err)
    }
  }
);

// Remove cart item
cartApp.delete("/item/:cartItemId",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.cartItemId))
        return res.status(400).json({message: "Invalid Cart Item ID"})
      const deletedItem = await CartModel.findOneAndDelete({user: req.user.id,_id: req.params.cartItemId})
      if (!deletedItem)
        return res.status(404).json({message: "Cart item not found"})
      res.status(200).json({message: "Product removed from cart"})
    } catch (err) {
      next(err)
    }
  }
);

// Remove from cart by product id
cartApp.delete("/:productId",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      if (!isValidObjectId(req.params.productId))
        return res.status(400).json({message: "Invalid Product ID"})
      const deletedItem = await CartModel.findOneAndDelete({user: req.user.id,product: req.params.productId})
      if (!deletedItem) 
        return res.status(404).json({message: "Product not found in cart"})
      res.status(200).json({message: "Product removed from cart"})
    } catch (err) {
      next(err)
    }
  }
);

// Delete entire cart
cartApp.delete("/",verifyToken("STUDENT", "ADMIN"),async (req, res, next) => {
    try {
      await CartModel.deleteMany({user: req.user.id })
      res.status(200).json({message: "Cart cleared successfully"})
    } catch (err) {
      next(err)
    }
  }
)
