import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Jaum</h1>
        <div className="hidden md:flex space-x-6 text-gray-300">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#" className="hover:text-white">
            Vehicles
          </a>
          <a href="#" className="hover:text-white">
            Services
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
        <div className="text-center mt-6">
          <Link to="/signup">
            <Button className="bg-black/80 hover:bg-black/50 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
