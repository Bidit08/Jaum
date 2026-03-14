import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, setRating, readOnly = false, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && setRating && setRating(star)}
          className={`focus:outline-none transition-transform duration-200 ${
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-200 fill-slate-50"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
