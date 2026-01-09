// import { useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// const AddVehicle = () => {
//   const [form, setForm] = useState({
//     title: "",
//     brand: "",
//     model: "",
//     year: "",
//     seats: "",
//     fuelType: "",
//     pricePerDay: "",
//     location: "",
//     description: "",
//   });

//   const [images, setImages] = useState([]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleImages = (e) => setImages(e.target.files);

//   const submitVehicle = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, val]) => formData.append(key, val));

//     for (let img of images) {
//       formData.append("images", img);
//     }

//     try {
//       await api.post("/vehicles", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Vehicle listed successfully 🚗✨");
//       setForm({});
//       setImages([]);
//     } catch {
//       toast.error("Failed to post vehicle ❌");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 mt-20 bg-slate-900 border border-white/10 rounded-xl text-white">
//       <h2 className="text-3xl font-bold mb-6">List Your Vehicle</h2>

//       <form onSubmit={submitVehicle} className="space-y-4">
//         <Input
//           name="title"
//           placeholder="Title"
//           onChange={handleChange}
//           required
//         />
//         <div className="grid grid-cols-2 gap-4">
//           <Input
//             name="brand"
//             placeholder="Brand"
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="model"
//             placeholder="Model"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           <Input
//             name="year"
//             type="number"
//             placeholder="Year"
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="seats"
//             type="number"
//             placeholder="Seats"
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="fuelType"
//             placeholder="Fuel Type"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <Input
//           name="pricePerDay"
//           type="number"
//           placeholder="Price per day ($)"
//           onChange={handleChange}
//           required
//         />
//         <Input
//           name="location"
//           placeholder="Location"
//           onChange={handleChange}
//           required
//         />

//         <Textarea
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//         />

//         <Input type="file" multiple accept="image/*" onChange={handleImages} />

//         <Button type="submit" className="w-full bg-blue-600">
//           Publish Vehicle
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default AddVehicle;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// import StepBasicInfo from "../../components/addVehicle/StepBasicInfo";
// import StepSpecs from "../../components/addVehicle/StepSpecs";
// import StepPricing from "../../components/addVehicle/StepPricing";
// import StepPhotos from "../../components/addVehicle/StepPhotos";
// import StepReview from "../../components/addVehicle/StepReview";

// const steps = [
//   { id: 1, title: "Basics" },
//   { id: 2, title: "Specs" },
//   { id: 3, title: "Pricing" },
//   { id: 4, title: "Photos" },
//   { id: 5, title: "Review" },
// ];

// const AddVehiclePage = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     brand: "",
//     model: "",
//     year: "",
//     description: "",
//     fuelType: "Gasoline",
//     transmission: "Automatic",
//     seats: 5,
//     mileage: "",
//     features: [],
//     pricePerDay: 50,
//     deposit: 200,
//     photos: [],
//   });

//   // Load draft on mount
//   useEffect(() => {
//     const draft = localStorage.getItem("vehicle_draft");
//     if (draft) {
//       try {
//         setFormData(JSON.parse(draft));
//       } catch (e) {
//         console.error("Failed to parse draft", e);
//       }
//     }
//   }, []);

//   // Auto-save draft
//   useEffect(() => {
//     localStorage.setItem("vehicle_draft", JSON.stringify(formData));
//   }, [formData]);

//   const updateFormData = (newData) => {
//     setFormData((prev) => ({ ...prev, ...newData }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep((s) => s + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((s) => s - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       await api.post("/vehicles", formData);
//       toast.success("Vehicle published successfully! 🎉");
//       localStorage.removeItem("vehicle_draft");
//       navigate("/dashboard/vehicles");
//     } catch {
//       toast.error("Failed to publish vehicle");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isStepValid = () => {
//     if (currentStep === 1)
//       return formData.name && formData.brand && formData.model && formData.year;

//     if (currentStep === 4) return formData.photos.length > 0;

//     return true;
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <StepBasicInfo formData={formData} updateFormData={updateFormData} />
//         );
//       case 2:
//         return (
//           <StepSpecs formData={formData} updateFormData={updateFormData} />
//         );
//       case 3:
//         return (
//           <StepPricing formData={formData} updateFormData={updateFormData} />
//         );
//       case 4:
//         return (
//           <StepPhotos formData={formData} updateFormData={updateFormData} />
//         );
//       case 5:
//         return <StepReview formData={formData} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto pb-20">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//           List Your Vehicle
//         </h1>
//         <p className="text-slate-500 font-medium">
//           Turn your car into an asset in just a few steps.
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="flex justify-between items-center mb-12 relative px-2">
//         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2" />
//         <div
//           className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500"
//           style={{
//             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         />

