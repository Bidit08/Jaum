import React from "react";
import { Car, Users, CheckCircle2 } from "lucide-react";

const StepListingType = ({ formData, updateFormData }) => {
  const options = [
    {
      id: "full",
      title: "Full Vehicle Rental",
      description:
        "Rent out your entire car to a single user for a specific period.",
      icon: Car,
    },
    {
      id: "seats",
      title: "Seat Availability",
      description:
        "Offer empty seats in your car for a shared ride or carpooling.",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">
          What are you listing?
        </h2>
        <p className="text-slate-500">
          Choose the type of listing that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => updateFormData({ listingType: option.id })}
            className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 group ${
              formData.listingType === option.id
                ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10"
                : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div
              className={`p-4 rounded-2xl mb-4 w-fit transition-transform group-hover:scale-110 ${
                formData.listingType === option.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <option.icon size={32} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {option.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {option.description}
            </p>

            {formData.listingType === option.id && (
              <div className="absolute top-4 right-4 text-blue-600">
                <CheckCircle2 size={24} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepListingType;
