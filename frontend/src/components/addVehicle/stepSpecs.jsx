import React from "react";

const StepSpecs = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({
      [e.target.name]: e.target.value,
    });
  };

  const handleFeatureToggle = (feature) => {
    const features = [...formData.features];

    if (features.includes(feature)) {
      updateFormData({
        features: features.filter((f) => f !== feature),
      });
    } else {
      updateFormData({
        features: [...features, feature],
      });
    }
  };

  const commonFeatures = [
    "GPS",
    "Bluetooth",
    "Sunroof",
    "Heated Seats",
    "Leather Seats",
    "Apple CarPlay",
    "Android Auto",
    "Backup Camera",
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Specifications</h2>
        <p className="text-slate-500 text-sm">
          Renters look for these details when comparing vehicles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Fuel Type
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Transmission
          </label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Mileage (approx)
          </label>
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="e.g. 25,000 miles"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <label className="text-sm font-semibold text-slate-700">
            Features
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonFeatures.map((feature) => (
              <button
                key={feature}
                type="button"
                onClick={() => handleFeatureToggle(feature)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  formData.features.includes(feature)
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSpecs;
