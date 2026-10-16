import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Hotel,
  MapPin,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { supabase } from "../../services/supabase";

function FeaturedPackages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tour_packages")
      .select("*")
      .eq("status", "Active")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.log("Featured packages error:", error.message);
      setPackages([]);
    } else {
      setPackages(data || []);
    }

    setLoading(false);
  }

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <section className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-8 w-52 animate-pulse rounded-lg bg-slate-200" />

            <div className="mx-auto mt-4 h-5 w-80 max-w-full animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-56 animate-pulse bg-slate-200" />

                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-packages"
      className="relative overflow-hidden bg-slate-50 px-6 py-20 md:px-10 lg:px-16 lg:py-24"
    >
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              <Sparkles size={15} />
              Featured Experiences
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Featured{" "}
              <span className="text-blue-600">
                Tour Packages
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
              Discover our most loved travel experiences, carefully
              designed to make your next journey unforgettable.
            </p>

          </div>

          <button
            type="button"
            onClick={() => navigate("/customer/packages")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-lg"
          >
            Explore All Packages
            <ArrowRight size={17} />
          </button>

        </div>

        {/* EMPTY STATE */}
        {packages.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <PackageCheck size={26} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No Featured Packages Available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              We're preparing some amazing travel experiences for you.
              Please check back soon.
            </p>

            <button
              type="button"
              onClick={() => navigate("/customer/packages")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Explore Packages
              <ArrowRight size={17} />
            </button>

          </div>
        ) : (
          /* PACKAGE GRID */
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">

            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-2xl"
              >

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden bg-slate-100">

                  <img
                    src={
                      pkg.image_url ||
                      "https://placehold.co/900x550?text=WorldTrip+Connect"
                    }
                    alt={pkg.package_name || "Tour Package"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Featured badge */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-lg backdrop-blur-sm">
                    <Sparkles size={13} />
                    Featured
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 rounded-xl bg-slate-950/85 px-4 py-2 text-white shadow-lg backdrop-blur-sm">
                    <p className="text-[10px] text-slate-300">
                      Starting from
                    </p>

                    <p className="text-lg font-extrabold">
                      ₹{" "}
                      {pkg.price
                        ? Number(pkg.price).toLocaleString("en-IN")
                        : "0"}
                    </p>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="line-clamp-1 text-xl font-extrabold text-slate-900">
                    {pkg.package_name || "Travel Package"}
                  </h3>

                  {/* Destination */}
                  <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <span className="line-clamp-1">
                      {pkg.destination || "Multiple Destinations"}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="mt-2.5 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-blue-600"
                    />

                    <span>
                      {pkg.duration || "Flexible Duration"}
                    </span>
                  </div>

                  {/* Hotel */}
                  <div className="mt-2.5 flex items-center gap-2 text-sm text-slate-500">
                    <Hotel
                      size={17}
                      className="shrink-0 text-blue-600"
                    />

                    <span>
                      {pkg.hotel_category || "Hotel Included"}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-slate-100" />

                  {/* Bottom */}
                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Package Price
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-slate-900">
                        ₹{" "}
                        {pkg.price
                          ? Number(pkg.price).toLocaleString("en-IN")
                          : "0"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/customer/packages/${pkg.id}`)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      View Package
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

        {/* BOTTOM CTA */}
        {packages.length > 0 && (
          <div className="mt-12 rounded-3xl bg-slate-950 px-6 py-9 text-center shadow-xl md:px-10">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <PackageCheck size={22} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
              Looking for something more specific?
            </h3>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Explore our complete package collection and find the
              perfect trip for your budget, destination and travel dates.
            </p>

            <button
              type="button"
              onClick={() => navigate("/customer/packages")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Explore All Packages
              <ArrowRight size={17} />
            </button>

          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedPackages;