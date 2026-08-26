import { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Trash2,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("wishlist")
        .select(`
          *,
          packages (*)
        `)
        .eq("customer_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Wishlist Error:", error);
        setWishlist([]);
        return;
      }

      setWishlist(data || []);
    } catch (error) {
      console.error("Wishlist Load Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(wishlistId) {
    try {
      setRemovingId(wishlistId);

      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistId);

      if (error) {
        console.error("Remove Wishlist Error:", error);
        return;
      }

      setWishlist((current) =>
        current.filter((item) => item.id !== wishlistId)
      );
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
    } finally {
      setRemovingId(null);
    }
  }

  function getPackage(item) {
    return item.packages || item.package || item;
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading your wishlist...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* HEADER */}

        <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-sm lg:p-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                Customer
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight lg:text-4xl">
                My Wishlist ❤️
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Save your favourite travel packages and come back to them
                whenever you're ready to plan your journey.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Heart size={27} />
            </div>

          </div>
        </div>


        {/* CONTENT */}

        <div className="mt-8">

          {wishlist.length === 0 ? (

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Heart size={30} />
              </div>

              <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                Your wishlist is empty
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven't saved any travel packages yet.
                Explore packages and add your favourites here.
              </p>

              <button
                onClick={() => navigate("/customer/packages")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <Search size={17} />
                Explore Packages
              </button>

            </div>

          ) : (

            <>
              {/* SUMMARY */}

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Saved Packages
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {wishlist.length} saved package
                    {wishlist.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/customer/packages")}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Explore More
                  <ArrowUpRight size={16} />
                </button>

              </div>


              {/* PACKAGE GRID */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {wishlist.map((item) => {
                  const pkg = getPackage(item);

                  const packageId =
                    item.package_id ||
                    pkg.id;

                  const packageName =
                    pkg.package_name ||
                    pkg.name ||
                    pkg.title ||
                    "Travel Package";

                  const destination =
                    pkg.destination ||
                    pkg.location ||
                    "";

                  const price =
                    pkg.price ||
                    pkg.package_price ||
                    pkg.amount;

                  const image =
                    pkg.image_url ||
                    pkg.image ||
                    pkg.cover_image ||
                    null;

                  const travelDate =
                    pkg.travel_date ||
                    pkg.start_date ||
                    pkg.departure_date ||
                    null;

                  return (
                    <div
                      key={item.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                      {/* IMAGE */}

                      <div className="relative h-52 overflow-hidden bg-slate-100">

                        {image ? (
                          <img
                            src={image}
                            alt={packageName}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-300">
                            <Heart size={42} />
                          </div>
                        )}

                        <button
                          onClick={() =>
                            removeFromWishlist(item.id)
                          }
                          disabled={removingId === item.id}
                          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>


                      {/* DETAILS */}

                      <div className="p-5">

                        <h3 className="line-clamp-2 text-lg font-extrabold text-slate-900">
                          {packageName}
                        </h3>


                        {destination && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={16} className="text-blue-600" />
                            <span>{destination}</span>
                          </div>
                        )}


                        {travelDate && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <CalendarDays size={16} className="text-blue-600" />

                            <span>
                              {new Date(travelDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        )}


                        {price !== undefined &&
                          price !== null &&
                          price !== "" && (
                            <div className="mt-4 text-xl font-extrabold text-slate-900">
                              ₹
                              {Number(price).toLocaleString("en-IN")}
                            </div>
                          )}


                        <button
                          onClick={() =>
                            navigate(
                              `/customer/packages/${packageId}`
                            )
                          }
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          View Package
                          <ArrowUpRight size={17} />
                        </button>

                      </div>

                    </div>
                  );
                })}

              </div>
            </>
          )}

        </div>

      </div>
    </Layout>
  );
}