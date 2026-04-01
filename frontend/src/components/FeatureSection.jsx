// components/FeatureSection.jsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Shield, Zap, Clock, Star } from "lucide-react";

// const FeatureSection = () => {
//   const features = [
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Instant Booking",
//       description: "Book your vehicle in seconds with our streamlined process",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Fully Insured",
//       description:
//         "Comprehensive insurance coverage for complete peace of mind",
//     },
//     {
//       icon: <Clock className="w-8 h-8" />,
//       title: "24/7 Support",
//       description: "Round-the-clock customer support for any assistance needed",
//     },
//     {
//       icon: <Star className="w-8 h-8" />,
//       title: "Premium Fleet",
//       description: "Well-maintained vehicles from trusted brands",
//     },
//   ];

//   return (
//     <section className="py-20 bg-slate-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">
//             Why Choose DriveEasy?
//           </h2>
//           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//             Experience the difference with our premium car rental service
//             designed for modern travelers.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <CardContent className="p-6">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-600">{feature.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeatureSection;

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Clock, Star } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Booking",
      description:
        "Secure your ideal vehicle in seconds with our streamlined, real-time booking engine.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fully Insured",
      description:
        "Enjoy complete peace of mind with our comprehensive insurance coverage for every ride.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Our dedicated concierge team is available around the clock to assist you on your journey.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Fleet",
      description:
        "Drive with confidence in flawlessly maintained vehicles from top luxury brands.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/40 via-transparent to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-100/40 via-transparent to-transparent rounded-tr-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Why Choose{" "}
            <span className="text-blue-600 relative inline-block">
              Jaum
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full opacity-30"></div>
            </span>
            ?
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Elevating the standard of car rentals. We blend cutting-edge
            technology with uncompromised luxury to deliver a frictionless
            experience from search to drop-off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-3xl bg-white overflow-hidden relative"
            >
              {/* Subtle hover gradient ring */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-500 relative">
                  {/* Outer glow on icon */}
                  <div className="absolute inset-0 bg-blue-400 opacity-20 blur-xl rounded-full" />
                  <div className="relative z-10">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

// // components/FeatureSection.jsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Shield, Zap, Clock, Star } from "lucide-react";

// const FeatureSection = () => {
//   const features = [
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Instant Booking",
//       description: "Book your vehicle in seconds with our streamlined process",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Fully Insured",
//       description: "Comprehensive insurance coverage for peace of mind",
//     },
//     {
//       icon: <Clock className="w-8 h-8" />,
//       title: "24/7 Support",
//       description: "Round-the-clock customer assistance whenever you need it",
//     },
//     {
//       icon: <Star className="w-8 h-8" />,
//       title: "Premium Fleet",
//       description: "Well-maintained vehicles from trusted brands",
//     },
//   ];

//   return (
//     <section className="py-24 relative overflow-hidden">
//       {/* Background gradient blob */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[150px] -top-10 -left-20"></div>
//         <div className="absolute w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[150px] bottom-0 right-0"></div>
//       </div>

//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-5xl font-extrabold text-white-900 tracking-tight">
//             Why Choose <span className="text-blue-600">DriveEasy?</span>
//           </h2>
//           <p className="text-lg text-grey-600 max-w-2xl mx-auto mt-4">
//             A modern and reliable rental service crafted for today’s travelers.
//           </p>
//         </div>

//         {/* Feature grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className="border-0 backdrop-blur-xl bg-white/70 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl"
//             >
//               <CardContent className="p-8 text-center">
//                 {/* Modern Icon Circle */}
//                 <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-blue-600 shadow-inner backdrop-blur-xl">
//                   {feature.icon}
//                 </div>

//                 <h3 className="text-2xl font-semibold text-slate-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeatureSection;
