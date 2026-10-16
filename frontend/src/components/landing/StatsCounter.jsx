import {
  Users,
  Handshake,
  Map,
  Globe2,
  Sparkles,
} from "lucide-react";

function StatsCounter() {
  const stats = [
    {
      number: "10,000+",
      label: "Happy Travelers",
      icon: Users,
      description: "Customers served",
    },
    {
      number: "350+",
      label: "B2B Partners",
      icon: Handshake,
      description: "Travel partners",
    },
    {
      number: "750+",
      label: "Tour Packages",
      icon: Map,
      description: "Curated experiences",
    },
    {
      number: "60+",
      label: "Countries Covered",
      icon: Globe2,
      description: "Worldwide destinations",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-20 text-white">
      {/* Background decoration */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Sparkles size={16} />
            Trusted Travel Network
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Travel With Confidence
          </h2>

          <p className="mt-4 text-base leading-7 text-blue-100 sm:text-lg">
            Thousands of travelers and travel businesses trust WorldTrip
            Connect for better travel experiences and smarter business growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/15 bg-white/10 p-7 text-center shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-white/15"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 transition duration-300 group-hover:scale-110">
                  <Icon size={28} />
                </div>

                <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {item.number}
                </h3>

                <p className="mt-3 text-lg font-semibold text-white">
                  {item.label}
                </p>

                <p className="mt-1 text-sm text-blue-100">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom trust line */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-100">
            <span className="h-2 w-2 rounded-full bg-green-300" />
            Growing every day
          </div>

          <span className="hidden text-blue-300 sm:block">•</span>

          <p className="text-sm text-blue-100">
            Your trusted B2B & B2C travel platform
          </p>
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;