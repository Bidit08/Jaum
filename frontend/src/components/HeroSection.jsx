// // components/HeroSection.jsx
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
//               adventure - we have the right car for every occasion.
//             </p>
//           </div>

//           {/* Search Card */}
//           <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl rounded-2xl">
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//                 {/* Location */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-white">
//                     <MapPin className="w-4 h-4 mr-2" />
//                     Pick-up Location
//                   </label>
//                   <Input
//                     placeholder="Where to pick up?"
//                     className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
//                   />
//                 </div>

//                 {/* Dates */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-white">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     Dates
//                   </label>
//                   <Input
//                     type="date"
//                     className="bg-white/20 border-white/30 text-white"
//                   />
//                 </div>

//                 {/* Passengers */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-white">
//                     <Users className="w-4 h-4 mr-2" />
//                     Passengers
//                   </label>
//                   <Input
//                     type="number"
//                     placeholder="2"
//                     className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
//                   />
//                 </div>

//                 {/* Search Button */}
//                 <div className="flex items-end">
//                   <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-lg">
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

// // components/HeroSection.jsx
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, MapPin, Users } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-[#0B1020]">
//       {/* Ambient gradient blobs */}
//       <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
//       <div className="pointer-events-none absolute -bottom-40 left-16 h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[120px]" />
//       <div className="pointer-events-none absolute -bottom-40 right-10 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />

//       {/* Subtle noise + grid */}
//       <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:28px_28px]" />
//       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%,rgba(0,0,0,0.25))]" />

//       <div className="relative z-10 container mx-auto px-4 pt-20">
//         <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
//           {/* Left content */}
//           <div className="lg:col-span-7">
//             {/* Badge */}
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
//               <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
//               Premium rentals • Fast booking • Trusted hosts
//             </div>

//             <h1 className="text-balance text-5xl font-extrabold tracking-tight text-white md:text-7xl">
//               Drive Your{" "}
//               <span className="relative inline-block">
//                 <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
//                   Dreams
//                 </span>
//                 <span className="pointer-events-none absolute -bottom-2 left-0 h-[10px] w-full rounded-full bg-cyan-400/20 blur-md" />
//               </span>
//             </h1>

//             <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
//               Discover the perfect vehicle for your journey. Luxury, economy, or
//               adventure — find the right car in minutes with a smooth, modern
//               booking experience.
//             </p>

//             {/* Mini stats */}
//             <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
//               {[
//                 { k: "10k+", v: "Verified Listings" },
//                 { k: "4.8★", v: "Avg Rating" },
//                 { k: "24/7", v: "Support" },
//               ].map((s) => (
//                 <div
//                   key={s.v}
//                   className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
//                 >
//                   <div className="text-xl font-semibold text-white">{s.k}</div>
//                   <div className="text-xs text-white/60">{s.v}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right search card */}
//           <div className="lg:col-span-5">
//             <Card className="group relative overflow-hidden rounded-3xl border-white/10 bg-white/[0.06] shadow-[0_25px_80px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl">
//               {/* Card glow */}
//               <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
//               <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

//               <CardContent className="p-6 sm:p-7">
//                 <div className="mb-5">
//                   <h2 className="text-lg font-semibold text-white">
//                     Search rides
//                   </h2>
//                   <p className="mt-1 text-sm text-white/60">
//                     Enter your details to find the best match.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                   {/* Location */}
//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-medium text-white/90">
//                       <MapPin className="mr-2 h-4 w-4 text-cyan-300" />
//                       Pick-up Location
//                     </label>
//                     <div className="relative">
//                       <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/40">
//                         <MapPin className="h-4 w-4" />
//                       </div>
//                       <Input
//                         placeholder="Where to pick up?"
//                         className="h-12 rounded-2xl border-white/10 bg-white/10 pl-10 text-white placeholder:text-white/40 shadow-inner shadow-black/20 transition focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-0"
//                       />
//                     </div>
//                   </div>

//                   {/* Dates */}
//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-medium text-white/90">
//                       <Calendar className="mr-2 h-4 w-4 text-cyan-300" />
//                       Dates
//                     </label>
//                     <div className="relative">
//                       <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/40">
//                         <Calendar className="h-4 w-4" />
//                       </div>
//                       <Input
//                         type="date"
//                         className="h-12 rounded-2xl border-white/10 bg-white/10 pl-10 text-white shadow-inner shadow-black/20 transition focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-0"
//                       />
//                     </div>
//                   </div>

//                   {/* Passengers */}
//                   <div className="space-y-2">
//                     <label className="flex items-center text-sm font-medium text-white/90">
//                       <Users className="mr-2 h-4 w-4 text-cyan-300" />
//                       Passengers
//                     </label>
//                     <div className="relative">
//                       <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/40">
//                         <Users className="h-4 w-4" />
//                       </div>
//                       <Input
//                         type="number"
//                         placeholder="2"
//                         className="h-12 rounded-2xl border-white/10 bg-white/10 pl-10 text-white placeholder:text-white/40 shadow-inner shadow-black/20 transition focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-0"
//                       />
//                     </div>
//                   </div>

//                   {/* Search Button */}
//                   <Button className="mt-2 h-12 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-base font-semibold text-white shadow-[0_18px_45px_-20px_rgba(59,130,246,0.9)] transition hover:brightness-110 active:translate-y-[1px]">
//                     Find Your Car
//                   </Button>

//                   {/* Small helper row */}
//                   <div className="flex items-center justify-between text-xs text-white/55">
//                     <span>Instant confirmation</span>
//                     <span className="h-1 w-1 rounded-full bg-white/30" />
//                     <span>No hidden fees</span>
//                     <span className="h-1 w-1 rounded-full bg-white/30" />
//                     <span>Secure payments</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Bottom hint */}
//             <p className="mt-4 text-center text-xs text-white/50">
//               Tip: Try searching by “Sydney” and filter by seats for quick
//               results.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// components/HeroSection.jsx
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, MapPin, Users, Search, Sparkles } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full bg-blue-400/10 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 3 + 1}px`,
//                 height: `${Math.random() * 3 + 1}px`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${Math.random() * 8 + 8}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Grid Pattern Overlay */}
//       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:80px_80px] opacity-40" />

//       <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-24">
//         <div className="max-w-5xl mx-auto">
//           {/* Header with Enhanced Styling */}
//           <div className="text-center mb-12 md:mb-16 relative">
//             {/* Decorative Elements */}
//             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-500/5 blur-3xl rounded-full" />
//             <Sparkles className="absolute -top-2 left-1/4 w-5 h-5 text-blue-400/50 animate-pulse" />
//             <Sparkles className="absolute top-6 right-1/4 w-3 h-3 text-cyan-400/50 animate-pulse delay-1000" />

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//               Drive Your{" "}
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 Dreams
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed font-light">
//               Discover the perfect vehicle for your journey. Luxury, economy, or
//               adventure — we have the right car for every occasion.
//             </p>
//           </div>

//           {/* Enhanced Search Card */}
//           <div className="relative group">
//             {/* Card Glow Effect */}
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />

//             <Card className="relative bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl overflow-hidden">
//               {/* Card Background Pattern */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
//               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//               <CardContent className="relative p-5 md:p-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//                   {/* Location Field */}
//                   <div className="space-y-2 group/item">
//                     <label className="flex items-center text-sm font-semibold text-white/90">
//                       <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-md mr-2 group-hover/item:scale-105 transition-transform">
//                         <MapPin className="w-4 h-4 text-blue-300" />
//                       </div>
//                       Pick-up Location
//                     </label>
//                     <div className="relative">
//                       <Input
//                         placeholder="Enter city or airport"
//                         className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 pl-11 rounded-lg backdrop-blur-sm
//                         focus:bg-white/15 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
//                       />
//                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/70" />
//                     </div>
//                   </div>

//                   {/* Dates Field */}
//                   <div className="space-y-2 group/item">
//                     <label className="flex items-center text-sm font-semibold text-white/90">
//                       <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-md mr-2 group-hover/item:scale-105 transition-transform">
//                         <Calendar className="w-4 h-4 text-blue-300" />
//                       </div>
//                       Pick-up & Return
//                     </label>
//                     <div className="relative">
//                       <Input
//                         type="date"
//                         className="bg-white/10 border-white/20 text-white h-12 pl-11 rounded-lg backdrop-blur-sm
//                         focus:bg-white/15 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
//                       />
//                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/70" />
//                     </div>
//                   </div>

//                   {/* Passengers Field */}
//                   <div className="space-y-2 group/item">
//                     <label className="flex items-center text-sm font-semibold text-white/90">
//                       <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-md mr-2 group-hover/item:scale-105 transition-transform">
//                         <Users className="w-4 h-4 text-blue-300" />
//                       </div>
//                       Passengers
//                     </label>
//                     <div className="relative">
//                       <Input
//                         type="number"
//                         placeholder="2"
//                         min="1"
//                         className="bg-white/10 border-white/20 text-white h-12 pl-11 rounded-lg backdrop-blur-sm
//                         focus:bg-white/15 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
//                       />
//                       <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/70" />
//                     </div>
//                   </div>

//                   {/* Search Button */}
//                   <div className="flex items-end">
//                     <Button
//                       className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600
//                       text-white h-12 rounded-lg text-base font-semibold shadow-lg shadow-blue-500/25
//                       hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 group/btn"
//                     >
//                       <Search className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
//                       Find Your Car
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Quick Filters - Smaller */}
//                 <div className="mt-6 pt-6 border-t border-white/10">
//                   <p className="text-white/70 text-sm font-medium mb-3">
//                     Popular categories:
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {[
//                       "Luxury",
//                       "SUV",
//                       "Economy",
//                       "Sports",
//                       "Electric",
//                       "Convertible",
//                     ].map((category) => (
//                       <button
//                         key={category}
//                         className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white/80
//                         text-xs font-medium hover:text-white hover:border-blue-400/30 transition-all hover:scale-105"
//                       >
//                         {category}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Add custom animations to tailwind.config.js */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-15px) rotate(5deg);
//           }
//         }
//         @keyframes gradient {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//         .animate-float {
//           animation: float 5s ease-in-out infinite;
//         }
//         .animate-gradient {
//           animation: gradient 3s ease infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, MapPin, Users, Search, Sparkles } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full bg-blue-400/10 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 3 + 1}px`,
//                 height: `${Math.random() * 3 + 1}px`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${Math.random() * 8 + 8}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Grid Pattern */}
//       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:80px_80px] opacity-40" />

