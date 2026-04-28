// components/CarShowcase.jsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Star, Users, Fuel, Car } from "lucide-react";

// const CarShowcase = () => {
//   const cars = [
//     {
//       id: 1,
//       name: "Tesla Model 3",
//       type: "Electric",
//       price: 89,
//       image: "/api/placeholder/300/200",
//       seats: 5,
//       fuel: "Electric",
//       rating: 4.8,
//       features: ["Auto Pilot", "Premium Sound", "Sunroof"],
//     },
//     {
//       id: 2,
//       name: "BMW X5",
//       type: "SUV",
//       price: 129,
//       image: "/api/placeholder/300/200",
//       seats: 7,
//       fuel: "Premium",
//       rating: 4.6,
//       features: ["4WD", "Leather Seats", "Navigation"],
//     },
//     {
//       id: 3,
//       name: "Mercedes C-Class",
//       type: "Luxury",
//       price: 99,
//       image: "/api/placeholder/300/200",
//       seats: 5,
//       fuel: "Premium",
//       rating: 4.7,
//       features: ["Premium Audio", "Panoramic Roof", "Heated Seats"],
//     },
//     {
//       id: 4,
//       name: "Toyota Camry",
//       type: "Sedan",
//       price: 59,
//       image: "/api/placeholder/300/200",
//       seats: 5,
//       fuel: "Regular",
//       rating: 4.5,
//       features: ["Bluetooth", "Backup Camera", "Cruise Control"],
//     },
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             Featured Vehicles
//           </h2>
//           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//             Choose from our carefully curated selection of premium vehicles
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {cars.map((car) => (
//             <Card
//               key={car.id}
//               className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
//             >
//               <CardContent className="p-0">
//                 {/* Car Image */}
//                 <div className="relative overflow-hidden rounded-t-lg">
//                   <img
//                     src="https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}"
//                     alt={car.name}
//                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-sm font-semibold text-slate-900">
//                       ${car.price}/day
//                     </span>
//                   </div>
//                 </div>

//                 {/* Car Details */}
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h3 className="text-xl font-bold text-slate-900">
//                         {car.name}
//                       </h3>
//                       <p className="text-slate-500">{car.type}</p>
//                     </div>
//                     <div className="flex items-center">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
//                       <span className="text-sm font-medium">{car.rating}</span>
//                     </div>
//                   </div>

//                   {/* Features */}
//                   <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
//                     <div className="flex items-center">
//                       <Users className="w-4 h-4 mr-1" />
//                       {car.seats}
//                     </div>
//                     <div className="flex items-center">
//                       <Fuel className="w-4 h-4 mr-1" />
//                       {car.fuel}
//                     </div>
//                   </div>

//                   <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
//                     Book Now
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Button
//             variant="outline"
//             className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
//           >
//             View All Vehicles
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CarShowcase;

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Star, Users, Fuel, Car as CarIcon, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// const CarShowcase = () => {
//   const cars = [
//     {
//       id: 1,
//       name: "Tesla Model 3 Performance",
//       type: "Electric • Luxury",
//       price: 189,
//       image:
//         "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1500&auto=format&fit=crop",
//       seats: 5,
//       fuel: "Electric",
//       rating: 4.9,
//       tag: "Featured",
//     },
//     {
//       id: 2,
//       name: "Porsche 911 Carrera",
//       type: "Sports • Premium",
//       price: 349,
//       image:
//         "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1500&auto=format&fit=crop",
//       seats: 2,
//       fuel: "Gasoline",
//       rating: 5.0,
//       tag: "Popular",
//     },
//     {
//       id: 3,
//       name: "Mercedes-Benz G-Class",
//       type: "SUV • Luxury",
//       price: 299,
//       image:
//         "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1500&auto=format&fit=crop",
//       seats: 5,
//       fuel: "Diesel",
//       rating: 4.8,
//       tag: "Trending",
//     },
//     {
//       id: 4,
//       name: "Audi RS e-tron GT",
//       type: "Electric • Sports",
//       price: 249,
//       image:
//         "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1500&auto=format&fit=crop",
//       seats: 4,
//       fuel: "Electric",
//       rating: 4.7,
//       tag: "New",
//     },
//   ];

//   return (
//     <section className="py-24 bg-white relative">
//       <div className="container mx-auto px-4 z-10 relative">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
//           <div className="max-w-xl">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
//               Featured Fleet
//             </h2>
//             <p className="text-lg text-slate-500 font-medium leading-relaxed">
//               Curated luxury and performance. Choose from our handpicked
//               selection of top-tier vehicles available right now.
//             </p>
//           </div>
//           <Link to="/listings">
//             <Button
//               variant="outline"
//               className="group border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:bg-blue-50 text-base font-semibold rounded-2xl px-6 py-6 tracking-wide transition-all h-auto"
//             >
//               View Full Garage
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {cars.map((car) => (
//             <Card
//               key={car.id}
//               className="group bg-slate-50/50 hover:bg-white border hover:border-blue-100 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-700 rounded-3xl overflow-hidden flex flex-col"
//             >
//               <CardContent className="p-0 flex flex-col h-full">
//                 {/* Image Container */}
//                 <div className="relative overflow-hidden rounded-t-[1.5rem] h-[200px] bg-slate-100">
//                   <img
//                     src={car.image}
//                     alt={car.name}
//                     className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-60" />

//                   {/* Badges */}
//                   <div className="absolute top-4 left-4">
//                     <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-black text-white uppercase tracking-wider inline-block">
//                       {car.tag}
//                     </span>
//                   </div>

//                   {/* Rating Pill */}
//                   <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center shadow-lg">
//                     <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1.5" />
//                     <span className="text-xs font-bold text-slate-900">
//                       {car.rating}
//                     </span>
//                   </div>

//                   {/* Price Pill */}
//                   <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full px-4 py-1.5 shadow-lg shadow-blue-500/30">
//                     <span className="text-sm font-black text-white">
//                       ${car.price}
//                       <span className="text-[10px] font-medium text-white/80 opacity-80 mix-blend-screen ml-1 uppercase tracking-wider">
//                         /day
//                       </span>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Details Container */}
//                 <div className="p-5 flex-1 flex flex-col justify-between">
//                   <div className="mb-4">
//                     <div className="text-[10px] font-bold tracking-widest uppercase text-blue-600 mb-2">
//                       {car.type}
//                     </div>
//                     <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
//                       {car.name}
//                     </h3>
//                   </div>

//                   <div>
//                     {/* Meta Info */}
//                     <div className="flex items-center gap-5 text-sm text-slate-500 font-medium mb-4 pt-4 border-t border-slate-100">
//                       <div className="flex items-center gap-2">
//                         <Users className="w-4 h-4 text-slate-400" />
//                         {car.seats}{" "}
//                         <span className="hidden sm:inline">Seats</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Fuel className="w-4 h-4 text-slate-400" />
//                         {car.fuel}
//                       </div>
//                     </div>

//                     <Link to="/listings" className="block w-full">
//                       <Button className="w-full bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-white font-bold tracking-wider uppercase text-xs h-10 rounded-xl transition-all shadow-sm group-hover:shadow-blue-500/20">
//                         Book Now
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CarShowcase;

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Fuel, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const BACKEND_URL = "http://localhost:5000";

const CarShowcase = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const res = await api.get("/listings");
        // Filter for "full" vehicle listings and prioritize taking top 4
        const fullVehicles = res.data
          .filter((l) => l.listingType === "full")
          .slice(0, 4);
        setCars(fullVehicles);
      } catch (err) {
        console.error("Failed to load featured cars", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      {/* <div className="container mx-auto px-4 z-10 relative"> */}
      <div className="container mx-auto px-8 md:px-16 lg:px-24 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Featured Fleet
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Curated luxury and performance. Choose from our handpicked
              selection of top-tier vehicles available right now.
            </p>
          </div>
          <Link to="/listings">
            <Button
              variant="outline"
              className="group border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:bg-blue-50 text-base font-semibold rounded-2xl px-6 py-6 tracking-wide transition-all h-auto"
            >
              View Full Garage
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 font-medium">
              No featured vehicles available at the moment.
            </div>
          ) : (
            cars.map((car) => (
              <Card
                key={car._id}
                className="group p-0 bg-slate-50/50 hover:bg-white border hover:border-blue-100 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-700 rounded-3xl overflow-hidden flex flex-col"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-t-[1.5rem] h-[200px] bg-slate-100">
                    <img
                      src={
                        car.photos?.length
                          ? `${BACKEND_URL}${car.photos[0]}`
                          : "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1500&auto=format&fit=crop"
                      }
                      alt={car.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-60" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-black text-white uppercase tracking-wider inline-block">
                        Featured
                      </span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1.5" />
                      <span className="text-xs font-bold text-slate-900">
                        {car.averageRating || "5.0"}
                      </span>
                    </div>

                    {/* Price Pill */}
                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full px-4 py-1.5 shadow-lg shadow-blue-500/30">
                      <span className="text-sm font-black text-white">
                        ${car.pricePerDay}
                        <span className="text-[10px] font-medium text-white/80 opacity-80 mix-blend-screen ml-1 uppercase tracking-wider">
                          /day
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <div className="text-[10px] flex gap-2 font-bold tracking-widest uppercase text-blue-600 mb-2">
                        <span className="line-clamp-1">
                          {car.brand || car.category || "Premium Vehicle"}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                        {car.name}
                      </h3>
                    </div>

                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center gap-5 text-sm text-slate-500 font-medium mb-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          {car.availableSeats || car.seats || 4}{" "}
                          <span className="hidden sm:inline">Seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel className="w-4 h-4 text-slate-400" />
                          {car.fuelType || "Petrol"}
                        </div>
                      </div>

                      <Link
                        to={`/listings/${car._id}`}
                        className="block w-full"
                      >
                        <Button className="w-full bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-white font-bold tracking-wider uppercase text-xs h-10 rounded-xl transition-all shadow-sm group-hover:shadow-blue-500/20">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;
