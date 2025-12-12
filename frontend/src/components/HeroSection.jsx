// components/HeroSection.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Car } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Drive Your
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Dreams
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the perfect vehicle for your journey. Luxury, economy, or
              adventure - we have the right car for every occasion.
            </p>
          </div>

          {/* Search Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Pick-up Location
                  </label>
                  <Input
                    placeholder="Where to pick up?"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Dates
                  </label>
                  <Input
                    type="date"
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Passengers
                  </label>
                  <Input
                    type="number"
                    placeholder="2"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-lg">
                    Find Your Car
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// // components/HeroSection.jsx

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, MapPin, Users } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
//       {/* Floating Blur Lights */}
//       <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full" />
//       <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />
//       <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]" />

//       <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
//         {/* Hero Text */}
//         <div className="text-center max-w-4xl mx-auto mb-16">
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-md">
//             Find the Perfect
//             <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
//               {" "}
//               Ride
//             </span>{" "}
//             for Your Journey
//           </h1>

//           <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto">
//             Premium rentals for every occasion — luxury drives, city rides,
//             family trips, and off-road adventures. Choose your ideal vehicle.
//           </p>
//         </div>

//         {/* Search Bar */}
//         <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl">
//           <CardContent className="p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//               {/* Location */}
//               <div className="space-y-2">
//                 <label className="text-slate-200 text-sm font-medium flex items-center">
//                   <MapPin className="w-4 h-4 mr-2 text-cyan-300" />
//                   Pick-up Location
//                 </label>
//                 <Input
//                   placeholder="Search city or airport..."
//                   className="bg-white/10 border-white/20 text-slate-100 placeholder:text-slate-400"
//                 />
//               </div>

//               {/* Date */}
//               <div className="space-y-2">
//                 <label className="text-slate-200 text-sm font-medium flex items-center">
//                   <Calendar className="w-4 h-4 mr-2 text-cyan-300" />
//                   Pick-up Date
//                 </label>
//                 <Input
//                   type="date"
//                   className="bg-white/10 border-white/20 text-slate-100"
//                 />
//               </div>

//               {/* Passengers */}
//               <div className="space-y-2">
//                 <label className="text-slate-200 text-sm font-medium flex items-center">
//                   <Users className="w-4 h-4 mr-2 text-cyan-300" />
//                   Passengers
//                 </label>
//                 <Input
//                   type="number"
//                   placeholder="2"
//                   className="bg-white/10 border-white/20 text-slate-100 placeholder:text-slate-400"
//                 />
//               </div>

//               {/* Button */}
//               <div className="flex items-end">
//                 <Button className="w-full h-12 text-lg rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition-all shadow-lg hover:shadow-indigo-500/20">
//                   Find Your Car
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, MapPin, Users, Car } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

//       <div className="relative z-10 container mx-auto px-4 pt-20">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//               Drive Your
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 {" "}
//                 Dreams
//               </span>
//             </h1>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Discover the perfect vehicle for your journey. Luxury, economy, or
//               adventure — we have the right car for every occasion.
//             </p>
//           </div>

//           {/* Modern Search Bar */}
//           <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-3xl">
//             <CardContent className="p-8">
//               <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                 {/* Location */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-cyan-300" />
//                     Pick-up Location
//                   </label>

//                   <div className="relative group">
//                     <Input
//                       placeholder="Search location..."
//                       className="bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 pl-12
//                                  group-hover:border-cyan-400 transition-all"
//                     />
//                     <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-cyan-400 transition-all" />
//                   </div>
//                 </div>

//                 {/* Date */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
//                     <Calendar className="w-4 h-4 text-cyan-300" />
//                     Dates
//                   </label>

//                   <Input
//                     type="date"
//                     className="bg-white/5 border border-white/20 text-white rounded-xl h-12 hover:border-cyan-400 transition-all"
//                   />
//                 </div>

//                 {/* Passengers */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
//                     <Users className="w-4 h-4 text-cyan-300" />
//                     Passengers
//                   </label>

//                   <Input
//                     type="number"
//                     placeholder="2"
//                     className="bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12
//                                hover:border-cyan-400 transition-all"
//                   />
//                 </div>

//                 {/* Search Button */}
//                 <div className="flex items-end">
//                   <Button
//                     className="w-full h-12 rounded-xl text-lg font-semibold
// bg-gradient-to-r from-black to-gray-800
// hover:from-gray-900 hover:to-black
// shadow-lg shadow-black/30 hover:shadow-black/40
// transition-all flex items-center justify-center"
//                   >
//                     <Car className="w-5 h-5 mr-2" />
//                     Find Your Car
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