//         {steps.map((step) => (
//           <div
//             key={step.id}
//             className="relative z-10 flex flex-col items-center gap-2"
//           >
//             <div
//               onClick={() => step.id < currentStep && setCurrentStep(step.id)}
//               className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all cursor-pointer ${
//                 step.id === currentStep
//                   ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
//                   : step.id < currentStep
//                   ? "bg-blue-50 border-blue-600 text-blue-600"
//                   : "bg-white border-slate-200 text-slate-400"
//               }`}
//             >
//               {step.id < currentStep ? <CheckCircle2 size={20} /> : step.id}
//             </div>

//             <span
//               className={`text-[10px] uppercase tracking-widest font-bold hidden sm:block ${
//                 step.id === currentStep ? "text-blue-600" : "text-slate-400"
//               }`}
//             >
//               {step.title}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm min-h-[500px] flex flex-col">
//         <div className="flex-1">{renderStep()}</div>

//         {/* Navigation */}
//         <div className="flex justify-between items-center pt-10 border-t border-slate-100 mt-10">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 1 || loading}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-900 disabled:opacity-0 transition-all"
//           >
//             <ChevronLeft size={20} /> Back
//           </button>

//           {currentStep === steps.length ? (
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="px-10 py-3.5 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
//             >
//               {loading ? "Publishing..." : "Publish Vehicle"}
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               disabled={!isStepValid()}
//               className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
//             >
//               Next Step <ChevronRight size={20} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVehiclePage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// import StepListingType from "../../components/addVehicle/StepListingType";
// import StepBasicInfo from "../../components/addVehicle/StepBasicInfo";
// import StepSpecs from "../../components/addVehicle/StepSpecs";
// import StepListingDetails from "../../components/addVehicle/StepListingDetails";
// import StepPhotos from "../../components/addVehicle/StepPhotos";
// import StepReview from "../../components/addVehicle/StepReview";

// const steps = [
//   { id: 1, title: "Type" },
//   { id: 2, title: "Vehicle" },
//   { id: 3, title: "Specs" },
//   { id: 4, title: "Details" },
//   { id: 5, title: "Photos" },
//   { id: 6, title: "Review" },
// ];

// const AddVehiclePage = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     listingType: "full", // 'full' | 'seats'
//     name: "",
//     brand: "",
//     model: "",
//     year: "",
//     description: "",
//     fuelType: "Gasoline",
//     transmission: "Automatic",
//     seats: 5,
//     mileage: "",
//     features: [],
//     pricePerDay: 50,
//     deposit: 200,
//     availableSeats: 3,
//     pricePerSeat: 15,
//     departure: "",
//     destination: "",
//     departureTime: "",
//     rules: "",
//     photos: [],
//   });

//   // Load draft
//   useEffect(() => {
//     const draft = localStorage.getItem("vehicle_listing_draft");
//     if (draft) {
//       try {
//         setFormData(JSON.parse(draft));
//       } catch (e) {
//         console.error("Failed to parse draft", e);
//       }
//     }
//   }, []);

//   // Save draft
//   useEffect(() => {
//     localStorage.setItem("vehicle_listing_draft", JSON.stringify(formData));
//   }, [formData]);

