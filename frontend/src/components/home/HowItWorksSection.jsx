import { Search, CalendarCheck, Car } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-cyan-400" />,
      title: "1. Browse",
      description: "Explore our vast collection of verified premium vehicles.",
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-blue-400" />,
      title: "2. Book",
      description: "Select your dates and securely reserve your ideal ride.",
    },
    {
      icon: <Car className="w-8 h-8 text-indigo-400" />,
      title: "3. Drive",
      description:
        "Pick up your vehicle and enjoy the open road with peace of mind.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Jaum Works
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Get on the road in three simple steps. We've streamlined the process
            so you can focus on the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 z-0 border-t-2 border-dashed border-slate-300" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container with hover effects */}
              <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 border border-slate-100 group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">{step.icon}</div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
