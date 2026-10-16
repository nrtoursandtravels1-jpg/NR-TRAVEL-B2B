import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  Star,
  Compass,
} from "lucide-react";

function PopularDestinations() {
  const destinations = [
    {
      name: "Kashmir",
      image:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1000",
      price: "₹18,999",
      tours: "25+ Tours",
      tag: "Paradise on Earth",
    },
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000",
      price: "₹9,999",
      tours: "30+ Tours",
      tag: "Beach Escape",
    },
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000",
      price: "₹39,999",
      tours: "18+ Tours",
      tag: "Luxury Getaway",
    },
    {
      name: "Bali",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1000",
      price: "₹44,999",
      tours: "15+ Tours",
      tag: "Tropical Escape",
    },
    {
      name: "Thailand",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1000",
      price: "₹29,999",
      tours: "22+ Tours",
      tag: "Island Adventure",
    },
    {
      name: "Europe",
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1000",
      price: "₹1,19,999",
      tours: "12+ Tours",
      tag: "Grand European Tour",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            Explore The World
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Popular{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover the most loved destinations across India and the world,
            with handpicked tours and great prices.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.name} travel destination`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

                {/* Tag */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg backdrop-blur">
                  <Sparkles size={13} className="text-blue-600" />
                  {item.tag}
                </div>

                {/* Rating */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  4.8
                </div>

                {/* Destination name on image */}
                <div className="absolute bottom-5 left-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                    <MapPin size={15} />
                    Popular Destination
                  </div>

                  <h3 className="mt-1 text-2xl font-black text-white">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Packages from
                    </p>

                    <p className="mt-1 text-2xl font-black text-blue-600">
                      {item.price}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-right">
                    <p className="text-xs font-semibold text-slate-400">
                      Available
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {item.tours}
                    </p>
                  </div>
                </div>

                <Link
                  to="/customer/packages"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-600"
                >
                  Explore {item.name}
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                <Compass size={20} />
                <span className="text-sm font-bold uppercase tracking-wider text-blue-100">
                  Your Next Adventure
                </span>
              </div>

              <h3 className="text-2xl font-black sm:text-3xl">
                Can&apos;t decide where to go?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Explore our complete collection of domestic and international
                travel packages.
              </p>
            </div>

            <Link
              to="/customer/packages"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              View All Packages
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;