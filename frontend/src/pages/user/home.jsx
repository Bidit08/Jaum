import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import CarShowcase from "@/components/CarShowcase";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CarShowcase />
      <Footer />
    </div>
  );
}

// import Navbar from "@/components/Navbar";
// import HeroSection from "@/components/HeroSection";
// import FeatureSection from "@/components/FeatureSection";
// import CarShowcase from "@/components/CarShowcase";
// import Footer from "@/components/Footer";
// // import TrendingSection from "@/components/TrendingSection";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <div className="overflow-x-hidden bg-slate-950 text-white">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <HeroSection />
//       </motion.div>

//       {/* Feature Section */}
//       <motion.div
//         className="bg-gradient-to-b from-slate-950 to-slate-900"
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <FeatureSection />
//       </motion.div>

//       {/* Car Showcase */}
//       <motion.div
//         className="bg-white text-slate-900 rounded-t-[40px] pt-20 pb-28 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]"
//         initial={{ opacity: 0, y: 80 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.9 }}
//       >
//         {/* <TrendingSection /> */}
//         <CarShowcase />
//       </motion.div>

//       {/* Floating CTA */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 1, duration: 0.5 }}
//         className="fixed bottom-8 right-8 z-[999]"
//       >
//         <a
//           href="/vehicles"
//           className="px-6 py-3 rounded-full
// bg-gradient-to-r from-black to-gray-800
// text-white
// shadow-xl shadow-black/30
// hover:shadow-2xl hover:shadow-black/40
// hover:scale-105
// transition-all
// "
//         >
//           Explore Cars →
//         </a>
//       </motion.div>

//       {/* Footer */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <Footer />
//       </motion.div>
//     </div>
//   );
// }
