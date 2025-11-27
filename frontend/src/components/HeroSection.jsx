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
