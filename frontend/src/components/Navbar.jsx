// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-white/10">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">Jaum</h1>
//         <div className="hidden md:flex space-x-6 text-gray-300">
//           <a href="#" className="hover:text-white">
//             Home
//           </a>
//           <a href="#" className="hover:text-white">
//             Vehicles
//           </a>
//           <a href="#" className="hover:text-white">
//             Services
//           </a>
//           <a href="#" className="hover:text-white">
//             Contact
//           </a>
//         </div>
//         <div className="text-center mt-6">
//           <Link to="/signup">
//             <Button className="bg-black/80 hover:bg-black/50 text-white">
//               Sign In
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { UserCircle, LogOut } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();

//   // Read user from localStorage
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   });

//   // Listen for login/logout events
//   useEffect(() => {
//     const updateUser = () => {
//       try {
//         const raw = localStorage.getItem("user");
//         setUser(raw ? JSON.parse(raw) : null);
//       } catch {
//         setUser(null);
//       }
//     };

//     window.addEventListener("authChanged", updateUser);
//     window.addEventListener("storage", updateUser); // for multi-tab sync

//     return () => {
//       window.removeEventListener("authChanged", updateUser);
//       window.removeEventListener("storage", updateUser);
//     };
//   }, []);

//   // handle logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.dispatchEvent(new Event("authChanged"));
//     navigate("/");
//   };

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-white/10">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/">
//           <h1 className="text-2xl font-bold text-white">Jaum</h1>
//         </Link>

//         {/* Nav Links */}
//         <div className="hidden md:flex space-x-6 text-gray-300">
//           <Link to="/" className="hover:text-white">
//             Home
//           </Link>
//           <Link to="/vehicles" className="hover:text-white">
//             Vehicles
//           </Link>
//           <Link to="/services" className="hover:text-white">
//             Services
//           </Link>
//           <Link to="/contact" className="hover:text-white">
//             Contact
//           </Link>
//         </div>

//         {/* RIGHT SIDE AUTH SECTION */}
//         <div>
//           {!user ? (
//             // Logged OUT
//             <Link to="/login">
//               <Button className="bg-black/80 hover:bg-black/50 text-white">
//                 Sign In
//               </Button>
//             </Link>
//           ) : (
//             // Logged IN — Show Avatar Dropdown
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage src={user?.profilePicture} alt={user?.name} />
//                   <AvatarFallback>
//                     {user?.name ? (
//                       user.name.charAt(0).toUpperCase()
//                     ) : (
//                       <UserCircle className="h-5 w-5" />
//                     )}
//                   </AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent align="end" className="w-48 mt-2">
//                 <div className="px-3 py-2">
//                   <p className="font-semibold">{user?.name}</p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem onClick={() => navigate("/dashboard")}>
//                   <UserCircle className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem
//                   onClick={logout}
//                   className="text-red-500 focus:text-red-500"
//                 >
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "@/utils/api";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { User, LayoutDashboard, Moon, LogOut } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   // 🔥 Load user from backend if token exists
//   useEffect(() => {
//     const loadUser = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setUser(null);
//         return;
//       }

//       try {
//         const res = await api.get("/user/profile");

//         // Save latest profile to localStorage
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to load user profile");
//         setUser(null);
//       }
//     };

//     loadUser();

//     window.addEventListener("authChanged", loadUser);
//     return () => window.removeEventListener("authChanged", loadUser);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-white/10">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link to="/">
//           <h1 className="text-2xl font-bold text-white">Jaum</h1>
//         </Link>

//         <div className="hidden md:flex space-x-6 text-gray-300">
//           <Link to="/" className="hover:text-white">
//             Home
//           </Link>
//           <Link to="/vehicles" className="hover:text-white">
//             Vehicles
//           </Link>
//           <Link to="/services" className="hover:text-white">
//             Services
//           </Link>
//           <Link to="/contact" className="hover:text-white">
//             Contact
//           </Link>
//         </div>

//         <div>
//           {!user ? (
//             <Link to="/login">
//               <Button className="bg-black/80 hover:bg-black/50 text-white">
//                 Sign In
//               </Button>
//             </Link>
//           ) : (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <button className="flex items-center gap-2 rounded-full border border-white/20 p-1 hover:bg-white/10 transition">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={
//                         user?.profilePicture
//                           ? `${BACKEND_URL}${user.profilePicture}`
//                           : undefined
//                       }
//                       alt={user?.name}
//                     />
//                     <AvatarFallback>
//                       {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
//                     </AvatarFallback>
//                   </Avatar>
//                 </button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent
//                 align="end"
//                 className="w-56 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-2"
//               >
//                 {/* HEADER */}
//                 {/* <div className="px-2 py-2">
//                   <p className="text-sm font-semibold text-white">Account</p>
//                 </div> */}

//                 <div className="px-3 py-3">
//                   <p className="text-sm font-semibold text-white">
//                     {user?.username || user?.name}
//                   </p>
//                   <p className="text-xs text-gray-400 truncate">
//                     {user?.email}
//                   </p>
//                 </div>

//                 <DropdownMenuSeparator className="bg-white/10" />

//                 {/* PROFILE */}
//                 <DropdownMenuItem
//                   onClick={() => navigate("/profile")}
//                   className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
//                 >
//                   <User className="h-4 w-4" />
//                   Profile
//                 </DropdownMenuItem>

//                 {/* DASHBOARD */}
//                 <DropdownMenuItem
//                   onClick={() => navigate("/dashboard")}
//                   className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
//                 >
//                   <LayoutDashboard className="h-4 w-4" />
//                   Dashboard
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator className="bg-white/10 my-1" />

//                 {/* DARK MODE */}
//                 <DropdownMenuItem
//                   onClick={() =>
//                     document.documentElement.classList.toggle("dark")
//                   }
//                   className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
//                 >
//                   <Moon className="h-4 w-4" />
//                   Dark Mode
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator className="bg-white/10 my-1" />

//                 {/* LOGOUT */}
//                 <DropdownMenuItem
//                   onClick={logout}
//                   className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LayoutDashboard, Moon, LogIn, LogOut } from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user (from backend if token exists)
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await api.get("/user/profile");
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("authChanged", loadUser);

    return () => window.removeEventListener("authChanged", loadUser);
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">Jaum</h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 text-gray-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/vehicles" className="hover:text-white">
            Vehicles
          </Link>
          <Link to="/services" className="hover:text-white">
            Services
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>

        {/* Profile / Guest Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-white/20 p-1 hover:bg-white/10 transition">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    user?.profilePicture
                      ? `${BACKEND_URL}${user.profilePicture}`
                      : undefined
                  }
                />
                <AvatarFallback>
                  {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-2"
          >
            {/* HEADER */}
            <div className="px-3 py-3">
              <p className="text-sm font-semibold text-white">
                {user ? user.username || user.name : "Guest"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user ? user.email : "Not logged in"}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-white/10" />

            {/* Logged-in options */}
            {user && (
              <>
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 my-1" />

                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </>
            )}

            {/* Logged-out options */}
            {!user && (
              <>
                <DropdownMenuItem
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
