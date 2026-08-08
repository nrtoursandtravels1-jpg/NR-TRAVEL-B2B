import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function ViewPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackage();
  }, [id]);

  async function loadPackage() {
    setLoading(true);

    try {
      // ==========================================
      // LOAD PACKAGE
      // ==========================================

      const { data: packageData, error: packageError } =
        await supabase
          .from("tour_packages")
          .select("*")
          .eq("id", id)
          .single();

      if (packageError) {
        console.error("PACKAGE ERROR:", packageError);
        alert("Package not found.");
        navigate("/packages");
        return;
      }

      setPkg(packageData);

      // ==========================================
      // LOAD GALLERY
      // ==========================================

      const { data: galleryData, error: galleryError } =
        await supabase
          .from("tour_package_gallery")
          .select("*")
          .eq("package_id", id)
          .order("sort_order", {
            ascending: true,
          });

      if (galleryError) {
        console.error("GALLERY ERROR:", galleryError);
        setGallery([]);
      } else {
        setGallery(galleryData || []);
      }
    } catch (error) {
      console.error("VIEW PACKAGE ERROR:", error);

      alert(
        error.message ||
          "Unable to load package."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // FORMAT DATE
  // ==========================================

  function formatDate(date) {
    if (!date) return "-";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ==========================================
  // MONEY FORMAT
  // ==========================================

  function money(value, currency = "INR") {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    const symbols = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      AED: "AED ",
    };

    const symbol =
      symbols[currency] ||
      `${currency} `;

    return `${symbol}${Number(value).toLocaleString(
      "en-IN"
    )}`;
  }

  // ==========================================
  // TEXT LIST
  // ==========================================

  function renderList(text, type) {
    if (!text) {
      return (
        <p style={{ color: "#64748b" }}>
          No {type} added.
        </p>
      );
    }

    const items = String(text)
      .split(/\r?\n/)
      .map((item) =>
        item
          .replace(/^[-•*]\s*/, "")
          .trim()
      )
      .filter(Boolean);

    if (items.length === 0) {
      return (
        <p style={{ color: "#64748b" }}>
          No {type} added.
        </p>
      );
    }

    return (
      <ul
        style={{
          margin: 0,
          paddingLeft: "22px",
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              lineHeight: "1.6",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px 40px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Loading Package...
          </h2>
        </div>
      </div>
    );
  }

  // ==========================================
  // PACKAGE NOT FOUND
  // ==========================================

  if (!pkg) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Package Not Found</h2>

        <button
          onClick={() =>
            navigate("/packages")
          }
          style={{
            marginTop: "20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Packages
        </button>
      </div>
    );
  }

  const currency = pkg.currency || "INR";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "32px",
              }}
            >
              {pkg.package_name}
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
                marginBottom: 0,
              }}
            >
              Package Code:{" "}
              {pkg.package_code || "-"}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={() =>
                navigate(
                  `/packages/edit/${pkg.id}`
                )
              }
              style={{
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Edit Package
            </button>

            <button
              onClick={() =>
                navigate("/packages")
              }
              style={{
                background: "#475569",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* ==========================================
            COVER IMAGE
        ========================================== */}

        <Section title="Cover Image">
          {pkg.cover_image ? (
            <img
              src={pkg.cover_image}
              alt={pkg.package_name}
              style={{
                width: "100%",
                maxHeight: "450px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <div
              style={{
                height: "250px",
                background: "#e2e8f0",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
              }}
            >
              No Cover Image
            </div>
          )}
        </Section>

        {/* ==========================================
            GALLERY
        ========================================== */}

        <Section title="Package Gallery">
          {gallery.length === 0 ? (
            <p
              style={{
                color: "#64748b",
              }}
            >
              No gallery images available.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(180px,1fr))",
                gap: "15px",
              }}
            >
              {gallery.map(
                (image, index) => (
                  <img
                    key={
                      image.id || index
                    }
                    src={image.image_url}
                    alt={
                      pkg.package_name
                    }
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border:
                        "1px solid #e2e8f0",
                    }}
                  />
                )
              )}
            </div>
          )}
        </Section>

        {/* ==========================================
            BASIC INFORMATION
        ========================================== */}

        <Section title="Package Information">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
            }}
          >
            <Info
              label="Package Code"
              value={
                pkg.package_code
              }
            />

            <Info
              label="Package Name"
              value={
                pkg.package_name
              }
            />

            <Info
              label="Category"
              value={
                pkg.package_category
              }
            />

            <Info
              label="Package Type"
              value={
                pkg.package_type
              }
            />

            <Info
              label="Destination"
              value={
                pkg.destination
              }
            />

            <Info
              label="Duration"
              value={
                pkg.duration
              }
            />
          </div>
        </Section>

        {/* ==========================================
            TOUR SCHEDULE
        ========================================== */}

        <Section title="Tour Schedule">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
            }}
          >
            <Info
              label="Start Date"
              value={formatDate(
                pkg.start_date
              )}
            />

            <Info
              label="End Date"
              value={formatDate(
                pkg.end_date
              )}
            />

            <Info
              label="Booking Last Date"
              value={formatDate(
                pkg.booking_last_date
              )}
            />
          </div>
        </Section>

        {/* ==========================================
            CAPACITY
        ========================================== */}

        <Section title="Capacity">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
            }}
          >
            <Info
              label="Minimum Pax"
              value={pkg.min_pax}
            />

            <Info
              label="Maximum Pax"
              value={pkg.max_pax}
            />

            <Info
              label="Available Seats"
              value={
                pkg.available_seats
              }
            />
          </div>
        </Section>

        {/* ==========================================
            HOTEL & TRANSPORT
        ========================================== */}

        <Section title="Hotel & Transport">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
            }}
          >
            <Info
              label="Hotel Category"
              value={
                pkg.hotel_category
              }
            />

            <Info
              label="Transport"
              value={
                pkg.transport
              }
            />

            <Info
              label="Meal Plan"
              value={
                pkg.meal_plan
              }
            />
          </div>
        </Section>

        {/* ==========================================
            PRICING
        ========================================== */}

        <Section title="Pricing">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
            }}
          >
            <Info
              label="Original Price"
              value={money(
                pkg.original_price,
                currency
              )}
            />

            <Info
              label="Offer Price"
              value={money(
                pkg.offer_price,
                currency
              )}
            />

            <Info
              label="Starting Price"
              value={money(
                pkg.price,
                currency
              )}
            />

            <Info
              label="Discount"
              value={
                pkg.discount_percent !==
                  null &&
                pkg.discount_percent !==
                  undefined
                  ? `${pkg.discount_percent}%`
                  : "-"
              }
            />

            <Info
              label="GST"
              value={
                pkg.gst_percent !==
                  null &&
                pkg.gst_percent !==
                  undefined
                  ? `${pkg.gst_percent}%`
                  : "-"
              }
            />

            <Info
              label="TDS"
              value={
                pkg.tds_percent !==
                  null &&
                pkg.tds_percent !==
                  undefined
                  ? `${pkg.tds_percent}%`
                  : "-"
              }
            />

            <Info
              label="Markup"
              value={money(
                pkg.markup,
                currency
              )}
            />

            <Info
              label="Expected Profit"
              value={money(
                pkg.profit,
                currency
              )}
            />

            <Info
              label="Currency"
              value={currency}
            />
          </div>
        </Section>

        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <Section title="Package Description">
          {pkg.description ? (
            <p
              style={{
                whiteSpace:
                  "pre-wrap",
                lineHeight: "1.8",
                color: "#475569",
                margin: 0,
              }}
            >
              {pkg.description}
            </p>
          ) : (
            <p
              style={{
                color: "#64748b",
              }}
            >
              No description available.
            </p>
          )}
        </Section>

        {/* ==========================================
            HIGHLIGHTS
        ========================================== */}

        <Section title="Package Highlights">
          {renderList(
            pkg.highlights,
            "highlights"
          )}
        </Section>

        {/* ==========================================
            INCLUSIONS
        ========================================== */}

        <Section title="Package Inclusions">
          {renderList(
            pkg.inclusions,
            "inclusions"
          )}
        </Section>

        {/* ==========================================
            EXCLUSIONS
        ========================================== */}

        <Section title="Package Exclusions">
          {renderList(
            pkg.exclusions,
            "exclusions"
          )}
        </Section>

        {/* ==========================================
            ITINERARY
        ========================================== */}

        <Section title="Day-wise Itinerary">
          {pkg.itinerary ? (
            <div
              style={{
                whiteSpace:
                  "pre-wrap",
                lineHeight: "1.8",
                color: "#475569",
              }}
            >
              {String(
                pkg.itinerary
              )}
            </div>
          ) : (
            <p
              style={{
                color: "#64748b",
              }}
            >
              No itinerary available.
            </p>
          )}
        </Section>

        {/* ==========================================
            TERMS & CONDITIONS
        ========================================== */}

        <Section title="Terms & Conditions">
          {pkg.terms_conditions ? (
            <div
              style={{
                whiteSpace:
                  "pre-wrap",
                lineHeight: "1.8",
                color: "#475569",
              }}
            >
              {
                pkg.terms_conditions
              }
            </div>
          ) : (
            <p
              style={{
                color: "#64748b",
              }}
            >
              No terms and conditions
              added.
            </p>
          )}
        </Section>

        {/* ==========================================
            STATUS
        ========================================== */}

        <Section title="Package Status">
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                background:
                  pkg.status ===
                  "Active"
                    ? "#16a34a"
                    : "#dc2626",
                color: "#fff",
                padding:
                  "8px 16px",
                borderRadius:
                  "20px",
                fontWeight:
                  "600",
              }}
            >
              {pkg.status ||
                "Unknown"}
            </span>

            {pkg.featured && (
              <span
                style={{
                  background:
                    "#f59e0b",
                  color: "#fff",
                  padding:
                    "8px 16px",
                  borderRadius:
                    "20px",
                  fontWeight:
                    "600",
                }}
              >
                ⭐ Featured Package
              </span>
            )}
          </div>
        </Section>

        {/* ==========================================
            BOTTOM BUTTONS
        ========================================== */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: "12px",
            marginTop: "25px",
            paddingBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              navigate(
                `/packages/edit/${pkg.id}`
              )
            }
            style={{
              background:
                "#f59e0b",
              color: "#fff",
              border: "none",
              padding:
                "12px 24px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            Edit Package
          </button>

          <button
            onClick={() =>
              navigate("/packages")
            }
            style={{
              background:
                "#475569",
              color: "#fff",
              border: "none",
              padding:
                "12px 24px",
              borderRadius:
                "8px",
              cursor:
                "pointer",
                fontWeight:
                "600",
            }}
          >
            Back to Packages
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   SECTION COMPONENT
===================================================== */

function Section({
  title,
  children,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "25px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          color: "#0f172a",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

/* =====================================================
   INFO COMPONENT
===================================================== */

function Info({
  label,
  value,
}) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "15px",
        borderRadius: "8px",
        border:
          "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#64748b",
          marginBottom: "6px",
          textTransform:
            "capitalize",
        }}
      >
        {label}
      </div>

      <strong
        style={{
          color: "#0f172a",
          wordBreak:
            "break-word",
        }}
      >
        {value === null ||
        value === undefined ||
        value === ""
          ? "-"
          : value}
      </strong>
    </div>
  );
}