//   const updateFormData = (newData) => {
//     setFormData((prev) => ({ ...prev, ...newData }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep((prev) => prev + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       await api.post("/listings", formData);
//       toast.success("Listing published successfully! 🚀");
//       localStorage.removeItem("vehicle_listing_draft");
//       navigate("/dashboard/vehicles");
//     } catch (e) {
//       toast.error("Failed to publish listing. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1:
//         return !!formData.listingType;
//       case 2:
//         return (
//           formData.name && formData.brand && formData.model && formData.year
//         );
//       case 4:
//         if (formData.listingType === "seats") {
//           return (
//             formData.departure && formData.destination && formData.departureTime
//           );
//         }
//         return true;
//       case 5:
//         return formData.photos.length > 0;
//       default:
//         return true;
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <StepListingType
//             formData={formData}
//             updateFormData={updateFormData}
//           />
//         );
//       case 2:
//         return (
//           <StepBasicInfo formData={formData} updateFormData={updateFormData} />
//         );
//       case 3:
//         return (
//           <StepSpecs formData={formData} updateFormData={updateFormData} />
//         );
//       case 4:
//         return (
//           <StepListingDetails
//             formData={formData}
//             updateFormData={updateFormData}
//           />
//         );
//       case 5:
//         return (
//           <StepPhotos formData={formData} updateFormData={updateFormData} />
//         );
//       case 6:
//         return <StepReview formData={formData} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto pb-20 px-4">
//       {/* Header */}
//       <div className="mb-10 pt-4">
//         <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//           Create Listing
//         </h1>
//         <p className="text-slate-500 mt-2 font-medium">
//           Follow the steps to list your asset and start earning.
//         </p>
//       </div>

//       {/* Stepper */}
//       <div className="mb-12 relative flex justify-between items-center max-w-2xl mx-auto">
//         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
//         <div
//           className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
//           style={{
//             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         />

//         {steps.map((step) => (
//           <div
//             key={step.id}
//             className="relative z-10 flex flex-col items-center"
//           >
//             <button
//               onClick={() => step.id < currentStep && setCurrentStep(step.id)}
//               disabled={step.id >= currentStep}
//               className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm border-2 transition-all ${
//                 step.id === currentStep
//                   ? "bg-blue-600 border-blue-600 text-white shadow-xl scale-110"
//                   : step.id < currentStep
//                   ? "bg-blue-50 border-blue-600 text-blue-600"
//                   : "bg-white border-slate-100 text-slate-300 cursor-not-allowed"
//               }`}
//             >
//               {step.id < currentStep ? <CheckCircle2 size={18} /> : step.id}
//             </button>

//             <span
//               className={`absolute -bottom-7 text-[10px] uppercase tracking-widest font-bold ${
//                 step.id === currentStep ? "text-blue-600" : "text-slate-400"
//               }`}
//             >
//               {step.title}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-12 shadow-2xl min-h-[550px] flex flex-col relative">
//         <div className="flex-1">{renderStep()}</div>

//         {/* Actions */}
//         <div className="flex justify-between pt-10 border-t mt-10">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 1 || loading}
//             className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-slate-900"
//           >
//             <ChevronLeft size={20} /> Previous
//           </button>

//           {currentStep === steps.length ? (
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="px-12 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2"
//             >
//               {loading && <Loader2 size={20} className="animate-spin" />}
//               {loading ? "Publishing..." : "Publish Listing"}
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               disabled={!isStepValid()}
//               className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-xl font-bold"
//             >
//               Continue <ChevronRight size={20} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVehiclePage;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// import StepListingType from "../../components/addVehicle/stepListingType";
// import StepBasicInfo from "../../components/addVehicle/stepBasicInfo";
// import StepSpecs from "../../components/addVehicle/stepSpecs";
// import StepListingDetails from "../../components/addVehicle/stepListingDetails";
// import StepPhotos from "../../components/addVehicle/stepPhotos";
// import StepReview from "../../components/addVehicle/stepReview";

// const steps = [
//   { id: 1, title: "Type" },
//   { id: 2, title: "Vehicle" },
//   { id: 3, title: "Specs" },
//   { id: 4, title: "Details" },
//   { id: 5, title: "Photos" },
//   { id: 6, title: "Review" },
// ];

// const AddVehiclePage = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     listingType: "full",
//     name: "",
//     brand: "",
//     model: "",
//     year: "",
//     description: "",
//     fuelType: "Gasoline",
//     transmission: "Automatic",
//     seats: 5,
//     mileage: "",
//     features: [],
//     pricePerDay: 50,
//     deposit: 200,
//     availableSeats: 3,
//     pricePerSeat: 15,
//     departure: "",
//     destination: "",
//     departureTime: "",
//     rules: "",
//     photos: [],
//   });

//   // Load draft
//   useEffect(() => {
//     const draft = localStorage.getItem("vehicle_listing_draft");
//     if (draft) {
//       try {
//         setFormData(JSON.parse(draft));
//       } catch {}
//     }
//   }, []);

//   // Save draft
//   useEffect(() => {
//     localStorage.setItem("vehicle_listing_draft", JSON.stringify(formData));
//   }, [formData]);

