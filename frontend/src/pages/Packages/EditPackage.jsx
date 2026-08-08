import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
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

    cover_image: "",

    description: "",
    highlights: "",
    itinerary: "",
    terms_conditions: "",

    featured: false,
    status: "Active",
  });

  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");

  const [newCoverImage, setNewCoverImage] = useState(null);
  const [newGalleryImages, setNewGalleryImages] = useState([]);

  useEffect(() => {
    fetchPackage();
  }, [id]);

  async function fetchPackage() {
    setLoading(true);

    try {
      // ==========================================
      // 1. GET PACKAGE
      // ==========================================

      const {
        data: packageData,
        error: packageError,
      } = await supabase
        .from("tour_packages")
        .select("*")
        .eq("id", id)
        .single();

      if (packageError) {
        throw packageError;
      }

      // ==========================================
      // 2. SET PACKAGE FORM
      // ==========================================

      setForm({
        package_name: packageData.package_name || "",
        package_category:
          packageData.package_category || "",
        package_type:
          packageData.package_type || "Domestic",

        destination: packageData.destination || "",
        duration: packageData.duration || "",

        start_date: packageData.start_date || "",
        end_date: packageData.end_date || "",
        booking_last_date:
          packageData.booking_last_date || "",

        min_pax: packageData.min_pax ?? "",
        max_pax: packageData.max_pax ?? "",
        available_seats:
          packageData.available_seats ?? "",

        hotel_category:
          packageData.hotel_category || "3 Star",

        transport: packageData.transport || "",
        meal_plan: packageData.meal_plan || "",

        original_price:
          packageData.original_price ?? "",

        offer_price:
          packageData.offer_price ?? "",

        discount_percent:
          packageData.discount_percent ?? "",

        gst_percent:
          packageData.gst_percent ?? "5",

        tds_percent:
          packageData.tds_percent ?? "0",

        markup: packageData.markup ?? "",
        profit: packageData.profit ?? "",

        currency:
          packageData.currency || "INR",

        price: packageData.price ?? "",

        cover_image:
          packageData.cover_image || "",

        description:
          packageData.description || "",

        highlights:
          packageData.highlights || "",

        itinerary:
          packageData.itinerary || "",

        terms_conditions:
          packageData.terms_conditions || "",

        featured:
          packageData.featured || false,

        status:
          packageData.status || "Active",
      });

      // ==========================================
      // 3. GET INCLUSIONS
      // ==========================================

      const {
        data: inclusionData,
        error: inclusionError,
      } = await supabase
        .from("tour_package_inclusions")
        .select("*")
        .eq("package_id", id)
        .order("created_at", {
          ascending: true,
        });

      if (inclusionError) {
        console.error(
          "Inclusion fetch error:",
          inclusionError
        );
      }

      setInclusions(inclusionData || []);

      // ==========================================
      // 4. GET EXCLUSIONS
      // ==========================================

      const {
        data: exclusionData,
        error: exclusionError,
      } = await supabase
        .from("tour_package_exclusions")
        .select("*")
        .eq("package_id", id)
        .order("created_at", {
          ascending: true,
        });

      if (exclusionError) {
        console.error(
          "Exclusion fetch error:",
          exclusionError
        );
      }

      setExclusions(exclusionData || []);

      // ==========================================
      // 5. GET GALLERY
      // ==========================================

      const {
        data: galleryData,
        error: galleryError,
      } = await supabase
        .from("tour_package_gallery")
        .select("*")
        .eq("package_id", id)
        .order("created_at", {
          ascending: true,
        });

      if (galleryError) {
        console.error(
          "Gallery fetch error:",
          galleryError
        );
      }

      setGalleryImages(galleryData || []);
    } catch (error) {
      console.error(
        "FETCH PACKAGE ERROR:",
        error
      );

      alert(
        "Unable to load package: " +
          error.message
      );

      navigate("/packages");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // HANDLE FORM CHANGE
  // ==========================================

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  // ==========================================
  // ADD INCLUSION
  // ==========================================

  async function addInclusion() {
    if (!newInclusion.trim()) return;

    const {
      data,
      error,
    } = await supabase
      .from("tour_package_inclusions")
      .insert([
        {
          package_id: id,
          title: newInclusion.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      alert(
        "Unable to add inclusion: " +
          error.message
      );
      return;
    }

    setInclusions((prev) => [
      ...prev,
      data,
    ]);

    setNewInclusion("");
  }

  // ==========================================
  // DELETE INCLUSION
  // ==========================================

  async function deleteInclusion(inclusionId) {
    const confirmDelete = window.confirm(
      "Delete this inclusion?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tour_package_inclusions")
      .delete()
      .eq("id", inclusionId);

    if (error) {
      alert(
        "Unable to delete inclusion: " +
          error.message
      );
      return;
    }

    setInclusions((prev) =>
      prev.filter(
        (item) =>
          item.id !== inclusionId
      )
    );
  }

  // ==========================================
  // ADD EXCLUSION
  // ==========================================

  async function addExclusion() {
    if (!newExclusion.trim()) return;

    const {
      data,
      error,
    } = await supabase
      .from("tour_package_exclusions")
      .insert([
        {
          package_id: id,
          title: newExclusion.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      alert(
        "Unable to add exclusion: " +
          error.message
      );
      return;
    }

    setExclusions((prev) => [
      ...prev,
      data,
    ]);

    setNewExclusion("");
  }

  // ==========================================
  // DELETE EXCLUSION
  // ==========================================

  async function deleteExclusion(exclusionId) {
    const confirmDelete = window.confirm(
      "Delete this exclusion?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tour_package_exclusions")
      .delete()
      .eq("id", exclusionId);

    if (error) {
      alert(
        "Unable to delete exclusion: " +
          error.message
      );
      return;
    }

    setExclusions((prev) =>
      prev.filter(
        (item) =>
          item.id !== exclusionId
      )
    );
  }

  // ==========================================
  // UPLOAD COVER IMAGE
  // ==========================================

  async function uploadCoverImage() {
    if (!newCoverImage) {
      return form.cover_image;
    }

    const fileName =
      `${Date.now()}-${newCoverImage.name}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("tour.image")
      .upload(
        fileName,
        newCoverImage,
        {
          upsert: false,
        }
      );

    if (uploadError) {
      throw new Error(
        "Cover image upload failed: " +
          uploadError.message
      );
    }

    const {
      data: publicData,
    } = supabase.storage
      .from("tour.image")
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  }

  // ==========================================
  // UPLOAD GALLERY
  // ==========================================

  async function uploadGallery() {
    for (const file of newGalleryImages) {
      const fileName =
        `${Date.now()}-${file.name}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("tour.image")
        .upload(
          fileName,
          file,
          {
            upsert: false,
          }
        );

      if (uploadError) {
        console.error(
          "Gallery upload failed:",
          uploadError
        );
        continue;
      }

      const {
        data: publicData,
      } = supabase.storage
        .from("tour.image")
        .getPublicUrl(fileName);

      const {
        data: galleryData,
        error: galleryError,
      } = await supabase
        .from("tour_package_gallery")
        .insert([
          {
            package_id: id,
            image_url:
              publicData.publicUrl,
          },
        ])
        .select()
        .single();

      if (galleryError) {
        console.error(
          "Gallery database error:",
          galleryError
        );
        continue;
      }

      setGalleryImages((prev) => [
        ...prev,
        galleryData,
      ]);
    }

    setNewGalleryImages([]);
  }

  // ==========================================
  // DELETE GALLERY IMAGE
  // ==========================================

  async function deleteGalleryImage(
    galleryId
  ) {
    const confirmDelete = window.confirm(
      "Delete this gallery image?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tour_package_gallery")
      .delete()
      .eq("id", galleryId);

    if (error) {
      alert(
        "Unable to delete gallery image: " +
          error.message
      );
      return;
    }

    setGalleryImages((prev) =>
      prev.filter(
        (image) =>
          image.id !== galleryId
      )
    );
  }

  // ==========================================
  // SAVE PACKAGE
  // ==========================================

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      // ----------------------------------------
      // COVER IMAGE
      // ----------------------------------------

      const coverImageUrl =
        await uploadCoverImage();

      // ----------------------------------------
      // PACKAGE DATA
      // ----------------------------------------

      const updateData = {
        package_name:
          form.package_name,

        package_category:
          form.package_category,

        package_type:
          form.package_type,

        destination:
          form.destination,

        duration:
          form.duration,

        start_date:
          form.start_date || null,

        end_date:
          form.end_date || null,

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
            : Number(
                form.available_seats
              ),

        hotel_category:
          form.hotel_category,

        transport:
          form.transport,

        meal_plan:
          form.meal_plan,

        // --------------------------------------
        // PRICING
        // --------------------------------------

        original_price:
          form.original_price === ""
            ? null
            : Number(
                form.original_price
              ),

        offer_price:
          form.offer_price === ""
            ? null
            : Number(
                form.offer_price
              ),

        discount_percent:
          form.discount_percent === ""
            ? null
            : Number(
                form.discount_percent
              ),

        gst_percent:
          form.gst_percent === ""
            ? null
            : Number(
                form.gst_percent
              ),

        tds_percent:
          form.tds_percent === ""
            ? null
            : Number(
                form.tds_percent
              ),

        markup:
          form.markup === ""
            ? null
            : Number(form.markup),

        profit:
          form.profit === ""
            ? null
            : Number(form.profit),

        currency:
          form.currency,

        price:
          form.price === ""
            ? null
            : Number(form.price),

        // --------------------------------------
        // CONTENT
        // --------------------------------------

        cover_image:
          coverImageUrl,

        description:
          form.description,

        highlights:
          form.highlights,

        itinerary:
          form.itinerary,

        terms_conditions:
          form.terms_conditions,

        featured:
          form.featured,

        status:
          form.status,

        updated_at:
          new Date().toISOString(),
      };

      console.log(
        "Updating package:",
        updateData
      );

      // ----------------------------------------
      // UPDATE PACKAGE
      // ----------------------------------------

      const {
        error: packageError,
      } = await supabase
        .from("tour_packages")
        .update(updateData)
        .eq("id", id);

      if (packageError) {
        throw new Error(
          packageError.message
        );
      }

      // ----------------------------------------
      // GALLERY
      // ----------------------------------------

      if (
        newGalleryImages.length > 0
      ) {
        await uploadGallery();
      }

      alert(
        "Package updated successfully!"
      );

      navigate("/packages");
    } catch (error) {
      console.error(
        "UPDATE PACKAGE ERROR:",
        error
      );

      alert(
        "Save failed: " +
          error.message
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">
          Loading Package...
        </h2>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Edit Tour Package
        </h1>

        <p className="text-gray-500 mb-8">
          Update complete package information.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 md:p-8 space-y-8"
        >

          {/* ================================= */}
          {/* BASIC INFORMATION */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="w-full border rounded-lg p-3"
                name="package_name"
                value={form.package_name}
                onChange={handleChange}
                placeholder="Package Name"
                required
              />

              <input
                className="w-full border rounded-lg p-3"
                name="package_category"
                value={form.package_category}
                onChange={handleChange}
                placeholder="Package Category"
              />

              <select
                className="w-full border rounded-lg p-3"
                name="package_type"
                value={form.package_type}
                onChange={handleChange}
              >
                <option value="Domestic">
                  Domestic
                </option>

                <option value="International">
                  International
                </option>
              </select>

              <input
                className="w-full border rounded-lg p-3"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Destination"
                required
              />

              <input
                className="w-full border rounded-lg p-3"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="5 Days / 4 Nights"
              />

            </div>
          </section>

          {/* ================================= */}
          {/* TOUR SCHEDULE */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Tour Schedule
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <label className="block mb-2 font-medium">
                  Tour Start Date
                </label>

                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Tour End Date
                </label>

                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Booking Last Date
                </label>

                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  name="booking_last_date"
                  value={
                    form.booking_last_date
                  }
                  onChange={handleChange}
                />
              </div>

            </div>
          </section>

          {/* ================================= */}
          {/* CAPACITY */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Capacity
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="min_pax"
                value={form.min_pax}
                onChange={handleChange}
                placeholder="Minimum Pax"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="max_pax"
                value={form.max_pax}
                onChange={handleChange}
                placeholder="Maximum Pax"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="available_seats"
                value={
                  form.available_seats
                }
                onChange={handleChange}
                placeholder="Available Seats"
              />

            </div>
          </section>

          {/* ================================= */}
          {/* HOTEL & TRANSPORT */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Hotel & Transport
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <select
                className="w-full border rounded-lg p-3"
                name="hotel_category"
                value={
                  form.hotel_category
                }
                onChange={handleChange}
              >
                <option value="3 Star">
                  3 Star
                </option>

                <option value="4 Star">
                  4 Star
                </option>

                <option value="5 Star">
                  5 Star
                </option>
              </select>

              <select
                className="w-full border rounded-lg p-3"
                name="meal_plan"
                value={form.meal_plan}
                onChange={handleChange}
              >
                <option value="">
                  Meal Plan
                </option>

                <option value="EP">
                  EP
                </option>

                <option value="CP">
                  CP
                </option>

                <option value="MAP">
                  MAP
                </option>

                <option value="AP">
                  AP
                </option>
              </select>

              <input
                className="w-full border rounded-lg p-3"
                name="transport"
                value={form.transport}
                onChange={handleChange}
                placeholder="Transport"
              />

            </div>
          </section>

          {/* ================================= */}
          {/* PRICING */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Pricing
            </h2>

            <div className="grid md:grid-cols-4 gap-4">

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="original_price"
                value={
                  form.original_price
                }
                onChange={handleChange}
                placeholder="Original Price"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="offer_price"
                value={form.offer_price}
                onChange={handleChange}
                placeholder="Offer Price"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="discount_percent"
                value={
                  form.discount_percent
                }
                onChange={handleChange}
                placeholder="Discount %"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="gst_percent"
                value={form.gst_percent}
                onChange={handleChange}
                placeholder="GST %"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="tds_percent"
                value={form.tds_percent}
                onChange={handleChange}
                placeholder="TDS %"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="markup"
                value={form.markup}
                onChange={handleChange}
                placeholder="Markup"
              />

              <input
                type="number"
                className="w-full border rounded-lg p-3"
                name="profit"
                value={form.profit}
                onChange={handleChange}
                placeholder="Profit"
              />

              <select
                className="w-full border rounded-lg p-3"
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

            <input
              type="number"
              className="w-full border rounded-lg p-3 mt-4"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Starting Price"
            />
          </section>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Package Description
            </h2>

            <textarea
              rows="5"
              className="w-full border rounded-lg p-3"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Package Description"
            />
          </section>

          {/* ================================= */}
          {/* HIGHLIGHTS */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Package Highlights
            </h2>

            <textarea
              rows="5"
              className="w-full border rounded-lg p-3"
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              placeholder={`Example:
• Luxury Hotel Stay
• Daily Breakfast
• Private Transfers`}
            />
          </section>

          {/* ================================= */}
          {/* ITINERARY */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Day Wise Itinerary
            </h2>

            <textarea
              rows="10"
              className="w-full border rounded-lg p-3"
              name="itinerary"
              value={form.itinerary}
              onChange={handleChange}
              placeholder={`Day 1...
Day 2...
Day 3...`}
            />
          </section>

          {/* ================================= */}
          {/* INCLUSIONS */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Package Inclusions
            </h2>

            <div className="flex gap-3">

              <input
                className="flex-1 border rounded-lg p-3"
                value={newInclusion}
                onChange={(e) =>
                  setNewInclusion(
                    e.target.value
                  )
                }
                placeholder="Example: Hotel Stay"
              />

              <button
                type="button"
                onClick={addInclusion}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Add
              </button>

            </div>

            <div className="mt-4 space-y-2">

              {inclusions.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <span>
                    ✅ {item.title}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      deleteInclusion(
                        item.id
                      )
                    }
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}

            </div>
          </section>

          {/* ================================= */}
          {/* EXCLUSIONS */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Package Exclusions
            </h2>

            <div className="flex gap-3">

              <input
                className="flex-1 border rounded-lg p-3"
                value={newExclusion}
                onChange={(e) =>
                  setNewExclusion(
                    e.target.value
                  )
                }
                placeholder="Example: Airfare"
              />

              <button
                type="button"
                onClick={addExclusion}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Add
              </button>

            </div>

            <div className="mt-4 space-y-2">

              {exclusions.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <span>
                    ❌ {item.title}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      deleteExclusion(
                        item.id
                      )
                    }
                    className="text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}

            </div>
          </section>

          {/* ================================= */}
          {/* TERMS */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Terms & Conditions
            </h2>

            <textarea
              rows="6"
              className="w-full border rounded-lg p-3"
              name="terms_conditions"
              value={
                form.terms_conditions
              }
              onChange={handleChange}
              placeholder="Terms & Conditions"
            />
          </section>

          {/* ================================= */}
          {/* COVER IMAGE */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Cover Image
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewCoverImage(
                  e.target.files?.[0] ||
                    null
                )
              }
              className="w-full border rounded-lg p-3"
            />

            {form.cover_image && (
              <img
                src={form.cover_image}
                alt={form.package_name}
                className="w-56 h-36 object-cover rounded-lg border mt-4"
              />
            )}

            {newCoverImage && (
              <img
                src={URL.createObjectURL(
                  newCoverImage
                )}
                alt="New Cover Preview"
                className="w-56 h-36 object-cover rounded-lg border mt-4"
              />
            )}
          </section>

          {/* ================================= */}
          {/* GALLERY */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Package Gallery
            </h2>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setNewGalleryImages([
                  ...e.target.files,
                ])
              }
              className="w-full border rounded-lg p-3"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

              {galleryImages.map(
                (image) => (
                  <div
                    key={image.id}
                    className="relative"
                  >
                    <img
                      src={image.image_url}
                      alt=""
                      className="w-full h-32 object-cover rounded-lg border"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        deleteGalleryImage(
                          image.id
                        )
                      }
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
                    >
                      ×
                    </button>
                  </div>
                )
              )}

            </div>
          </section>

          {/* ================================= */}
          {/* SETTINGS */}
          {/* ================================= */}

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Package Settings
            </h2>

            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              Featured Package
            </label>

            <select
              className="w-full border rounded-lg p-3"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </section>

          {/* ================================= */}
          {/* BUTTONS */}
          {/* ================================= */}

          <div className="flex justify-end gap-3 pt-6 border-t">

            <button
              type="button"
              onClick={() =>
                navigate("/packages")
              }
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditPackage;