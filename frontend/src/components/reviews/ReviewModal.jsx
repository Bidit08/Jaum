import React, { useState } from "react";
import { X, Send } from "lucide-react";
import StarRating from "../ui/StarRating";
import api from "../../utils/api";
import { toast } from "react-toastify";

const ReviewModal = ({ isOpen, onClose, booking, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters long.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reviews", {
        listingId: booking.listing._id || booking.listing,
        bookingId: booking._id,
        rating,
        title,
        comment,
      });

      toast.success("Review submitted successfully!");
      if (onReviewSubmitted) onReviewSubmitted();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Write a Review</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              How was your experience?
            </p>
            <div className="flex justify-center">
              <StarRating rating={rating} setRating={setRating} size={40} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Title{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Summarize your experience..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:font-normal placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="What did you like or dislike? How was the vehicle?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-medium placeholder:font-normal placeholder:text-slate-400"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              <>
                <Send size={18} /> Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
