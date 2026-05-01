import React, { useEffect, useState, useCallback } from "react";
import {
  Star,
  Trash2,
  Search,
  Filter,
  MessageSquare,
  Car,
  User,
  ChevronDown,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:5000";

const StarDisplay = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        className={
          s <= rating
            ? "fill-amber-400 text-amber-400"
            : "text-slate-200 fill-slate-200"
        }
      />
    ))}
  </div>
);

const ratingColor = (r) => {
  if (r >= 4) return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (r === 3) return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-rose-50 text-rose-700 border-rose-100";
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (ratingFilter) params.append("rating", ratingFilter);

      const { data } = await api.get(`/admin/reviews?${params.toString()}`);
      setReviews(data.reviews);
      setTotal(data.total);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [search, ratingFilter]);

  useEffect(() => {
    const delay = setTimeout(fetchReviews, 300);
    return () => clearTimeout(delay);
  }, [fetchReviews]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/admin/reviews/${id}`);
      toast.success("Review deleted");
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setTotal((prev) => prev - 1);
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  // Stats
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "—";
  const fiveStars = reviews.filter((r) => r.rating === 5).length;
  const lowRated = reviews.filter((r) => r.rating <= 2).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
          <p className="text-slate-500 text-sm mt-1">
            {total} total reviews from users
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <Star size={22} className="fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Avg Rating
            </p>
            <p className="text-2xl font-bold text-slate-900">{avgRating}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <MessageSquare size={22} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              5-Star Reviews
            </p>
            <p className="text-2xl font-bold text-slate-900">{fiveStars}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
            <Star size={22} className="text-rose-500" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Low Ratings (1-2)
            </p>
            <p className="text-2xl font-bold text-slate-900">{lowRated}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by user, vehicle, or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>
        <div className="relative">
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
            <option value="4">⭐⭐⭐⭐ 4 Stars</option>
            <option value="3">⭐⭐⭐ 3 Stars</option>
            <option value="2">⭐⭐ 2 Stars</option>
            <option value="1">⭐ 1 Star</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 flex flex-col items-center gap-3 text-center">
            <MessageSquare size={40} className="text-slate-300" />
            <p className="text-slate-500 font-medium">No reviews found</p>
            <p className="text-slate-400 text-sm">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* User Avatar */}
                  <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                    {review.user?.profilePicture ? (
                      <img
                        src={`${BACKEND_URL}${review.user.profilePicture}`}
                        alt={review.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-base">
                        {review.user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900 text-sm">
                            {review.user?.name || "Anonymous"}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${ratingColor(review.rating)}`}
                          >
                            <Star
                              size={10}
                              className={
                                review.rating >= 4
                                  ? "fill-emerald-600 text-emerald-600"
                                  : review.rating === 3
                                    ? "fill-amber-600 text-amber-600"
                                    : "fill-rose-600 text-rose-600"
                              }
                            />
                            {review.rating}.0
                          </span>
                        </div>
                        <StarDisplay rating={review.rating} />
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <Car size={13} className="text-slate-400" />
                      <span className="font-medium">
                        {review.listing?.name || "Unknown Vehicle"}
                        {review.listing?.brand && ` · ${review.listing.brand}`}
                        {review.listing?.model && ` ${review.listing.model}`}
                      </span>
                    </div>

                    {/* Review Text */}
                    {review.title && (
                      <p className="font-semibold text-slate-900 text-sm mb-1">
                        {review.title}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <div className="shrink-0">
                    {confirmDelete === review._id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          disabled={deletingId === review._id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-60"
                        >
                          {deletingId === review._id ? "Deleting…" : "Confirm"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(review._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete review"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