//   const updateFormData = (data) => {
//     setFormData((prev) => ({ ...prev, ...data }));
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep((s) => s + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((s) => s - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1:
//         return !!formData.listingType;
//       case 2:
//         return (
//           formData.name && formData.brand && formData.model && formData.year
//         );
//       case 4:
//         if (formData.listingType === "seats") {
//           return (
//             formData.departure && formData.destination && formData.departureTime
//           );
//         }
//         return true;
//       case 5:
//         return formData.photos.length > 0;
//       default:
//         return true;
//     }
//   };

//   const submitListing = async () => {
//     setLoading(true);
//     try {
//       await api.post("/listings", formData);
//       toast.success("Listing published 🚀");
//       localStorage.removeItem("vehicle_listing_draft");
//       navigate("/dashboard/vehicles");
//     } catch {
//       toast.error("Failed to publish listing");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <StepListingType
//             formData={formData}
//             updateFormData={updateFormData}
//           />
//         );
//       case 2:
//         return (
//           <StepBasicInfo formData={formData} updateFormData={updateFormData} />
//         );
//       case 3:
//         return (
//           <StepSpecs formData={formData} updateFormData={updateFormData} />
//         );
//       case 4:
//         return (
//           <StepListingDetails
//             formData={formData}
//             updateFormData={updateFormData}
//           />
//         );
//       case 5:
//         return (
//           <StepPhotos formData={formData} updateFormData={updateFormData} />
//         );
//       case 6:
//         return <StepReview formData={formData} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 pb-20">
//       <div className="mb-10 pt-4">
//         <h1 className="text-3xl font-extrabold text-slate-900">
//           Create Listing
//         </h1>
//         <p className="text-slate-500">Follow the steps to list your vehicle</p>
//       </div>

//       {/* Stepper */}
//       <div className="mb-12 flex justify-between relative">
//         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100" />
//         <div
//           className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transition-all"
//           style={{
//             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         />

//         {steps.map((step) => (
//           <div key={step.id} className="relative z-10">
//             <button
//               className={`w-10 h-10 rounded-xl border-2 font-bold ${
//                 step.id === currentStep
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : step.id < currentStep
//                   ? "bg-blue-50 text-blue-600 border-blue-600"
//                   : "bg-white border-slate-200 text-slate-300"
//               }`}
//             >
//               {step.id < currentStep ? <CheckCircle2 size={18} /> : step.id}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="bg-white rounded-3xl border p-8 shadow-xl min-h-[550px] flex flex-col">
//         <div className="flex-1">{renderStep()}</div>

//         <div className="flex justify-between pt-8 mt-8 border-t">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 1}
//             className="flex items-center gap-2 text-slate-400"
//           >
//             <ChevronLeft size={18} /> Previous
//           </button>

//           {currentStep === steps.length ? (
//             <button
//               onClick={submitListing}
//               disabled={loading}
//               className="bg-slate-900 text-white px-10 py-4 rounded-xl flex gap-2 items-center"
//             >
//               {loading && <Loader2 size={18} className="animate-spin" />}
//               Publish Listing
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               disabled={!isStepValid()}
//               className="bg-blue-600 text-white px-10 py-4 rounded-xl flex gap-2 items-center"
//             >
//               Continue <ChevronRight size={18} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVehiclePage;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// import StepListingType from "../../components/addVehicle/stepListingType";
// import StepBasicInfo from "../../components/addVehicle/stepBasicInfo";
// import StepSpecs from "../../components/addVehicle/stepSpecs";
// import StepListingDetails from "../../components/addVehicle/stepListingDetails";
// import StepPhotos from "../../components/addVehicle/stepPhotos";
// import StepReview from "../../components/addVehicle/stepReview";

// const steps = ["Type", "Vehicle", "Specs", "Details", "Photos", "Review"];

// const AddVehiclePage = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     listingType: "full",
//     name: "",
//     brand: "",
//     model: "",
//     year: "",
//     description: "",
//     fuelType: "Gasoline",
//     transmission: "Automatic",
//     seats: 5,
//     mileage: "",
//     features: [],
//     pricePerDay: 50,
//     deposit: 200,
//     location: "",
//     availableSeats: 3,
//     pricePerSeat: 15,
//     departure: "",
//     destination: "",
//     departureTime: "",
//     rules: "",
//     photos: [],
//   });

//   useEffect(() => {
//     const draft = localStorage.getItem("vehicle_listing_draft");
//     if (draft) setFormData(JSON.parse(draft));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("vehicle_listing_draft", JSON.stringify(formData));
//   }, [formData]);

//   const updateFormData = (data) =>
//     setFormData((prev) => ({ ...prev, ...data }));

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       await api.post("/listings", formData);
//       toast.success("Listing published!");
//       localStorage.removeItem("vehicle_listing_draft");
//       navigate("/dashboard/vehicles");
//     } catch {
//       toast.error("Failed to publish listing");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStep = () => {
//     const props = { formData, updateFormData };
//     return [
//       <StepListingType {...props} />,
//       <StepBasicInfo {...props} />,
//       <StepSpecs {...props} />,
//       <StepListingDetails {...props} />,
//       <StepPhotos {...props} />,
//       <StepReview formData={formData} />,
//     ][currentStep - 1];
//   };

//   return (
//     <div className="max-w-4xl mx-auto pb-20 px-4">
//       <h1 className="text-3xl font-bold mb-6">Create Listing</h1>

//       <div className="bg-white p-10 rounded-3xl shadow-xl min-h-[500px]">
//         {renderStep()}

//         <div className="flex justify-between mt-10">
//           <button
//             onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
//             disabled={currentStep === 1}
//           >
//             <ChevronLeft /> Back
//           </button>

//           {currentStep === steps.length ? (
//             <button onClick={handleSubmit} disabled={loading}>
//               {loading ? <Loader2 className="animate-spin" /> : "Publish"}
//             </button>
//           ) : (
//             <button onClick={() => setCurrentStep((s) => s + 1)}>
//               Continue <ChevronRight />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVehiclePage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

import StepListingType from "../../../components/addVehicle/stepListingType";
import StepBasicInfo from "../../../components/addVehicle/stepBasicInfo";
import StepSpecs from "../../../components/addVehicle/stepSpecs";
import StepListingDetails from "../../../components/addVehicle/stepListingDetails";
import StepPhotos from "../../../components/addVehicle/stepPhotos";
import StepReview from "../../../components/addVehicle/stepReview";

const steps = ["Type", "Vehicle", "Specs", "Details", "Photos", "Review"];

const AddVehiclePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    listingType: "full",
    name: "",
    brand: "",
    model: "",
    year: "",
    description: "",
    fuelType: "Gasoline",
    transmission: "Automatic",
    seats: 5,
    mileage: "",
    features: [],
    pricePerDay: 50,
    deposit: 200,
    location: "",
    availableSeats: 3,
    pricePerSeat: 15,
    departure: "",
    destination: "",
    departureTime: "",
    rules: "",
    photos: [], // <-- SERVER URLs ONLY
  });

  /* Load draft */
  useEffect(() => {
    const draft = localStorage.getItem("vehicle_listing_draft");
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
      } catch {
        localStorage.removeItem("vehicle_listing_draft");
      }
    }
  }, []);

  /* Save draft */
  useEffect(() => {
    localStorage.setItem("vehicle_listing_draft", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data) =>
    setFormData((prev) => ({ ...prev, ...data }));

  /* SUBMIT */
  const handleSubmit = async () => {
    // ✅ FRONTEND VALIDATION
    if (!formData.photos.length) {
      toast.error("Please upload at least one photo");
      return;
    }

    setLoading(true);
    try {
      await api.post("/listings", formData);
      toast.success("Listing published successfully 🚀");
      localStorage.removeItem("vehicle_listing_draft");
      navigate("/dashboard/vehicles");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish listing");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    const props = { formData, updateFormData };
    return [
      <StepListingType {...props} />,
      <StepBasicInfo {...props} />,
      <StepSpecs {...props} />,
      <StepListingDetails {...props} />,
      <StepPhotos {...props} />,
      <StepReview formData={formData} />,
    ][currentStep - 1];
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Create Listing</h1>

      <div className="bg-white p-10 rounded-3xl shadow-xl min-h-[500px]">
        {renderStep()}

        <div className="flex justify-between mt-10">
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1 || loading}
            className="flex items-center gap-2 text-slate-600"
          >
            <ChevronLeft /> Back
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" />}
              Publish
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              Continue <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVehiclePage;