//       <div className="relative z-10 container mx-auto px-4 pt-20">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-14 relative">
//             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-56 h-56 bg-blue-500/5 blur-3xl rounded-full" />
//             <Sparkles className="absolute -top-2 left-1/4 w-5 h-5 text-blue-400/50 animate-pulse" />
//             <Sparkles className="absolute top-6 right-1/4 w-3 h-3 text-cyan-400/50 animate-pulse delay-1000" />

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//               Drive Your{" "}
//               <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 Dreams
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
//               Discover the perfect vehicle for your journey. Luxury, economy, or
//               adventure — we have the right car for every occasion.
//             </p>
//           </div>

//           {/* Car Image Placeholder */}
//           <div className="hidden lg:flex justify-center mb-16">
//             <div className="relative">
//               <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
//               <img
//                 src="https://plus.unsplash.com/premium_photo-1673971700988-346588461fa7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Car Showcase"
//                 className="relative w-[600px] object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:scale-[1.05] transition-transform duration-700"
//               />
//               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 blur-lg" />
//             </div>
//           </div>

//           {/* Search Card */}
//           <div className="relative group mb-12">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />

//             <Card className="relative bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl overflow-hidden">
//               <CardContent className="relative p-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//                   {/* Location */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
//                       <MapPin className="w-4 h-4 text-blue-300" />
//                       Pick-up Location
//                     </label>
//                     <Input
//                       placeholder="Enter city or airport"
//                       className="bg-white/10 border-white/20 text-white h-12 rounded-lg pl-11 focus:ring-1 focus:ring-blue-400"
//                     />
//                   </div>

