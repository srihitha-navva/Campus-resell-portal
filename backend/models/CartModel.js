//CartModel.js

import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number",
      },
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cartSchema.index({ user: 1, product: 1 }, { unique: true });

export const CartModel = model("Cart", cartSchema);
