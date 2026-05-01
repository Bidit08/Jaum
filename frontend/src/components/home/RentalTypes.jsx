import React from "react";
import { Link } from "react-router-dom";
import { Car, Users, CheckCircle2, Check } from "lucide-react";

const RentalTypes = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-slate-200/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            How do you want to travel?
          </h2>
          <p className="text-slate-500 text-lg">
            Choose the perfect rental style for your next trip, whether you need
            the whole car or just a seat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Full Vehicle Card */}
          <Link
            to="/listings?mode=full"
            className="group relative flex flex-col bg-white border-2 border-slate-100 rounded-[2rem] p-7 md:p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:border-blue-500 cursor-pointer"
          >
            {/* Label */}
            <div className="absolute -top-3.5 left-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-sm">
              Most Popular
            </div>

            {/* Header: Icon & Title */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Car size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Full Vehicle
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Complete privacy and freedom
                  </p>
                </div>
              </div>
              {/* Fake Radio/Check */}
              <div className="text-slate-200 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300">
                <CheckCircle2 size={30} strokeWidth={1.5} />
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Drive wherever, whenever you want</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Perfect for families and group trips</span>
              </li>
            </ul>

            {/* Button */}
            <div className="mt-auto w-full flex items-center justify-center py-3.5 rounded-xl bg-slate-50 text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              Browse Cars
            </div>
          </Link>

          {/* Seat Share Card */}
          <Link
            to="/listings?mode=seats"
            className="group relative flex flex-col bg-white border-2 border-slate-100 rounded-[2rem] p-7 md:p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.15)] hover:border-purple-500 cursor-pointer"
          >
            {/* Label */}
            <div className="absolute -top-3.5 left-8 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-sm">
              Save Money
            </div>

            {/* Header: Icon & Title */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Users size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Seat Share
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Travel smartly with others
                  </p>
                </div>
              </div>
              {/* Fake Radio/Check */}
              <div className="text-slate-200 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300">
                <CheckCircle2 size={30} strokeWidth={1.5} />
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Significantly cheaper travel costs</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Eco-friendly shared journeys</span>
              </li>
            </ul>

            {/* Button */}
            <div className="mt-auto w-full flex items-center justify-center py-3.5 rounded-xl bg-slate-50 text-purple-600 font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
              Find Seats
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RentalTypes;