//                   {/* Dates */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
//                       <Calendar className="w-4 h-4 text-blue-300" />
//                       Pick-up & Return
//                     </label>
//                     <Input
//                       type="date"
//                       className="bg-white/10 border-white/20 text-white h-12 rounded-lg pl-11 focus:ring-1 focus:ring-blue-400"
//                     />
//                   </div>

//                   {/* Passengers */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-white/90">
//                       <Users className="w-4 h-4 text-blue-300" />
//                       Passengers
//                     </label>
//                     <Input
//                       type="number"
//                       min="1"
//                       placeholder="2"
//                       className="bg-white/10 border-white/20 text-white h-12 rounded-lg pl-11 focus:ring-1 focus:ring-blue-400"
//                     />
//                   </div>

//                   {/* Search Button */}
//                   <div className="flex items-end">
//                     <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition-all w-full h-12 font-semibold shadow-lg">
//                       <Search className="w-4 h-4 mr-2" /> Find Your Car
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="mt-6 pt-5 border-t border-white/10">
//                   <p className="text-white/70 text-sm mb-3 font-medium">
//                     Popular categories:
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {[
//                       "Luxury",
//                       "SUV",
//                       "Economy",
//                       "Sports",
//                       "Electric",
//                       "Convertible",
//                     ].map((cat) => (
//                       <button
//                         key={cat}
//                         className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/80 hover:bg-white/10 hover:border-blue-400/40 transition-all hover:scale-105"
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-15px) rotate(5deg);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Search, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=2000&auto=format&fit=crop')",
          backgroundPosition: "center -850px", // shift upward
        }}
      />

      {/* Floating Particles */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div> */}

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 pt-40">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            {/* <Sparkles className="absolute left-1/3 top-20 w-5 h-5 text-cyan-300 animate-pulse" />
            <Sparkles className="absolute right-1/3 top-24 w-4 h-4 text-blue-300 animate-pulse delay-1000" /> */}

            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Drive Your <span className="text-blue-400">Dreams</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mt-4 font-light">
              Find the perfect ride for business, adventure or luxury travel.
            </p>
          </div>

          {/* 👇 Clean Search Card */}
          <Card className="bg-black/70 backdrop-blur-lg border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white">
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-cyan-300" />
                    <Input
                      placeholder="City or Airport"
                      className="bg-white/10 border-white/20 text-white h-12 pl-10"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white">
                    Dates
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-cyan-300" />
                    <Input
                      type="date"
                      className="bg-white/10 border-white/20 text-white h-12 pl-10"
                    />
                  </div>
                </div>

                {/* Passengers */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-cyan-300" />
                    <Input
                      type="number"
                      min="1"
                      placeholder="2"
                      className="bg-white/10 border-white/20 text-white h-12 pl-10"
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="flex items-end">
                  <Button className="w-full h-12 bg-blue-400 hover:bg-cyan-600 text-white font-semibold rounded-xl">
                    <Search className="w-5 mr-2" />
                    Find Your Car
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Animation */}
      {/* <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style> */}
    </section>
  );
};

export default HeroSection;
