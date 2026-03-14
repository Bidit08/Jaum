import React from "react";
import StarRating from "../ui/StarRating";

const ReviewCard = ({ review }) => {
  const { user, rating, title, comment, createdAt } = review;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
            {user?.profilePicture ? (
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {user?.name || "Anonymous"}
            </h4>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              {formattedDate}
            </p>
          </div>
        </div>
        <div className="bg-amber-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-100/50">
          <span className="text-sm font-bold text-slate-900">{rating}.0</span>
          <StarRating rating={rating} readOnly size={14} />
        </div>
      </div>

      <div className="pl-[64px]">
        {title && (
          <h5 className="font-bold text-slate-900 text-sm mb-2">{title}</h5>
        )}
        <p className="text-slate-600 text-sm leading-relaxed font-medium">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
