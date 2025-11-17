import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running and connected to MongoDB!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
