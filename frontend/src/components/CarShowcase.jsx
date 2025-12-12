// components/CarShowcase.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Fuel, Car } from "lucide-react";

const CarShowcase = () => {
  const cars = [
    {
      id: 1,
      name: "Tesla Model 3",
      type: "Electric",
      price: 89,
      image: "/api/placeholder/300/200",
      seats: 5,
      fuel: "Electric",
      rating: 4.8,
      features: ["Auto Pilot", "Premium Sound", "Sunroof"],
    },
    {
      id: 2,
      name: "BMW X5",
      type: "SUV",
      price: 129,
      image: "/api/placeholder/300/200",
      seats: 7,
      fuel: "Premium",
      rating: 4.6,
      features: ["4WD", "Leather Seats", "Navigation"],
    },
    {
      id: 3,
      name: "Mercedes C-Class",
      type: "Luxury",
      price: 99,
      image: "/api/placeholder/300/200",
      seats: 5,
      fuel: "Premium",
      rating: 4.7,
      features: ["Premium Audio", "Panoramic Roof", "Heated Seats"],
    },
    {
      id: 4,
      name: "Toyota Camry",
      type: "Sedan",
      price: 59,
      image: "/api/placeholder/300/200",
      seats: 5,
      fuel: "Regular",
      rating: 4.5,
      features: ["Bluetooth", "Backup Camera", "Cruise Control"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Featured Vehicles
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of premium vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <Card
              key={car.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              <CardContent className="p-0">
                {/* Car Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src="https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}"
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-slate-900">
                      ${car.price}/day
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {car.name}
                      </h3>
                      <p className="text-slate-500">{car.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {car.seats}
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-4 h-4 mr-1" />
                      {car.fuel}
                    </div>
                  </div>

                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;
