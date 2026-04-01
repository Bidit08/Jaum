// // components/Footer.jsx
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-slate-900 text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-2xl font-bold mb-4">DriveEasy</h3>
//             <p className="text-gray-400 mb-4">
//               Your trusted partner for premium car rental services. Experience
//               luxury and convenience like never before.
//             </p>
//             <div className="flex space-x-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Facebook className="w-5 h-5" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Twitter className="w-5 h-5" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Instagram className="w-5 h-5" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Youtube className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Our Fleet
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Locations
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   FAQ
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Services</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Luxury Rentals
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Business Travel
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Airport Transfer
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Long Term Rental
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Corporate Plans
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
//             <p className="text-gray-400 mb-4">
//               Subscribe to get special offers and updates
//             </p>
//             <div className="flex space-x-2">
//               <Input
//                 placeholder="Enter your email"
//                 className="bg-slate-800 border-slate-700 text-white"
//               />
//               <Button className="bg-cyan-500 hover:bg-cyan-600">
//                 Subscribe
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400">
//           <p>&copy; 2024 DriveEasy. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-black mb-6 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Jaum
            </h3>
            <p className="text-slate-400 mb-8 max-w-sm font-medium leading-relaxed">
              Your trusted partner for premium automobile rentals. We blend
              luxury, technology, and superior service.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                "About Us",
                "Our Fleet",
                "Locations",
                "Pricing",
                "Testimonials",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-400 text-sm font-medium hover:text-cyan-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                "Luxury Rentals",
                "Chauffeur",
                "Airport Transfer",
                "Corporate Plans",
                "Weddings",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-400 text-sm font-medium hover:text-cyan-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
              Exclusive Access
            </h4>
            <p className="text-slate-400 text-sm mb-6 font-medium">
              Join our VIP list for exclusive offers, fleet updates, and
              priority booking.
            </p>

            <div className="relative group/mail">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover/mail:text-cyan-400 transition-colors" />
              <Input
                placeholder="Enter your email"
                className="w-full h-14 bg-slate-900/50 backdrop-blur-sm border-slate-800 text-white placeholder:text-slate-600 pl-12 pr-32 rounded-2xl focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50 shadow-inner"
              />
              <Button className="absolute right-1 top-1 bottom-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold tracking-wider uppercase text-[10px] px-6 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                Subscribe
              </Button>
            </div>
            <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-wider font-bold">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Jaum. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
