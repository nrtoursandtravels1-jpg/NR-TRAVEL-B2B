import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  CalendarDays,
  Users,
} from "lucide-react";

const domesticTours = [
  {
    id: 1,
    title: "Goa Beach Escape",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    price: "₹14,999",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy beautiful beaches, relaxing stays and unforgettable coastal experiences.",
  },
  {
    id: 2,
    title: "Manali Mountain Holiday",
    destination: "Manali, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    price: "₹18,999",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    description:
      "Experience mountains, valleys, scenic views and refreshing Himalayan adventures.",
  },
  {
    id: 3,
    title: "Rajasthan Heritage Tour",
    destination: "Jaipur, Jodhpur & Udaipur",
    duration: "6 Days / 5 Nights",
    price: "₹21,999",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover royal palaces, forts, culture and the colourful heritage of Rajasthan.",
  },
  {
    id: 4,
    title: "Kerala Backwater Escape",
    destination: "Kerala",
    duration: "5 Days / 4 Nights",
    price: "₹19,999",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    description:
      "Relax among Kerala's backwaters, greenery, beaches and beautiful landscapes.",
  },
  {
    id: 5,
    title: "Kashmir Paradise Tour",
    destination: "Srinagar & Gulmarg",
    duration: "6 Days / 5 Nights",
    price: "₹24,999",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d8e7d2f0?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore breathtaking valleys, lakes and mountain landscapes in Kashmir.",
  },
  {
    id: 6,
    title: "Uttarakhand Adventure",
    destination: "Rishikesh & Mussoorie",
    duration: "5 Days / 4 Nights",
    price: "₹17,999",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description:
      "Combine mountain escapes, adventure activities and peaceful hill-station experiences.",
  },
];

function DomesticTours() {
  const navigate = useNavigate();

  return (
    <section
      id="domestic-tours"
      className="bg-white px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Explore India
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Popular Domestic Tours
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500 md:text-lg">
              Discover amazing destinations across India with carefully
              planned travel experiences for families, groups and couples.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/customer/packages")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Explore All Tours
            <ArrowRight size={17} />
          </button>
        </div>

        {/* TOUR GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {domesticTours.map((tour) => (
            <article
              key={tour.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                  Domestic Tour
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
                  <span>Family, Group & Custom Options</span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                  {tour.description}
                </p>

                {/* PRICE + BUTTON */}
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

        {/* CUSTOM TOUR CTA */}
        <div className="mt-10 rounded-2xl bg-slate-900 px-6 py-8 text-center text-white md:px-10">
          <h3 className="text-2xl font-extrabold">
            Can't find your perfect destination?
          </h3>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Tell us your travel requirements and our experts will help create
            a customized package for you.
          </p>

          <button
            type="button"
            onClick={() => navigate("/customer/packages")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Find Your Package
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default DomesticTours;