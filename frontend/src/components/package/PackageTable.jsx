import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function PackageTable({
  search = "",
  filter = "All",
  viewMode = "table",
}) {
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
      .order("created_at", { ascending: false });

    if (error) {
      console.error("PACKAGE LOAD ERROR:", error);
      alert("Unable to load packages.");
    } else {
      setPackages(data || []);
    }

    setLoading(false);
  }

  // ==========================================
  // DELETE PACKAGE
  // ==========================================

  async function deletePackage(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tour_packages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ERROR:", error);
      alert("Delete failed: " + error.message);
      return;
    }

    alert("Package deleted successfully.");

    await fetchPackages();
  }

  // ==========================================
  // CURRENCY
  // ==========================================

  function currencySymbol(currency) {
    const symbols = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      AED: "AED ",
    };

    return symbols[currency] || `${currency || "₹"} `;
  }

  function money(value, currency = "INR") {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    return `${currencySymbol(currency)}${Number(
      value
    ).toLocaleString("en-IN")}`;
  }

  // ==========================================
  // FILTER
  // ==========================================

  const filteredPackages = packages.filter((pkg) => {
    const searchText = `
      ${pkg.package_name || ""}
      ${pkg.destination || ""}
      ${pkg.package_code || ""}
    `.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    let matchesFilter = true;

    switch (filter) {
      case "Domestic":
        matchesFilter =
          pkg.package_type === "Domestic";
        break;

      case "International":
        matchesFilter =
          pkg.package_type === "International";
        break;

      case "Featured":
        matchesFilter =
          pkg.featured === true;
        break;

      case "Active":
        matchesFilter =
          pkg.status === "Active";
        break;

      case "Inactive":
        matchesFilter =
          pkg.status === "Inactive";
        break;

      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">
          Loading Packages...
        </h2>
      </div>
    );
  }

  // ==========================================
  // CARD VIEW
  // ==========================================

  if (viewMode === "card") {
    return (
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">
            Tour Packages
          </h2>

          <span className="bg-blue-600 text-white px-3 py-1 rounded">
            Total: {filteredPackages.length}
          </span>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded">
            No Packages Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border"
              >
                {/* IMAGE */}

                {pkg.cover_image ? (
                  <img
                    src={pkg.cover_image}
                    alt={pkg.package_name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  {/* PACKAGE NAME */}

                  <h2 className="text-xl font-bold">
                    {pkg.package_name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Code: {pkg.package_code || "-"}
                  </p>

                  <p className="mt-3">
                    📍 {pkg.destination || "-"}
                  </p>

                  <p>
                    🧳 {pkg.package_type || "-"}
                  </p>

                  <p>
                    ⏳ {pkg.duration || "-"}
                  </p>

                  {/* PRICING */}

                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      Original Price
                    </p>

                    <p className="font-semibold">
                      {money(
                        pkg.original_price,
                        pkg.currency
                      )}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Offer Price
                    </p>

                    <p className="text-xl font-bold text-green-600">
                      {money(
                        pkg.offer_price ||
                          pkg.price,
                        pkg.currency
                      )}
                    </p>

                    {pkg.discount_percent !==
                      null &&
                      pkg.discount_percent !==
                        undefined && (
                        <p className="text-sm text-orange-600 mt-1">
                          Discount:{" "}
                          {
                            pkg.discount_percent
                          }
                          %
                        </p>
                      )}

                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div>
                        GST:{" "}
                        {pkg.gst_percent ?? 0}%
                      </div>

                      <div>
                        TDS:{" "}
                        {pkg.tds_percent ?? 0}%
                      </div>

                      <div>
                        Markup:{" "}
                        {money(
                          pkg.markup,
                          pkg.currency
                        )}
                      </div>

                      <div>
                        Profit:{" "}
                        {money(
                          pkg.profit,
                          pkg.currency
                        )}
                      </div>
                    </div>
                  </div>

                  {/* FEATURED */}

                  <div className="mt-3">
                    {pkg.featured ? (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded">
                        ⭐ Featured
                      </span>
                    ) : (
                      <span className="bg-gray-300 px-2 py-1 rounded">
                        Normal
                      </span>
                    )}
                  </div>

                  {/* STATUS */}

                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        pkg.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {pkg.status || "Unknown"}
                    </span>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex flex-wrap gap-2 mt-5">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/packages/view/${pkg.id}`
                        )
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/packages/edit/${pkg.id}`
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deletePackage(pkg.id)
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // TABLE VIEW
  // ==========================================

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Tour Packages
        </h2>

        <span className="bg-blue-600 text-white px-3 py-1 rounded">
          Total: {filteredPackages.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">
                Package
              </th>

              <th className="border p-3">
                Image
              </th>

              <th className="border p-3">
                Type
              </th>

              <th className="border p-3">
                Destination
              </th>

              <th className="border p-3">
                Duration
              </th>

              <th className="border p-3">
                Pricing
              </th>

              <th className="border p-3">
                GST/TDS
              </th>

              <th className="border p-3">
                Featured
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPackages.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center p-8"
                >
                  No Packages Found
                </td>
              </tr>
            ) : (
              filteredPackages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="hover:bg-gray-50"
                >
                  {/* PACKAGE */}

                  <td className="border p-3">
                    <strong>
                      {pkg.package_name}
                    </strong>

                    <br />

                    <small>
                      {pkg.package_code}
                    </small>
                  </td>

                  {/* IMAGE */}

                  <td className="border p-3">
                    {pkg.cover_image ? (
                      <img
                        src={pkg.cover_image}
                        alt={pkg.package_name}
                        className="w-20 h-14 object-cover rounded"
                      />
                    ) : (
                      <span>
                        No Image
                      </span>
                    )}
                  </td>

                  {/* TYPE */}

                  <td className="border p-3">
                    {pkg.package_type}
                  </td>

                  {/* DESTINATION */}

                  <td className="border p-3">
                    {pkg.destination}
                  </td>

                  {/* DURATION */}

                  <td className="border p-3">
                    {pkg.duration}
                  </td>

                  {/* PRICING */}

                  <td className="border p-3">
                    <div className="text-sm">
                      <div>
                        Original:{" "}
                        <strong>
                          {money(
                            pkg.original_price,
                            pkg.currency
                          )}
                        </strong>
                      </div>

                      <div className="text-green-600 font-bold">
                        Offer:{" "}
                        {money(
                          pkg.offer_price ||
                            pkg.price,
                          pkg.currency
                        )}
                      </div>

                      <div className="text-orange-600">
                        Discount:{" "}
                        {pkg.discount_percent ??
                          0}
                        %
                      </div>

                      <div>
                        Markup:{" "}
                        {money(
                          pkg.markup,
                          pkg.currency
                        )}
                      </div>

                      <div>
                        Profit:{" "}
                        {money(
                          pkg.profit,
                          pkg.currency
                        )}
                      </div>
                    </div>
                  </td>

                  {/* GST / TDS */}

                  <td className="border p-3">
                    <div>
                      GST:{" "}
                      {pkg.gst_percent ?? 0}%
                    </div>

                    <div>
                      TDS:{" "}
                      {pkg.tds_percent ?? 0}%
                    </div>
                  </td>

                  {/* FEATURED */}

                  <td className="border p-3">
                    {pkg.featured ? (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded">
                        ⭐ Featured
                      </span>
                    ) : (
                      <span className="bg-gray-300 px-2 py-1 rounded">
                        Normal
                      </span>
                    )}
                  </td>

                  {/* STATUS */}

                  <td className="border p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        pkg.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {pkg.status ||
                        "Unknown"}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="border p-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/packages/view/${pkg.id}`
                        )
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/packages/edit/${pkg.id}`
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deletePackage(pkg.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}