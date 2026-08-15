import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";
import {
  Building2,
  CheckCircle,
  Clock3,
  IndianRupee,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

const initialForm = {
  vendor_name: "",
  vendor_type: "Hotel",
  contact_person: "",
  mobile: "",
  email: "",
  city: "",
  status: "Active",
  payment_amount: "",
};

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    setLoading(true);

    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Vendor fetch error:", error);
    } else {
      setVendors(data || []);
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.vendor_name) {
      alert("Vendor name is required.");
      return;
    }

    setSaving(true);

    const payload = {
      vendor_name: form.vendor_name,
      vendor_type: form.vendor_type,
      contact_person: form.contact_person,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      status: form.status,
      payment_amount: form.payment_amount
        ? Number(form.payment_amount)
        : 0,
    };

    const { error } = await supabase
      .from("vendors")
      .insert([payload]);

    setSaving(false);

    if (error) {
      console.error("Vendor save error:", error);
      alert(error.message);
      return;
    }

    alert("Vendor added successfully.");

    setForm(initialForm);
    fetchVendors();
  }

  async function deleteVendor(id) {
    if (!window.confirm("Delete this vendor?")) {
      return;
    }

    const { error } = await supabase
      .from("vendors")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchVendors();
  }

  const filtered = vendors.filter((vendor) =>
    (
      (vendor.vendor_name || "") +
      " " +
      (vendor.vendor_type || "") +
      " " +
      (vendor.contact_person || "") +
      " " +
      (vendor.mobile || "") +
      " " +
      (vendor.city || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalVendors = vendors.length;

  const activeVendors = vendors.filter(
    (vendor) => vendor.status === "Active"
  ).length;

  const pendingApproval = vendors.filter(
    (vendor) => vendor.status === "Pending"
  ).length;

  const vendorPayments = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.payment_amount || 0),
    0
  );

  const cards = [
    {
      title: "Total Vendors",
      value: totalVendors,
      icon: <Building2 size={26} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Active Vendors",
      value: activeVendors,
      icon: <CheckCircle size={26} />,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Pending Approval",
      value: pendingApproval,
      icon: <Clock3 size={26} />,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "Vendor Payments",
      value: `₹ ${vendorPayments.toLocaleString("en-IN")}`,
      icon: <IndianRupee size={26} />,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-100 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Vendor Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage hotels, transport providers, guides, and suppliers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {loading ? "..." : card.value}
                  </h2>
                </div>

                <div
                  className={`rounded-xl p-3 ${card.bg} ${card.text}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Vendor */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Plus size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Add New Vendor
              </h2>

              <p className="text-sm text-slate-500">
                Add hotels, transport companies, guides, or suppliers.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input
              name="vendor_name"
              value={form.vendor_name}
              onChange={handleChange}
              placeholder="Vendor Name"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <select
              name="vendor_type"
              value={form.vendor_type}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            >
              <option>Hotel</option>
              <option>Transport</option>
              <option>Cab Operator</option>
              <option>Bus Operator</option>
              <option>Flight Supplier</option>
              <option>Guide</option>
              <option>Tour Supplier</option>
              <option>Other</option>
            </select>

            <input
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
              placeholder="Contact Person"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>

            <input
              type="number"
              name="payment_amount"
              value={form.payment_amount}
              onChange={handleChange}
              placeholder="Payment Amount"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60 md:col-span-2"
            >
              {saving ? "Saving..." : "Add Vendor"}
            </button>
          </form>
        </div>

        {/* Vendor Directory */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Vendor Directory
              </h2>

              <p className="text-sm text-slate-500">
                Search and manage your travel suppliers.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendors..."
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-slate-50 text-left">
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-3 font-medium">
                        {vendor.vendor_name}
                      </td>

                      <td className="p-3">
                        {vendor.vendor_type}
                      </td>

                      <td className="p-3">
                        {vendor.contact_person || "-"}
                      </td>

                      <td className="p-3">
                        {vendor.mobile || "-"}
                      </td>

                      <td className="p-3">
                        {vendor.city || "-"}
                      </td>

                      <td className="p-3">
                        ₹{" "}
                        {Number(
                          vendor.payment_amount || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                          {vendor.status || "Active"}
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            deleteVendor(vendor.id)
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          title="Delete vendor"
                        >
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="p-10 text-center text-slate-500"
                    >
                      No vendors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}