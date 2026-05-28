import express from "express";
import {
  createConversation,
  getUserConversations,
  sendMessage,
  getMessages,
  markAsRead,
  getUnreadCount,
} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all conversations for a user
router.get("/", authMiddleware, getUserConversations);

// Get total unread count for navbar
router.get("/unread-count", authMiddleware, getUnreadCount);

// Create or get an existing conversation for a listing
router.post("/", authMiddleware, createConversation);

// Get messages for a specific conversation
router.get("/:conversationId", authMiddleware, getMessages);

// Send a new message
router.post("/:conversationId", authMiddleware, sendMessage);

// Mark conversation messages as read
router.put("/:conversationId/read", authMiddleware, markAsRead);

export default router;
