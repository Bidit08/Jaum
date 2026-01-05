import React from "react";
import { DollarSign, Calendar } from "lucide-react";

const StepPricing = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">
          Pricing & Availability
        </h2>
        <p className="text-slate-500 text-sm">
          Set your daily rate and deposit requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Price per Day ($)
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Security Deposit ($)
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
            />
          </div>
        </div>

        <div className="md:col-span-2 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
          <Calendar className="text-blue-600 shrink-0" size={24} />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-blue-900">Instant Booking</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Your vehicle will be marked as available immediately upon listing.
              You can manage block-out dates in your dashboard after publishing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPricing;
