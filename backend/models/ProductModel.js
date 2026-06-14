//ProductModel.js

import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product Title is Required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is Required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is Required"],
      enum: [
        "Electronics",
        "Books",
        "Furniture",
        "Cycles",
        "Sports",
        "Clothing",
        "Accessories",
        "Others",
      ],
    },

    price: {
      type: Number,
      required: [true, "Price is Required"],
      min: [1, "Price must be greater than 0"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number",
      },
      default: 1,
    },

    condition: {
      type: String,
      required: [true, "Condition is Required"],
      enum: ["New", "Like New", "Good", "Fair"],
    },

    image: {
      type: String,
      required: [true, "Product Image is Required"],
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD"],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model("Product", productSchema);
