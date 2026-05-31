// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js"; // auth routes
// import userRoutes from "./routes/userRoutes.js";
// // import vehicleRoutes from "./routes/vehicleRoutes.js";
// import listingRoutes from "./routes/listingRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import visitRoutes from "./routes/visitRoutes.js";

// import path from "path";

// dotenv.config();

// const app = express();

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// // ✅ Routes
// app.get("/", (req, res) => {
//   res.send("🚀 Backend server is running and connected to MongoDB!");
// });

// // Auth routes
// app.use("/api/auth", authRoutes);

// //User profile routes
// app.use("/api/user", userRoutes);

// // app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// //Vehicle routes
// // app.use("/api/vehicles", vehicleRoutes);

// app.use("/api/listings", listingRoutes);

// app.use("/api/bookings", bookingRoutes);

// app.use("/api/visits", visitRoutes);

// app.use("/api/admin", adminRoutes);

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js"; // auth routes
// import userRoutes from "./routes/userRoutes.js";
// // import vehicleRoutes from "./routes/vehicleRoutes.js";
// import listingRoutes from "./routes/listingRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import visitRoutes from "./routes/visitRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import damageRoutes from "./routes/damageRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// import { Server } from "socket.io";
// import http from "http";

// import path from "path";

// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Adjust this in production to match your frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// // Attach Socket.IO to the req object so routes can use it if needed
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Store connected users (userId -> socketId)
// const userSocketMap = new Map();

// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   // User logs in / connects
//   socket.on("addUser", (userId) => {
//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(`👤 User ${userId} mapped to socket ${socket.id}`);
//     }
//   });

//   // Handle joining a specific conversation room
//   socket.on("joinRoom", (conversationId) => {
//     socket.join(conversationId);
//     console.log(`User joined room: ${conversationId}`);
//   });

//   // Handle sending message
//   socket.on(
//     "sendMessage",
//     ({ conversationId, senderId, receiverId, text, messageId, createdAt }) => {
//       // Send to everyone in the room (including sender to verify)
//       io.to(conversationId).emit("getMessage", {
//         _id: messageId,
//         conversationId,
//         sender: { _id: senderId }, // Simplified sender object for frontend state
//         text,
//         createdAt: createdAt || Date.now(),
//         isRead: false,
//       });

//       // If receiver is online but not in the room, we could emit a notification
//       const receiverSocketId = userSocketMap.get(receiverId);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("newMessageNotification", {
//           conversationId,
//           senderId,
//           text,
//         });
//       }
//     },
//   );

//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected:", socket.id);
//     // Remove from map
//     for (const [userId, socketId] of userSocketMap.entries()) {
//       if (socketId === socket.id) {
//         userSocketMap.delete(userId);
//         break;
//       }
//     }
//   });
// });

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// // ✅ Routes
// app.get("/", (req, res) => {
//   res.send("🚀 Backend server is running and connected to MongoDB!");
// });

// // Auth routes
// app.use("/api/auth", authRoutes);

// //User profile routes
// app.use("/api/user", userRoutes);

// // app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use(
//   "/uploads/invoices",
//   express.static(path.join(process.cwd(), "uploads", "invoices")),
// );
// app.use(
//   "/uploads/damage",
//   express.static(path.join(process.cwd(), "uploads", "damage")),
// );

// //Vehicle routes
// // app.use("/api/vehicles", vehicleRoutes);

// app.use("/api/listings", listingRoutes);

// app.use("/api/bookings", bookingRoutes);

// app.use("/api/visits", visitRoutes);

// app.use("/api/payments", paymentRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/damage", damageRoutes);

// app.use("/api/admin", adminRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/chat", chatRoutes);

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import damageRoutes from "./routes/damageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://jaum.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

// ✅ CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow Postman, server-to-server, and browser requests from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// ✅ Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach Socket.IO to req object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Store connected users
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("addUser", (userId) => {
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`👤 User ${userId} mapped to socket ${socket.id}`);
    }
  });

  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined room: ${conversationId}`);
  });

  socket.on(
    "sendMessage",
    ({ conversationId, senderId, receiverId, text, messageId, createdAt }) => {
      io.to(conversationId).emit("getMessage", {
        _id: messageId,
        conversationId,
        sender: { _id: senderId },
        text,
        createdAt: createdAt || Date.now(),
        isRead: false,
      });

      const receiverSocketId = userSocketMap.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessageNotification", {
          conversationId,
          senderId,
          text,
        });
      }
    },
  );

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running and connected to MongoDB!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(
  "/uploads/invoices",
  express.static(path.join(process.cwd(), "uploads", "invoices")),
);
app.use(
  "/uploads/damage",
  express.static(path.join(process.cwd(), "uploads", "damage")),
);

app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/damage", damageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
