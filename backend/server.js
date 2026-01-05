import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // auth routes
import userRoutes from "./routes/userRoutes.js";
// import vehicleRoutes from "./routes/vehicleRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

import path from "path";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running and connected to MongoDB!");
});

// Auth routes
app.use("/api/auth", authRoutes);

//User profile routes
app.use("/api/user", userRoutes);

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//Vehicle routes
// app.use("/api/vehicles", vehicleRoutes);

app.use("/api/listings", listingRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
