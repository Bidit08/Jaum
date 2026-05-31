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

// import { Link } from "react-router-dom";
// import { Car, GitCompare, LogIn, UserPlus, LayoutDashboard } from "lucide-react";

// const Footer = () => {
//   const year = new Date().getFullYear();

//   // Only pages that actually exist as routes in App.jsx
//   const exploreLinks = [
//     { label: "Home", to: "/" },
//     { label: "Browse Cars", to: "/listings" },
//     { label: "Compare Vehicles", to: "/compare/select" },
//   ];

//   const accountLinks = [
//     { label: "Login", to: "/login" },
//     { label: "Sign Up", to: "/signup" },
//     { label: "My Dashboard", to: "/dashboard" },
//   ];

//   return (
//     <footer className="bg-slate-950 text-white relative overflow-hidden">
//       {/* Decorative top border */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
//       {/* Background glows */}
//       <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

//           {/* Brand */}
//           <div className="lg:col-span-5">
//             <h3 className="text-3xl font-black mb-6 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
//               Jaum
//             </h3>
//             <p className="text-slate-400 mb-8 max-w-sm font-medium leading-relaxed">
//               Your trusted partner for premium automobile rentals. We blend
//               luxury, technology, and superior service.
//             </p>
//           </div>

//           {/* Explore */}
//           <div className="lg:col-span-3">
//             <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
//               Explore
//             </h4>
//             <ul className="space-y-4">
//               {exploreLinks.map(({ label, to }) => (
//                 <li key={to}>
//                   <Link
//                     to={to}
//                     className="text-slate-400 text-sm font-medium hover:text-cyan-400 transition-colors inline-flex items-center group"
//                   >
//                     <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Account */}
//           <div className="lg:col-span-3">
//             <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
//               Account
//             </h4>
//             <ul className="space-y-4">
//               {accountLinks.map(({ label, to }) => (
//                 <li key={to}>
//                   <Link
//                     to={to}
//                     className="text-slate-400 text-sm font-medium hover:text-cyan-400 transition-colors inline-flex items-center group"
//                   >
//                     <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-slate-800/80 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-slate-500 text-sm font-medium">
//             &copy; {year} Jaum. All rights reserved.
//           </p>
//           <div className="flex space-x-6 text-sm font-medium text-slate-500">
//             <Link to="/listings" className="hover:text-cyan-400 transition-colors">
//               Browse Cars
//             </Link>
//             <Link to="/compare/select" className="hover:text-cyan-400 transition-colors">
//               Compare
//             </Link>
//             <Link to="/login" className="hover:text-cyan-400 transition-colors">
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  // Mirror the same auth pattern used in Navbar — read from localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem("user");
        setUser(saved ? JSON.parse(saved) : null);
      } catch {
        setUser(null);
      }
    };
    // Keep in sync when login/logout happens (same events Navbar uses)
    window.addEventListener("authChanged", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("authChanged", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "Browse Cars", to: "/listings" },
    { label: "Compare Vehicles", to: "/compare/select" },
  ];

  // Show profile/dashboard when logged in, login/signup when logged out
  const accountLinks = user
    ? [
        { label: "My Dashboard", to: "/dashboard" },
        { label: "Profile", to: "/dashboard/profile" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Sign Up", to: "/signup" },
      ];

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      {/* Background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-black mb-6 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Jaum
            </h3>
            <p className="text-slate-400 mb-8 max-w-sm font-medium leading-relaxed">
              Your trusted partner for premium automobile rentals. We blend
              luxury, technology, and superior service.
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {exploreLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 text-sm font-medium hover:text-cyan-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-black tracking-widest uppercase text-white mb-6">
              Account
            </h4>
            <ul className="space-y-4">
              {accountLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 text-sm font-medium hover:text-cyan-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {year} Jaum. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-medium text-slate-500">
            <Link to="/listings" className="hover:text-cyan-400 transition-colors">
              Browse Cars
            </Link>
            <Link to="/compare/select" className="hover:text-cyan-400 transition-colors">
              Compare
            </Link>
            {user ? (
              <Link to="/dashboard/profile" className="hover:text-cyan-400 transition-colors">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="hover:text-cyan-400 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
