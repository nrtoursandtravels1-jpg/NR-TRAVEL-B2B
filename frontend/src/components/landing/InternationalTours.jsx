import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  MapPin,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";

function InternationalTour() {
  const navigate = useNavigate();

  const internationalTours = [
    {
      id: 1,
      title: "Dubai Luxury Escape",
      destination: "Dubai, UAE",
      duration: "5 Days / 4 Nights",
      price: "₹49,999",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
      description:
        "Experience Dubai's iconic skyline, luxury shopping, desert safari and unforgettable attractions.",
    },
    {
      id: 2,
      title: "Thailand Beach Holiday",
      destination: "Bangkok • Phuket",
      duration: "6 Days / 5 Nights",
      price: "₹39,999",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85",
      description:
        "Enjoy beautiful beaches, island experiences, vibrant markets and Thai culture.",
    },
    {
      id: 3,
      title: "Bali Paradise Tour",
      destination: "Bali, Indonesia",
      duration: "6 Days / 5 Nights",
      price: "₹44,999",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      description:
        "Discover Bali's temples, beaches, waterfalls, rice terraces and relaxing island lifestyle.",
    },
    {
      id: 4,
      title: "Singapore Explorer",
      destination: "Singapore",
      duration: "5 Days / 4 Nights",
      price: "₹54,999",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
      description:
        "Explore Marina Bay, Sentosa, Gardens by the Bay and the modern attractions of Singapore.",
    },
    {
      id: 5,
      title: "Maldives Romantic Escape",
      destination: "Maldives",
      duration: "4 Days / 3 Nights",
      price: "₹59,999",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
      description:
        "Relax in crystal-clear waters, luxury resorts and beautiful private island surroundings.",
    },
    {
      id: 6,
      title: "Europe Highlights",
      destination: "Paris • Switzerland • Italy",
      duration: "10 Days / 9 Nights",
      price: "₹1,49,999",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
      description:
        "Experience Europe's iconic cities, breathtaking landscapes, culture and unforgettable sights.",
    },
  ];

  const handleViewPackage = (tour) => {
    navigate(`/customer/packages/${tour.id}`);
  };

  return (
    <section
      id="international-tours"
      className="relative overflow-hidden bg-slate-50 px-5 py-20 sm:px-8 lg:px-10"
    >
      {/* Background Effects */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Globe2 size={16} />
            International Tours
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Explore the{" "}
            <span className="text-blue-600">World</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Discover unforgettable international destinations with carefully
            planned holidays, comfortable stays and memorable travel
            experiences.
          </p>
        </div>

        {/* ================= DESTINATION STRIP ================= */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "Dubai",
            "Thailand",
            "Bali",
            "Singapore",
            "Maldives",
            "Europe",
          ].map((destination) => (
            <div
              key={destination}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <MapPin size={15} className="text-blue-600" />
              {destination}
            </div>
          ))}
        </div>

        {/* ================= TOUR GRID ================= */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internationalTours.map((tour, index) => (
            <article
              key={tour.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                {/* Badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg backdrop-blur">
                  {index < 3 ? (
                    <>
                      <Sparkles size={13} className="text-amber-500" />
                      Popular
                    </>
                  ) : (
                    <>
                      <Plane size={13} className="text-blue-600" />
                      International
                    </>
                  )}
                </div>

                {/* Price */}
                <div className="absolute bottom-4 right-4 rounded-2xl bg-slate-950/90 px-4 py-2.5 text-white shadow-xl backdrop-blur">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    Starting from
                  </p>

                  <p className="text-lg font-extrabold text-amber-400">
                    {tour.price}
                  </p>
                </div>

                {/* Destination */}
                <div className="absolute bottom-4 left-4 max-w-[55%] text-white">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-blue-200">
                    <MapPin size={14} />
                    {tour.destination}
                  </div>

                  <h3 className="mt-1 text-xl font-bold leading-tight">
                    {tour.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="min-h-[72px] text-sm leading-6 text-slate-500">
                  {tour.description}
                </p>

                {/* Details */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="text-blue-600"
                      />

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          Duration
                        </p>

                        <p className="mt-0.5 text-xs font-bold text-slate-700">
                          {tour.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                      <Users
                        size={16}
                        className="text-blue-600"
                      />

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          Suitable For
                        </p>

                        <p className="mt-0.5 text-xs font-bold text-slate-700">
                          Couples & Families
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleViewPackage(tour)}
                  className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
                >
                  View Package

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover/button:translate-x-1"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-2xl sm:px-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-blue-300">
                <Plane size={17} />
                Your next adventure starts here
              </div>

              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Can't find your dream international holiday?
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Tell us where you want to go and we'll help you plan a
                personalized international trip according to your budget and
                travel requirements.
              </p>
            </div>

            <button
              onClick={() => navigate("/customer/packages")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Explore All Packages
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InternationalTour;