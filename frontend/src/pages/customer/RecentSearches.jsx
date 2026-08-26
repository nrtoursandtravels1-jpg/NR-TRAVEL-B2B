import { useEffect, useState } from "react";
import {
  Clock3,
  Search,
  Trash2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function RecentSearches() {
  const navigate = useNavigate();

  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadSearches();
  }, []);

  async function loadSearches() {
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
        .from("recent_searches")
        .select("*")
        .eq("customer_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setSearches(data || []);
    } catch (error) {
      console.error("Recent Searches Error:", error);
      setSearches([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSearch(id) {
    try {
      const { error } = await supabase
        .from("recent_searches")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSearches((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete Search Error:", error);
      alert(error.message);
    }
  }

  async function clearAllSearches() {
    if (searches.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear all recent searches?"
    );

    if (!confirmed) return;

    try {
      setClearing(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("recent_searches")
        .delete()
        .eq("customer_id", user.id);

      if (error) throw error;

      setSearches([]);
    } catch (error) {
      console.error("Clear Searches Error:", error);
      alert(error.message);
    } finally {
      setClearing(false);
    }
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getSearchText(search) {
    return (
      search.search_term ||
      search.query ||
      search.destination ||
      search.keyword ||
      "Travel search"
    );
  }

  function getDestination(search) {
    return search.destination || search.location || "";
  }

  function repeatSearch(search) {
    const searchText = getSearchText(search);

    navigate(
      `/customer/packages?search=${encodeURIComponent(searchText)}`
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading recent searches...
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Customer Workspace
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Recent Searches
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Quickly return to destinations and packages you searched
              recently.
            </p>
          </div>

          {searches.length > 0 && (
            <button
              type="button"
              onClick={clearAllSearches}
              disabled={clearing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 size={16} />

              {clearing
                ? "Clearing..."
                : "Clear All"}
            </button>
          )}

        </div>

        {/* SEARCHES */}

        <div className="mt-8">

          {searches.length === 0 ? (

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Search size={30} />
              </div>

              <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                No recent searches
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your recent package and destination searches will
                appear here.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/customer/packages")
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Search Packages
                <ArrowRight size={16} />
              </button>

            </div>

          ) : (

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Search History
                    </h2>

                    <p className="text-sm text-slate-500">
                      {searches.length} recent search
                      {searches.length !== 1 ? "es" : ""}
                    </p>
                  </div>

                </div>

              </div>

              <div className="divide-y divide-slate-100">

                {searches.map((search) => {

                  const searchText = getSearchText(search);
                  const destination = getDestination(search);

                  return (
                    <div
                      key={search.id}
                      className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div className="flex min-w-0 items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <Search size={19} />
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-slate-800">
                            {searchText}
                          </p>

                          {destination && (
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin size={13} />
                              {destination}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(search.created_at)}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            repeatSearch(search)
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          Search Again
                          <ArrowRight size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteSearch(search.id)
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-red-500 transition hover:bg-red-50"
                          title="Delete search"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          )}

        </div>

      </div>
    </Layout>
  );
}