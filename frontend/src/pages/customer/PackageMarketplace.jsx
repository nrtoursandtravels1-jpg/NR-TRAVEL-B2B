import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  PackageOpen,
  X,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function PackageMarketplace() {
  const [packages, setPackages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingBookmark, setSavingBookmark] = useState(null);

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadMarketplace();
  }, []);

  async function loadMarketplace() {
    try {
      setLoading(true);

      /*
       * ==========================================
       * LIVE / APPROVED PACKAGES ONLY
       * ==========================================
       *
       * We intentionally don't show:
       * - Pending packages
       * - Rejected packages
       * - Draft packages
       *
       * IMPORTANT:
       * If your package table uses different column
       * names, adjust them here.
       */

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("status", "approved")
        .eq("is_live", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setPackages(data || []);

      /*
       * ==========================================
       * CUSTOMER BOOKMARKS
       * ==========================================
       */

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        setBookmarks([]);
        return;
      }

      const { data: bookmarkData, error: bookmarkError } =
        await supabase
          .from("package_bookmarks")
          .select("package_id")
          .eq("customer_id", user.id);

      if (bookmarkError) {
        /*
         * Marketplace should still work if bookmark
         * table has not been created yet.
         */
        console.warn(
          "Bookmark table unavailable:",
          bookmarkError.message
        );

        setBookmarks([]);
        return;
      }

      setBookmarks(
        (bookmarkData || []).map(
          (item) => item.package_id
        )
      );
    } catch (error) {
      console.error(
        "Package Marketplace Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ==========================================
   * DESTINATIONS
   * ==========================================
   */

  const destinations = useMemo(() => {
    const values = packages
      .map(
        (item) =>
          item.destination ||
          item.location ||
          ""
      )
      .filter(Boolean);

    return [...new Set(values)].sort();
  }, [packages]);

  /*
   * ==========================================
   * FILTER
   * ==========================================
   */

  const filteredPackages = useMemo(() => {
    return packages.filter((item) => {
      const text = `
        ${item.title || ""}
        ${item.package_name || ""}
        ${item.destination || ""}
        ${item.location || ""}
        ${item.description || ""}
      `.toLowerCase();

      const searchMatch =
        !search ||
        text.includes(search.toLowerCase());

      const destinationMatch =
        !destination ||
        (
          item.destination ||
          item.location ||
          ""
        ).toLowerCase() ===
          destination.toLowerCase();

      const packagePrice = Number(
        item.price ||
          item.package_price ||
          item.amount ||
          0
      );

      const priceMatch =
        !maxPrice ||
        packagePrice <= Number(maxPrice);

      return (
        searchMatch &&
        destinationMatch &&
        priceMatch
      );
    });
  }, [
    packages,
    search,
    destination,
    maxPrice,
  ]);

  /*
   * ==========================================
   * BOOKMARK
   * ==========================================
   */

  async function toggleBookmark(packageId) {
    try {
      setSavingBookmark(packageId);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        alert("Please login to bookmark packages.");
        return;
      }

      const isBookmarked =
        bookmarks.includes(packageId);

      if (isBookmarked) {
        const { error } = await supabase
          .from("package_bookmarks")
          .delete()
          .eq("customer_id", user.id)
          .eq("package_id", packageId);

        if (error) throw error;

        setBookmarks((previous) =>
          previous.filter(
            (id) => id !== packageId
          )
        );
      } else {
        const { error } = await supabase
          .from("package_bookmarks")
          .insert({
            customer_id: user.id,
            package_id: packageId,
          });

        if (error) throw error;

        setBookmarks((previous) => [
          ...previous,
          packageId,
        ]);
      }
    } catch (error) {
      console.error(
        "Bookmark Error:",
        error
      );

      alert(
        "Unable to update bookmark. Please try again."
      );
    } finally {
      setSavingBookmark(null);
    }
  }

  /*
   * ==========================================
   * RESET FILTERS
   * ==========================================
   */

  function resetFilters() {
    setSearch("");
    setDestination("");
    setMaxPrice("");
  }

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading travel packages...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-5 sm:p-6 lg:p-8">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            WorldTrip Marketplace
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Find Your Perfect Travel Package
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Explore verified travel packages from
            approved travel agents and find the right
            trip for you.
          </p>
        </div>

        {/* ==========================================
            SEARCH BAR
        ========================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search destination, package or travel experience..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* DESTINATION */}

            <select
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                text-slate-700
                outline-none
                focus:border-blue-500
                focus:bg-white
              "
            >
              <option value="">
                All Destinations
              </option>

              {destinations.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* FILTER BUTTON */}

            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-5
                py-3
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

          </div>

          {/* ADVANCED FILTER */}

          {showFilters && (
            <div className="mt-4 border-t border-slate-100 pt-4">

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Maximum Price
                  </label>

                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(e.target.value)
                    }
                    placeholder="₹ Maximum"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3
                      text-sm
                      outline-none
                      focus:border-blue-500
                    "
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-slate-100
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-slate-600
                      hover:bg-slate-200
                    "
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            RESULT HEADER
        ========================================== */}

        <div className="mb-5 mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Travel Packages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredPackages.length} package
              {filteredPackages.length !== 1
                ? "s"
                : ""}{" "}
              available
            </p>
          </div>
        </div>

        {/* ==========================================
            EMPTY
        ========================================== */}

        {filteredPackages.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">

            <PackageOpen
              size={48}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-xl font-bold text-slate-700">
              No packages found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Try another destination or clear your
              filters to discover more travel packages.
            </p>

            <button
              onClick={resetFilters}
              className="
                mt-5
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-blue-700
              "
            >
              Clear Filters
            </button>

          </div>
        ) : (

          /* ========================================
             PACKAGE GRID
          ======================================== */

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredPackages.map((item) => (
              <PackageCard
                key={item.id}
                packageData={item}
                bookmarked={bookmarks.includes(
                  item.id
                )}
                savingBookmark={
                  savingBookmark === item.id
                }
                onBookmark={() =>
                  toggleBookmark(item.id)
                }
              />
            ))}

          </div>
        )}
      </div>
    </Layout>
  );
}


