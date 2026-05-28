import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true, // Ties the conversation to a specific vehicle/listing context
    },
    lastMessage: {
      type: String,
      default: "", // Stores a snippet of the latest message
    },
  },
  { timestamps: true }, // Auto-manages createdAt and updatedAt
);

export default mongoose.model("Conversation", conversationSchema);
