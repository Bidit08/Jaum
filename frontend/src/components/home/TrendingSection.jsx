// // components/TrendingSection.jsx
// import { Card, CardContent } from "@/components/ui/card";
// import { MoveRight } from "lucide-react";

// const TrendingSection = () => {
//   const cars = [
//     {
//       name: "Tesla Model 3",
//       image:
//         "https://images.pexels.com/photos/7994435/pexels-photo-7994435.jpeg",
//       price: "$78/day",
//     },
//     {
//       name: "Jeep Wrangler",
//       image:
//         "https://images.pexels.com/photos/1006200/pexels-photo-1006200.jpeg",
//       price: "$95/day",
//     },
//     {
//       name: "BMW M5",
//       image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
//       price: "$120/day",
//     },
//     {
//       name: "Hyundai Creta",
//       image:
//         "https://images.pexels.com/photos/12477712/pexels-photo-12477712.jpeg",
//       price: "$52/day",
//     },
//   ];

//   return (
//     <section className="py-24 bg-white relative overflow-hidden">
//       {/* Gradient Background Accent */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6">
//         {/* Section Header */}
//         <div className="flex items-center justify-between mb-12">
//           <div>
//             <h2 className="text-4xl font-extrabold text-slate-900">
//               Trending Vehicles
//             </h2>
//             <p className="text-slate-600 mt-2">
//               Most booked rides this week — sleek, popular, and ready to go.
//             </p>
//           </div>

//           <button className="group flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition">
//             View All
//             <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>

//         {/* Car Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {cars.map((car, index) => (
//             <Card
//               key={index}
//               className="border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-xl"
//             >
//               <div className="overflow-hidden rounded-t-3xl">
//                 <img
//                   src={car.image}
//                   alt={car.name}
//                   className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>

//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold text-slate-900 mb-1">
//                   {car.name}
//                 </h3>

//                 <p className="text-blue-600 font-bold text-lg mb-4">
//                   {car.price}
//                 </p>

//                 <button className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
//                   Book Now
//                 </button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingSection;