/* ==============================================
   PACKAGE CARD
============================================== */

function PackageCard({
  packageData,
  bookmarked,
  savingBookmark,
  onBookmark,
}) {
  const packageId = packageData.id;

  const title =
    packageData.title ||
    packageData.package_name ||
    "Travel Package";

  const destination =
    packageData.destination ||
    packageData.location ||
    "India";

  const price =
    packageData.price ||
    packageData.package_price ||
    packageData.amount ||
    0;

  const duration =
    packageData.duration ||
    packageData.duration_days ||
    "";

  const travelers =
    packageData.travelers ||
    packageData.max_travelers ||
    "";

  const image =
    packageData.image_url ||
    packageData.cover_image ||
    packageData.image ||
    "";

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* IMAGE */}

      <div className="relative h-52 overflow-hidden bg-slate-100">

        {image ? (
          <img
            src={image}
            alt={title}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100">
            <PackageOpen
              size={42}
              className="text-slate-300"
            />
          </div>
        )}

        {/* VERIFIED */}

        <div className="
          absolute
          left-4
          top-4
          rounded-full
          bg-emerald-500
          px-3
          py-1
          text-[11px]
          font-bold
          text-white
          shadow
        ">
          Verified Package
        </div>

        {/* BOOKMARK */}

        <button
          onClick={onBookmark}
          disabled={savingBookmark}
          aria-label="Bookmark package"
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-slate-500
            shadow
            transition
            hover:text-red-500
          "
        >
          <Heart
            size={19}
            fill={
              bookmarked
                ? "currentColor"
                : "none"
            }
            className={
              bookmarked
                ? "text-red-500"
                : ""
            }
          />
        </button>

      </div>


      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
              {title}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} />
              {destination}
            </div>
          </div>

        </div>


        {/* DETAILS */}

        <div className="mt-5 grid grid-cols-2 gap-2">

          {duration && (
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={15} />
                <span className="text-xs">
                  Duration
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {duration}
              </p>
            </div>
          )}

          {travelers && (
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={15} />
                <span className="text-xs">
                  Travelers
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {travelers}
              </p>
            </div>
          )}

        </div>


        {/* PRICE */}

        <div className="mt-5 flex items-end justify-between">

          <div>
            <p className="text-xs text-slate-400">
              Starting from
            </p>

            <p className="mt-1 text-xl font-extrabold text-slate-900">
              ₹{Number(price).toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href =
                `/customer/packages/${packageId}`)
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            View
            <ArrowRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
}