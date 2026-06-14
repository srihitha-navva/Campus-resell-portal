// server.js

import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { commonApp } from "./APIs/CommonAPI.js";
import { productApp } from "./APIs/ProductAPI.js";
import { cartApp } from "./APIs/CartAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";

config();

// Express App
const app = exp();

// Middlewares
app.use(
  cors({
    origin: "https://campus-resell-portal-gamma.vercel.app", 
    credentials: true,
  })
);

app.use(cookieParser());
app.use(exp.json());

// Routes
app.use("/common-api", commonApp);
app.use("/product-api", productApp);
app.use("/cart-api", cartApp);
app.use("/admin-api", adminApp);

// Default Route
app.get("/", (req, res) => {
  res.json({
    message: "Campus Resell Portal API Running Successfully 🚀",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];

    return res.status(409).json({
      message: `${field} already exists`,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Port
const PORT = process.env.PORT || 4000;

// DB Connection Flag
let isConnected = false;

// Connect MongoDB
const connectDB = async () => {
  if (isConnected) return;

  try {
    await connect(process.env.DB_URL);

    isConnected = true;

    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connection Failed");
    console.log(err.message);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer();
