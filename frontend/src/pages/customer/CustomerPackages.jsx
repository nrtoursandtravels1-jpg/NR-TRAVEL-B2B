import { useEffect, useState } from "react";
import {
  Search,
  Heart,
  MapPin,
  Users,
  ArrowRight,
  Bus,
  Car,
  Train,
  SlidersHorizontal,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function CustomerPackages() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Group Tour",
    "Family Tour",
    "Girls Only",
    "Custom Tour",
    "Bus",
    "Cab",
    "Train",
  ];

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [searchTerm, category, packages]);

  async function loadPackages() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("status", "approved")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Package Error:", error);
        return;
      }

      setPackages(data || []);
    } catch (error) {
      console.error("Package Marketplace Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterPackages() {
    let result = [...packages];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((pkg) =>
        [
          pkg.package_name,
          pkg.destination,
          pkg.description,
          pkg.category,
        ]
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(search)
          )
      );
    }

    if (category !== "All") {
      result = result.filter(
        (pkg) =>
          String(pkg.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    setFilteredPackages(result);
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* HEADER */}

        <div className="mb-8">

          <p className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            text-blue-600
          ">
            Customer Marketplace
          </p>

          <div className="
            mt-2
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          ">

            <div>

              <h1 className="
                text-3xl
                font-extrabold
                tracking-tight
                text-slate-900
              ">
                Explore Travel Packages
              </h1>

              <p className="
                mt-2
                max-w-2xl
                text-sm
                text-slate-500
              ">
                Discover verified travel packages from
                approved WorldTrip Connect agents.
              </p>

            </div>

            <div className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
            ">
              <SlidersHorizontal size={17} />
              {filteredPackages.length} packages
            </div>

          </div>

        </div>


        {/* SEARCH */}

        <div className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
        ">

          <div className="
            relative
            w-full
          ">

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
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search Goa, Kashmir, Manali, group tour..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                focus:border-blue-400
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>


          {/* CATEGORIES */}

          <div className="
            mt-4
            flex
            gap-2
            overflow-x-auto
            pb-1
          ">

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`
                  whitespace-nowrap
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition
                  ${
                    category === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        {/* PACKAGES */}

        {loading ? (

          <div className="
            flex
            min-h-[400px]
            items-center
            justify-center
          ">

            <div className="text-center">

              <div className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-blue-600
              " />

              <p className="
                mt-4
                text-sm
                text-slate-500
              ">
                Loading travel packages...
              </p>

            </div>

          </div>

        ) : filteredPackages.length === 0 ? (

          <div className="
            mt-8
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-16
            text-center
          ">

            <MapPin
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="
              mt-4
              text-lg
              font-bold
              text-slate-800
            ">
              No packages found
            </h2>

            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              Try another destination or category.
            </p>

          </div>

        ) : (

          <div className="
            mt-8
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          ">

            {filteredPackages.map((pkg) => (

              <PackageCard
                key={pkg.id}
                packageData={pkg}
              />

            ))}

          </div>

        )}

      </div>
    </Layout>
  );
}


/* ==========================================
   PACKAGE CARD
========================================== */

function PackageCard({ packageData }) {

  const transport = String(
    packageData.transport || ""
  ).toLowerCase();

  const TransportIcon =
    transport.includes("bus")
      ? Bus
      : transport.includes("cab") ||
        transport.includes("car")
      ? Car
      : Train;


  return (
    <div className="
      group
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
      transition
      duration-200
      hover:-translate-y-1
      hover:border-blue-200
      hover:shadow-md
    ">

      {/* IMAGE */}

      <div className="
        relative
        flex
        h-48
        items-center
        justify-center
        bg-slate-100
      ">

        {packageData.image_url ? (

          <img
            src={packageData.image_url}
            alt={packageData.package_name}
            className="
              h-full
              w-full
              object-cover
            "
          />

        ) : (

          <MapPin
            size={48}
            className="text-slate-300"
          />

        )}


        {/* WISHLIST */}

        <button
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
            bg-white
            text-slate-500
            shadow-sm
            transition
            hover:text-red-500
          "
          title="Add to Wishlist"
        >
          <Heart size={18} />
        </button>


        {/* CATEGORY */}

        {packageData.category && (

          <span className="
            absolute
            bottom-4
            left-4
            rounded-full
            bg-white
            px-3
            py-1.5
            text-xs
            font-bold
            text-slate-700
            shadow-sm
          ">
            {packageData.category}
          </span>

        )}

      </div>


      {/* CONTENT */}

      <div className="p-5">

        <h2 className="
          line-clamp-1
          text-lg
          font-extrabold
          text-slate-900
        ">
          {packageData.package_name ||
            "Travel Package"}
        </h2>


        <div className="
          mt-3
          flex
          items-center
          gap-1.5
          text-sm
          text-slate-500
        ">

          <MapPin size={15} />

          <span>
            {packageData.destination ||
              "Destination"}
          </span>

        </div>


        <div className="
          mt-3
          flex
          flex-wrap
          gap-3
          text-xs
          text-slate-500
        ">

          {packageData.duration && (

            <span className="
              rounded-lg
              bg-slate-50
              px-2.5
              py-1.5
            ">
              {packageData.duration}
            </span>

          )}

          {packageData.travelers && (

            <span className="
              inline-flex
              items-center
              gap-1
              rounded-lg
              bg-slate-50
              px-2.5
              py-1.5
            ">
              <Users size={13} />
              {packageData.travelers}
            </span>

          )}

          {packageData.transport && (

            <span className="
              inline-flex
              items-center
              gap-1
              rounded-lg
              bg-slate-50
              px-2.5
              py-1.5
            ">
              <TransportIcon size={13} />
              {packageData.transport}
            </span>

          )}

        </div>


        {/* PRICE */}

        <div className="
          mt-5
          flex
          items-end
          justify-between
          gap-3
        ">

          <div>

            <p className="
              text-xs
              text-slate-400
            ">
              Starting from
            </p>

            <p className="
              mt-1
              text-xl
              font-extrabold
              text-slate-900
            ">
              ₹
              {Number(
                packageData.price || 0
              ).toLocaleString("en-IN")}
            </p>

          </div>


          <button
            onClick={() => {
              window.location.href =
                `/customer/packages/${packageData.id}`;
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-bold
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