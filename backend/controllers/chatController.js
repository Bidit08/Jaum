import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import mongoose from "mongoose";

// Create or fetch an existing conversation
export const createConversation = async (req, res) => {
  try {
    const { receiverId, listingId } = req.body;
    const senderId = req.user._id;

    if (!receiverId || !listingId) {
      return res
        .status(400)
        .json({ message: "receiverId and listingId are required." });
    }

    // Check if conversation already exists between these users for this listing
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
      listing: listingId,
    }).populate("listing", "name photos");

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
        listing: listingId,
      });
      await conversation.save();

      // Populate right after creation
      conversation = await Conversation.findById(conversation._id).populate(
        "listing",
        "name photos",
      );
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Create conversation error:", error);
    res.status(500).json({ message: "Server error creating conversation" });
  }
};

// Get all conversations for a user
export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      members: { $in: [userId] },
    })
      .populate("members", "name profilePicture")
      .populate("listing", "name photos")
      .sort({ updatedAt: -1 })
      .lean();

    // Attach unread count for each conversation
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await Message.countDocuments({
          conversationId: conv._id,
          isRead: false,
          sender: { $ne: userId },
        });
        return { ...conv, unreadCount };
      }),
    );

    res.status(200).json(conversationsWithUnread);
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ message: "Server error fetching conversations" });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { conversationId } = req.params;
    const senderId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Message text is required." });
    }

    const newMessage = new Message({
      conversationId,
      sender: senderId,
      text,
    });

    const savedMessage = await newMessage.save();

    // Update the latest message and timestamp on the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      updatedAt: Date.now(),
    });

    // Populate sender info for the realtime response
    const populatedMessage = await Message.findById(savedMessage._id).populate(
      "sender",
      "name profilePicture",
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Server error sending message" });
  }
};

// Get all messages for a specific conversation
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate("sender", "name profilePicture")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error fetching messages" });
  }
};

// Mark all messages in a conversation as read by the current user
export const markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    await Message.updateMany(
      { conversationId, sender: { $ne: userId }, isRead: false },
      { $set: { isRead: true } },
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Server error marking messages as read" });
  }
};

// Get total unread message count for the current user across all conversations
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all conversations this user is part of
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    }).select("_id");
    const conversationIds = conversations.map((c) => c._id);

    // Count unread messages not sent by the user in these conversations
    const count = await Message.countDocuments({
      conversationId: { $in: conversationIds },
      isRead: false,
      sender: { $ne: userId },
    });

    res.status(200).json({ count });
  } catch (error) {
    console.error("Get unread count error:", error);
    res.status(500).json({ message: "Server error fetching unread count" });
  }
};
