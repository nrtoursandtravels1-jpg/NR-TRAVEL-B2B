import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  Send,
  Building2,
  Clock3,
  RefreshCw,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import PageHeader from "../../components/ui/PageHeader";
import { supabase } from "../../services/supabase";

export default function PackageMarketplace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [packages, setPackages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingBookmark, setSavingBookmark] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadMarketplace();
  }, []);

  async function loadMarketplace(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      /*
       * ==========================================
       * LOAD APPROVED + LIVE PACKAGES
       * ==========================================
       */

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("status", "approved")
        .eq("is_live", true)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setPackages(data || []);

      /*
       * ==========================================
       * CURRENT CUSTOMER
       * ==========================================
       */

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        setBookmarks([]);
        return;
      }

      /*
       * ==========================================
       * LOAD BOOKMARKS
       * ==========================================
       */

      const {
        data: bookmarkData,
        error: bookmarkError,
      } = await supabase
        .from("package_bookmarks")
        .select("package_id")
        .eq("customer_id", user.id);

      /*
       * Bookmark table may not exist yet.
       * Marketplace should still remain usable.
       */

      if (bookmarkError) {
        console.warn(
          "Package bookmark table unavailable:",
          bookmarkError.message
        );

        setBookmarks([]);
      } else {
        setBookmarks(
          (bookmarkData || []).map(
            (item) => item.package_id
          )
        );
      }
    } catch (error) {
      console.error(
        "Package Marketplace Error:",
        error
      );

      setErrorMessage(
        "Unable to load travel packages right now. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
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
      .map((value) => String(value).trim())
      .filter(Boolean);

    return [...new Set(values)].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [packages]);

  /*
   * ==========================================
   * FILTER PACKAGES
   * ==========================================
   */

  const filteredPackages = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return packages.filter((item) => {
      const searchableText = `
        ${item.title || ""}
        ${item.package_name || ""}
        ${item.destination || ""}
        ${item.location || ""}
        ${item.description || ""}
        ${item.inclusions || ""}
        ${item.category || ""}
        ${item.package_type || ""}
      `.toLowerCase();

      const searchMatch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      const itemDestination = String(
        item.destination ||
          item.location ||
          ""
      ).toLowerCase();

      const destinationMatch =
        !destination ||
        itemDestination ===
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

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        alert(
          "Please login to bookmark packages."
        );
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

        if (error) {
          throw error;
        }

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

        if (error) {
          throw error;
        }

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
        "Unable to update wishlist. Please try again."
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
   * VIEW PACKAGE
   * ==========================================
   */

  function viewPackage(packageId) {
    navigate(`/customer/package/${packageId}`);
  }

  /*
   * ==========================================
   * CUSTOMER REQUIREMENT
   * ==========================================
   */

  function requestPackage(packageId) {
    navigate(
      `/customer/requirement?package_id=${packageId}`
    );
  }

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading) {
    return (
      <DashboardLayout>
        <Loader
          fullScreen={false}
          text="Loading travel packages..."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* ========================================
            PAGE HEADER
        ======================================== */}

        <PageHeader
          title="Travel Package Marketplace"
          description="Explore verified travel packages from approved travel agents and find your perfect trip."
          action={
            <button
              type="button"
              onClick={() => loadMarketplace(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>
          }
        />

        {/* ========================================
            MARKETPLACE INTRO
        ======================================== */}

        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-sm lg:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
              WorldTrip Marketplace
            </p>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Find Your Perfect Travel Package
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              Compare verified packages, explore
              destinations, check pricing and send
              a travel request directly to the
              travel team.
            </p>
          </div>
        </div>

        {/* ========================================
            ERROR
        ======================================== */}

        {errorMessage && (
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-red-800">
                Marketplace unavailable
              </p>

              <p className="mt-1 text-sm text-red-600">
                {errorMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadMarketplace(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* ========================================
            SEARCH + FILTERS
        ======================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search destination, package or experience..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* DESTINATION */}

            <select
              value={destination}
              onChange={(event) =>
                setDestination(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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

            {/* FILTER */}

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (previous) => !previous
                )
              }
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                showFilters
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

          </div>

          {/* ADVANCED FILTERS */}

          {showFilters && (
            <div className="mt-4 border-t border-slate-100 pt-4">

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* MAX PRICE */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                    Maximum Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(
                        event.target.value
                      )
                    }
                    placeholder="₹ Maximum"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* ACTIVE FILTER SUMMARY */}

                <div className="flex items-end">
                  <div className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-medium text-slate-400">
                      Results
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {filteredPackages.length}{" "}
                      package
                      {filteredPackages.length !==
                      1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                </div>

                {/* CLEAR */}

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ========================================
            RESULT HEADER
        ======================================== */}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available Travel Packages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredPackages.length}{" "}
              package
              {filteredPackages.length !== 1
                ? "s"
                : ""}{" "}
              available
            </p>
          </div>

          {(search ||
            destination ||
            maxPrice) && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-sm font-semibold text-blue-600 hover:text-blue-700 sm:self-auto"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {filteredPackages.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center shadow-sm">

            <PackageOpen
              size={52}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-xl font-bold text-slate-700">
              No packages found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              We couldn't find a package matching
              your search. Try another destination or
              clear your filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <X size={16} />
              Clear Filters
            </button>

          </div>
        ) : (

          /* ======================================
             PACKAGE GRID
          ====================================== */

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
                onView={() =>
                  viewPackage(item.id)
                }
                onRequest={() =>
                  requestPackage(item.id)
                }
              />
            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

/* =================================================
   PACKAGE CARD
================================================= */

function PackageCard({
  packageData,
  bookmarked,
  savingBookmark,
  onBookmark,
  onView,
  onRequest,
}) {
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

  const description =
    packageData.short_description ||
    packageData.description ||
    "";

  const category =
    packageData.category ||
    packageData.package_type ||
    "";

  const image =
    packageData.image_url ||
    packageData.cover_image ||
    packageData.image ||
    "";

  /*
   * Agent/company fields are intentionally flexible
   * because package schemas can differ.
   */

  const companyName =
    packageData.company_name ||
    packageData.agency_name ||
    packageData.agent_name ||
    packageData.company ||
    "";

  const inclusions =
    packageData.inclusions ||
    packageData.package_inclusions ||
    "";

  const inclusionList = Array.isArray(
    inclusions
  )
    ? inclusions.slice(0, 3)
    : String(inclusions)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 3);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* ======================================
          IMAGE
      ====================================== */}

      <div className="relative h-52 overflow-hidden bg-slate-100">

        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <PackageOpen
              size={44}
              className="text-slate-300"
            />
          </div>
        )}

        {/* VERIFIED */}

        <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow">
          Verified Package
        </div>

        {/* CATEGORY */}

        {category && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {category}
          </div>
        )}

        {/* BOOKMARK */}

        <button
          type="button"
          onClick={onBookmark}
          disabled={savingBookmark}
          aria-label={
            bookmarked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
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

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="flex flex-1 flex-col p-5">

        {/* TITLE */}

        <div>
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
            {title}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={15} className="shrink-0" />
            <span>{destination}</span>
          </div>
        </div>

        {/* DESCRIPTION */}

        {description && (
          <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
            {description}
          </p>
        )}

        {/* ==================================
            PACKAGE DETAILS
        ================================== */}

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

        {/* ==================================
            INCLUSIONS
        ================================== */}

        {inclusionList.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              Includes
            </p>

            <div className="flex flex-wrap gap-2">
              {inclusionList.map(
                (item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* ==================================
            AGENT / COMPANY
        ================================== */}

        {companyName && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <Building2 size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] text-slate-400">
                Offered by
              </p>

              <p className="truncate text-sm font-semibold text-slate-700">
                {companyName}
              </p>
            </div>
          </div>
        )}

        {/* ==================================
            PRICE
        ================================== */}

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-400">
            Starting from
          </p>

          <p className="mt-1 text-2xl font-extrabold text-slate-900">
            ₹
            {Number(price).toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        {/* ==================================
            ACTIONS
        ================================== */}

        <div className="mt-5 grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Details
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={onRequest}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Send size={15} />
            Enquire
          </button>

        </div>

      </div>
    </div>
  );
}
