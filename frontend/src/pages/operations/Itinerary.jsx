import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";
import {
  Map,
  FileEdit,
  CheckCircle,
  CircleCheck,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

const initialForm = {
  customer_name: "",
  destination: "",
  start_date: "",
  end_date: "",
  status: "Draft",
  notes: "",
};

export default function Itinerary() {
  const [itineraries, setItineraries] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItineraries();
  }, []);

  async function fetchItineraries() {
    setLoading(true);

    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Itinerary fetch error:", error);
    } else {
      setItineraries(data || []);
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

    if (!form.customer_name || !form.destination) {
      alert("Customer and destination are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("itineraries")
      .insert([form]);

    setSaving(false);

    if (error) {
      console.error("Itinerary save error:", error);
      alert(error.message);
      return;
    }

    alert("Itinerary created successfully.");

    setForm(initialForm);
    fetchItineraries();
  }

  async function deleteItinerary(id) {
    if (!window.confirm("Delete this itinerary?")) {
      return;
    }

    const { error } = await supabase
      .from("itineraries")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchItineraries();
  }

  const filtered = itineraries.filter((item) =>
    (
      (item.customer_name || "") +
      " " +
      (item.destination || "") +
      " " +
      (item.status || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const total = itineraries.length;

  const drafts = itineraries.filter(
    (item) => item.status === "Draft"
  ).length;

  const approved = itineraries.filter(
    (item) =>
      item.status === "Approved" ||
      item.status === "Confirmed"
  ).length;

  const completed = itineraries.filter(
    (item) => item.status === "Completed"
  ).length;

  const cards = [
    {
      title: "Total Itineraries",
      value: total,
      icon: <Map size={26} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Draft Itineraries",
      value: drafts,
      icon: <FileEdit size={26} />,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "Approved Trips",
      value: approved,
      icon: <CheckCircle size={26} />,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Completed Trips",
      value: completed,
      icon: <CircleCheck size={26} />,
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
            Itinerary Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create and manage customer travel plans.
          </p>
        </div>

        {/* Dashboard Cards */}
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

        {/* Create Itinerary */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Plus size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Create New Itinerary
              </h2>

              <p className="text-sm text-slate-500">
                Add a customer travel plan.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Customer Name"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            >
              <option>Draft</option>
              <option>Approved</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <input
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 md:col-span-2"
            >
              {saving ? "Saving..." : "Create Itinerary"}
            </button>
          </form>
        </div>

        {/* Itinerary Directory */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Itinerary Directory
              </h2>

              <p className="text-sm text-slate-500">
                Search and manage customer itineraries.
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
                placeholder="Search customer or destination..."
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-slate-50 text-left">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">End</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-3 font-medium">
                        {item.customer_name}
                      </td>

                      <td className="p-3">
                        {item.destination}
                      </td>

                      <td className="p-3">
                        {item.start_date || "-"}
                      </td>

                      <td className="p-3">
                        {item.end_date || "-"}
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                          {item.status || "Draft"}
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            deleteItinerary(item.id)
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          title="Delete itinerary"
                        >
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-10 text-center text-slate-500"
                    >
                      No itineraries found.
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
