import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
  const [selectedVehicles, setSelectedVehicles] = useState(() => {
    const saved = localStorage.getItem("comparisonList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("comparisonList", JSON.stringify(selectedVehicles));
  }, [selectedVehicles]);

  const addToComparison = (vehicle) => {
    if (selectedVehicles.find((v) => v._id === vehicle._id)) {
      toast.info("Vehicle already in comparison");
      return;
    }
    if (selectedVehicles.length >= 3) {
      toast.warning("You can only compare up to 3 vehicles");
      return;
    }
    setSelectedVehicles([...selectedVehicles, vehicle]);
    toast.success("Added to comparison");
  };

  const removeFromComparison = (vehicleId) => {
    setSelectedVehicles(selectedVehicles.filter((v) => v._id !== vehicleId));
  };

  const clearComparison = () => {
    setSelectedVehicles([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedVehicles,
        addToComparison,
        removeFromComparison,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
