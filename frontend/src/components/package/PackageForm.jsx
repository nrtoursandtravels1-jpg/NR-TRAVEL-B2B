import { useState } from "react";
import { supabase } from "../../services/supabase";

function PackageForm({ onSuccess }) {
  const initialForm = {
    package_code: `PKG-${Date.now()}`,

    package_name: "",
    package_category: "",
    package_type: "Domestic",

    destination: "",
    duration: "",

    start_date: "",
    end_date: "",
    booking_last_date: "",

    min_pax: "",
    max_pax: "",
    available_seats: "",

    hotel_category: "3 Star",
    transport: "",
    meal_plan: "",

    original_price: "",
    offer_price: "",
    discount_percent: "",

    gst_percent: "5",
    tds_percent: "0",

    markup: "",
    profit: "",

    currency: "INR",
    price: "",

    description: "",
    cover_image: "",

    featured: false,
    status: "Active",

    highlights: "",
    itinerary: "",
    terms_conditions: "",
  };

  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [inclusion, setInclusion] = useState("");
  const [inclusions, setInclusions] = useState([]);

  const [exclusion, setExclusion] = useState("");
  const [exclusions, setExclusions] = useState([]);

  const [galleryImages, setGalleryImages] = useState([]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function addInclusion() {
    if (!inclusion.trim()) return;

    setInclusions((prev) => [...prev, inclusion.trim()]);
    setInclusion("");
  }

  function removeInclusion(index) {
    setInclusions((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function addExclusion() {
    if (!exclusion.trim()) return;

    setExclusions((prev) => [...prev, exclusion.trim()]);
    setExclusion("");
  }

  function removeExclusion(index) {
    setExclusions((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      // ==========================================
      // STEP 1 - UPLOAD COVER IMAGE
      // ==========================================

      let imageUrl = form.cover_image;

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("tour.image")
          .upload(fileName, image);

        if (uploadError) {
          throw new Error(
            "Cover image upload failed: " +
              uploadError.message
          );
        }

        const { data: publicData } = supabase.storage
          .from("tour.image")
          .getPublicUrl(fileName);

        imageUrl = publicData.publicUrl;
      }

      // ==========================================
      // STEP 2 - CREATE TOUR PACKAGE
      // ==========================================

      const packageData = {
        package_code: form.package_code,
        package_name: form.package_name,
        package_category: form.package_category,
        package_type: form.package_type,

        destination: form.destination,
        duration: form.duration,

        start_date: form.start_date || null,
        end_date: form.end_date || null,
        booking_last_date:
          form.booking_last_date || null,

        min_pax:
          form.min_pax === ""
            ? null
            : Number(form.min_pax),

        max_pax:
          form.max_pax === ""
            ? null
            : Number(form.max_pax),

        available_seats:
          form.available_seats === ""
            ? null
            : Number(form.available_seats),

        hotel_category: form.hotel_category,
        transport: form.transport,
        meal_plan: form.meal_plan,

        // =========================
        // PRICING
        // =========================

        original_price:
          form.original_price === ""
            ? null
            : Number(form.original_price),

        offer_price:
          form.offer_price === ""
            ? null
            : Number(form.offer_price),

        discount_percent:
          form.discount_percent === ""
            ? null
            : Number(form.discount_percent),

        gst_percent:
          form.gst_percent === ""
            ? null
            : Number(form.gst_percent),

        tds_percent:
          form.tds_percent === ""
            ? null
            : Number(form.tds_percent),

        markup:
          form.markup === ""
            ? null
            : Number(form.markup),

        profit:
          form.profit === ""
            ? null
            : Number(form.profit),

        currency: form.currency,

        price:
          form.price === ""
            ? null
            : Number(form.price),

        // =========================

        cover_image: imageUrl,

        description: form.description,

        highlights: form.highlights,

        itinerary: form.itinerary,

        terms_conditions:
          form.terms_conditions,

        featured: form.featured,

        status: form.status,

        updated_at:
          new Date().toISOString(),
      };

      console.log(
        "Creating package:",
        packageData
      );

      // IMPORTANT:
      // THIS WAS MISSING IN YOUR PREVIOUS CODE

      const {
        data: packageInsert,
        error: packageError,
      } = await supabase
        .from("tour_packages")
        .insert([packageData])
        .select()
        .single();

      if (packageError) {
        console.error(
          "PACKAGE INSERT ERROR:",
          packageError
        );

        throw new Error(
          "Package save failed: " +
            packageError.message
        );
      }

      console.log(
        "Package created:",
        packageInsert
      );

      // ==========================================
      // STEP 3 - SAVE INCLUSIONS
      // ==========================================

      if (inclusions.length > 0) {
        const inclusionData =
          inclusions.map((item) => ({
            package_id: packageInsert.id,
            title: item,
          }));

        const {
          error: inclusionError,
        } = await supabase
          .from("tour_package_inclusions")
          .insert(inclusionData);

        if (inclusionError) {
          console.error(
            "INCLUSION ERROR:",
            inclusionError
          );
        }
      }

      // ==========================================
      // STEP 4 - SAVE EXCLUSIONS
      // ==========================================

      if (exclusions.length > 0) {
        const exclusionData =
          exclusions.map((item) => ({
            package_id: packageInsert.id,
            title: item,
          }));

        const {
          error: exclusionError,
        } = await supabase
          .from("tour_package_exclusions")
          .insert(exclusionData);

        if (exclusionError) {
          console.error(
            "EXCLUSION ERROR:",
            exclusionError
          );
        }
      }

      // ==========================================
      // STEP 5 - UPLOAD GALLERY
      // ==========================================

      for (const file of galleryImages) {
        const galleryFileName =
          `${Date.now()}-${file.name}`;

        const {
          error: galleryUploadError,
        } = await supabase.storage
          .from("tour.image")
          .upload(
            galleryFileName,
            file
          );

        if (galleryUploadError) {
          console.error(
            "GALLERY UPLOAD ERROR:",
            galleryUploadError
          );

          continue;
        }

        const {
          data: galleryPublicData,
        } = supabase.storage
          .from("tour.image")
          .getPublicUrl(
            galleryFileName
          );

        const {
          error: galleryInsertError,
        } = await supabase
          .from("tour_package_gallery")
          .insert([
            {
              package_id:
                packageInsert.id,

              image_url:
                galleryPublicData.publicUrl,

              sort_order: 0,
            },
          ]);

        if (galleryInsertError) {
          console.error(
            "GALLERY DATABASE ERROR:",
            galleryInsertError
          );
        }
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        "Package Added Successfully!"
      );

      // Reset

      setForm({
        ...initialForm,
        package_code:
          `PKG-${Date.now()}`,
      });

      setImage(null);
      setGalleryImages([]);

      setInclusions([]);
      setExclusions([]);

      setInclusion("");
      setExclusion("");

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error(
        "PACKAGE SAVE ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to save package."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
      }}
    >
      <h2>Add Tour Package</h2>

      <form onSubmit={handleSubmit}>

        {/* =========================
            BASIC INFORMATION
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",
            gap: "15px",
          }}
        >

          <input
            name="package_code"
            value={form.package_code}
            readOnly
            placeholder="Package Code"
          />

          <input
            name="package_name"
            placeholder="Package Name"
            value={form.package_name}
            onChange={handleChange}
            required
          />

          <select
            name="package_category"
            value={form.package_category}
            onChange={handleChange}
          >
            <option value="">
              Select Category
            </option>

            <option>Family Tour</option>
            <option>Honeymoon</option>
            <option>Group Tour</option>
            <option>Adventure</option>
            <option>Pilgrimage</option>
            <option>Weekend Getaway</option>
            <option>Luxury</option>
            <option>Corporate</option>
            <option>Student</option>
            <option>Wildlife</option>
            <option>Beach Holiday</option>
            <option>Hill Station</option>
            <option>Cruise</option>
            <option>Festival Tour</option>
            <option>Custom Package</option>
          </select>

          <select
            name="package_type"
            value={form.package_type}
            onChange={handleChange}
          >
            <option>Domestic</option>
            <option>International</option>
          </select>

          <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
          />

          <input
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
          />

        </div>

        {/* =========================
            TOUR SCHEDULE
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Tour Schedule
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "15px",
          }}
        >

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
          />

          <input
            type="date"
            name="booking_last_date"
            value={
              form.booking_last_date
            }
            onChange={handleChange}
          />

        </div>

        {/* =========================
            CAPACITY
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Capacity
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "15px",
          }}
        >

          <input
            type="number"
            name="min_pax"
            placeholder="Minimum Pax"
            value={form.min_pax}
            onChange={handleChange}
          />

          <input
            type="number"
            name="max_pax"
            placeholder="Maximum Pax"
            value={form.max_pax}
            onChange={handleChange}
          />

          <input
            type="number"
            name="available_seats"
            placeholder="Available Seats"
            value={
              form.available_seats
            }
            onChange={handleChange}
          />

        </div>

        {/* =========================
            PRICING
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Pricing
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "15px",
          }}
        >

          <input
            type="number"
            name="original_price"
            placeholder="Original Price"
            value={
              form.original_price
            }
            onChange={handleChange}
          />

          <input
            type="number"
            name="offer_price"
            placeholder="Offer Price"
            value={
              form.offer_price
            }
            onChange={handleChange}
          />

          <input
            type="number"
            name="discount_percent"
            placeholder="Discount %"
            value={
              form.discount_percent
            }
            onChange={handleChange}
          />

          <input
            type="number"
            name="gst_percent"
            placeholder="GST %"
            value={
              form.gst_percent
            }
            onChange={handleChange}
          />

          <input
            type="number"
            name="tds_percent"
            placeholder="TDS %"
            value={
              form.tds_percent
            }
            onChange={handleChange}
          />

          <input
            type="number"
            name="markup"
            placeholder="Markup"
            value={form.markup}
            onChange={handleChange}
          />

          <input
            type="number"
            name="profit"
            placeholder="Profit"
            value={form.profit}
            onChange={handleChange}
          />

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
          >
            <option value="INR">
              INR
            </option>

            <option value="USD">
              USD
            </option>

            <option value="EUR">
              EUR
            </option>

            <option value="GBP">
              GBP
            </option>

            <option value="AED">
              AED
            </option>
          </select>

        </div>

        <br />

        <input
          type="number"
          name="price"
          placeholder="Starting Price"
          value={form.price}
          onChange={handleChange}
        />

        {/* =========================
            HOTEL & TRANSPORT
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Hotel & Transport
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "15px",
          }}
        >

          <select
            name="hotel_category"
            value={
              form.hotel_category
            }
            onChange={handleChange}
          >
            <option>3 Star</option>
            <option>4 Star</option>
            <option>5 Star</option>
          </select>

          <select
            name="meal_plan"
            value={form.meal_plan}
            onChange={handleChange}
          >
            <option value="">
              Meal Plan
            </option>

            <option>EP</option>
            <option>CP</option>
            <option>MAP</option>
            <option>AP</option>
          </select>

          <input
            name="transport"
            placeholder="Transport"
            value={form.transport}
            onChange={handleChange}
          />

        </div>

        {/* =========================
            COVER IMAGE
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Cover Image
        </h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] || null
            )
          }
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{
              width: 220,
              marginTop: 15,
              borderRadius: 10,
            }}
          />
        )}

        {/* =========================
            GALLERY
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Package Gallery
        </h3>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setGalleryImages([
              ...e.target.files,
            ])
          }
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: 15,
          }}
        >
          {galleryImages.map(
            (img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt=""
                style={{
                  width: 120,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 8,
                  border:
                    "1px solid #ddd",
                }}
              />
            )
          )}
        </div>

        {/* =========================
            INCLUSIONS
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Package Inclusions
        </h3>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 15,
          }}
        >

          <input
            type="text"
            placeholder="Example: Hotel Stay"
            value={inclusion}
            onChange={(e) =>
              setInclusion(e.target.value)
            }
            style={{
              flex: 1,
              padding: 10,
            }}
          />

          <button
            type="button"
            onClick={addInclusion}
          >
            Add
          </button>

        </div>

        {inclusions.map(
          (item, index) => (
            <div
              key={index}
              style={{
                background: "#f1f5f9",
                padding: "8px 12px",
                borderRadius: 8,
                marginBottom: 8,
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <span>
                ✅ {item}
              </span>

              <button
                type="button"
                onClick={() =>
                  removeInclusion(index)
                }
              >
                Remove
              </button>
            </div>
          )
        )}

        {/* =========================
            EXCLUSIONS
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Package Exclusions
        </h3>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 15,
          }}
        >

          <input
            type="text"
            placeholder="Example: Airfare"
            value={exclusion}
            onChange={(e) =>
              setExclusion(e.target.value)
            }
            style={{
              flex: 1,
              padding: 10,
            }}
          />

          <button
            type="button"
            onClick={addExclusion}
          >
            Add
          </button>

        </div>

        {exclusions.map(
          (item, index) => (
            <div
              key={index}
              style={{
                background: "#fef2f2",
                padding: "8px 12px",
                borderRadius: 8,
                marginBottom: 8,
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <span>
                ❌ {item}
              </span>

              <button
                type="button"
                onClick={() =>
                  removeExclusion(index)
                }
              >
                Remove
              </button>
            </div>
          )
        )}

        {/* =========================
            DESCRIPTION
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Package Description
        </h3>

        <textarea
          name="description"
          rows="5"
          placeholder="Package Description"
          value={form.description}
          onChange={handleChange}
          style={{
            width: "100%",
          }}
        />

        {/* =========================
            HIGHLIGHTS
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Package Highlights
        </h3>

        <textarea
          name="highlights"
          placeholder={`Example:
• Luxury Hotel Stay
• Daily Breakfast
• Private Transfers`}
          rows="4"
          value={form.highlights}
          onChange={handleChange}
          style={{
            width: "100%",
          }}
        />

        {/* =========================
            ITINERARY
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Day Wise Itinerary
        </h3>

        <textarea
          name="itinerary"
          placeholder={`Day 1...
Day 2...
Day 3...`}
          rows="8"
          value={form.itinerary}
          onChange={handleChange}
          style={{
            width: "100%",
          }}
        />

        {/* =========================
            TERMS
        ========================= */}

        <h3 style={{ marginTop: 30 }}>
          Terms & Conditions
        </h3>

        <textarea
          name="terms_conditions"
          placeholder="Terms & Conditions"
          rows="5"
          value={
            form.terms_conditions
          }
          onChange={handleChange}
          style={{
            width: "100%",
          }}
        />

        <br />
        <br />

        {/* =========================
            SETTINGS
        ========================= */}

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          {" "}Featured Package
        </label>

        <br />
        <br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <br />
        <br />

        {/* =========================
            BUTTONS
        ========================= */}

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >

          <button
            type="button"
            onClick={() => {
              setForm({
                ...initialForm,
                package_code:
                  `PKG-${Date.now()}`,
              });

              setImage(null);
              setGalleryImages([]);

              setInclusions([]);
              setExclusions([]);

              setInclusion("");
              setExclusion("");
            }}
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Package"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default PackageForm;