import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// ✅ REGISTER ROUTES BEFORE listen
app.use("/api/auth", authRoutes);

// ✅ START SERVER LAST
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
