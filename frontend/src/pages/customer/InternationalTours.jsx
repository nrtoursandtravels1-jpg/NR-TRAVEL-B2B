import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  CalendarDays,
  Users,
} from "lucide-react";

const internationalTours = [
  {
    id: 1,
    title: "Dubai City Escape",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: "₹49,999",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    description:
      "Experience Dubai's iconic skyline, desert adventures, shopping and luxury attractions.",
  },
  {
    id: 2,
    title: "Thailand Holiday",
    destination: "Bangkok & Phuket",
    duration: "6 Days / 5 Nights",
    price: "₹54,999",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy tropical beaches, island experiences, local culture and exciting nightlife.",
  },
  {
    id: 3,
    title: "Singapore Explorer",
    destination: "Singapore",
    duration: "5 Days / 4 Nights",
    price: "₹59,999",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover Gardens by the Bay, Sentosa, Marina Bay and Singapore's vibrant city life.",
  },
  {
    id: 4,
    title: "Bali Tropical Escape",
    destination: "Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    price: "₹57,999",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    description:
      "Relax on beautiful beaches and explore temples, waterfalls and Bali's natural beauty.",
  },
  {
    id: 5,
    title: "Europe Highlights",
    destination: "Paris, Switzerland & Italy",
    duration: "10 Days / 9 Nights",
    price: "₹1,49,999",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore iconic European cities, beautiful landscapes, historic landmarks and local culture.",
  },
  {
    id: 6,
    title: "Maldives Luxury Escape",
    destination: "Maldives",
    duration: "5 Days / 4 Nights",
    price: "₹79,999",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy crystal-clear waters, private beaches, beautiful resorts and unforgettable island experiences.",
  },
];

function InternationalTours() {
  const navigate = useNavigate();

  return (
    <section
      id="international-tours"
      className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Travel Beyond Borders
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Popular International Tours
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500 md:text-lg">
              Explore unforgettable international destinations with curated
              holiday packages for couples, families and groups.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/customer/packages")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Explore All Packages
            <ArrowRight size={17} />
          </button>
        </div>

        {/* TOUR GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {internationalTours.map((tour) => (
            <article
              key={tour.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                  International
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-xl font-extrabold text-slate-900">
                  {tour.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-blue-600" />
                  <span>{tour.destination}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} className="text-blue-600" />
                  <span>{tour.duration}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Users size={16} className="text-blue-600" />
                  <span>Couples, Family & Group Options</span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                  {tour.description}
                </p>

                {/* PRICE */}
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Starting from
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-slate-900">
                      {tour.price}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/customer/packages/${tour.id}`)
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    View Tour
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* VISA / CUSTOM TRAVEL CTA */}
        <div className="mt-10 rounded-2xl bg-slate-900 px-6 py-9 text-center text-white md:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
            Customized International Travel
          </p>

          <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">
            Planning a trip somewhere else?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Tell us your destination, travel dates and requirements. Our
            travel experts can help you create a personalized international
            holiday package.
          </p>

          <button
            type="button"
            onClick={() => navigate("/customer/packages")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Plan My Trip
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default InternationalTours;