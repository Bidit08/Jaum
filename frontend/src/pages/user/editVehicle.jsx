import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../utils/api";

import StepListingType from "../../components/addVehicle/stepListingType";
import StepBasicInfo from "../../components/addVehicle/stepBasicInfo";
import StepSpecs from "../../components/addVehicle/stepSpecs";
import StepListingDetails from "../../components/addVehicle/stepListingDetails";
import StepPhotos from "../../components/addVehicle/stepPhotos";
import StepReview from "../../components/addVehicle/stepReview";

const steps = ["Type", "Vehicle", "Specs", "Details", "Photos", "Review"];

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
    availableSeats: 1,
    pricePerSeat: 10,
    departure: "",
    destination: "",
    departureTime: "",
    rules: "",
    photos: [],
  });

  /* ===============================
     FETCH EXISTING LISTING
  =============================== */
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to load listing");
        navigate("/dashboard/vehicles");
      } finally {
        setFetching(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  const updateFormData = (data) =>
    setFormData((prev) => ({ ...prev, ...data }));

  /* ===============================
     UPDATE LISTING
  =============================== */
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/listings/${id}`, formData);
      toast.success("Listing updated successfully");
      navigate("/dashboard/vehicles");
    } catch (err) {
      toast.error("Failed to update listing");
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

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>

      <div className="bg-white p-10 rounded-3xl shadow-xl min-h-[500px]">
        {renderStep()}

        <div className="flex justify-between mt-10">
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft /> Back
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
            >
              Continue <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditVehicle;
