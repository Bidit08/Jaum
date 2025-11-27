// components/FeatureSection.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Clock, Star } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Book your vehicle in seconds with our streamlined process",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fully Insured",
      description:
        "Comprehensive insurance coverage for complete peace of mind",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for any assistance needed",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Fleet",
      description: "Well-maintained vehicles from trusted brands",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose DriveEasy?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the difference with our premium car rental service
            designed for modern travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
