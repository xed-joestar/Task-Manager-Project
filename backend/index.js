import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ REGISTER ROUTES BEFORE listen
app.use("/api/auth", authRoutes);

// ✅ START SERVER LAST
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
