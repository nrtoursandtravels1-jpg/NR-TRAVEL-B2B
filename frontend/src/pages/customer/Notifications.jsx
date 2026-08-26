import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  CalendarDays,
  CreditCard,
  MessageSquare,
  AlertCircle,
  Check,
  Trash2,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  // ==========================================
  // LOAD NOTIFICATIONS
  // ==========================================

  async function loadNotifications() {
    try {
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setNotifications(data || []);
    } catch (error) {
      console.error("Notifications Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // MARK AS READ
  // ==========================================

  async function markAsRead(id) {
    try {
      setMarkingId(id);

      const { error } = await supabase
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("id", id);

      if (error) throw error;

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error("Mark Read Error:", error);
    } finally {
      setMarkingId(null);
    }
  }

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  async function markAllAsRead() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) throw error;

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (error) {
      console.error("Mark All Read Error:", error);
    }
  }

  // ==========================================
  // DELETE
  // ==========================================

  async function deleteNotification(id) {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNotifications((current) =>
        current.filter(
          (notification) => notification.id !== id
        )
      );
    } catch (error) {
      console.error("Delete Notification Error:", error);
    }
  }

  // ==========================================
  // ICON
  // ==========================================

  function getIcon(type) {
    switch (type) {
      case "booking":
        return (
          <CalendarDays
            size={20}
            className="text-blue-600"
          />
        );

      case "payment":
        return (
          <CreditCard
            size={20}
            className="text-green-600"
          />
        );

      case "message":
        return (
          <MessageSquare
            size={20}
            className="text-purple-600"
          />
        );

      case "success":
        return (
          <CheckCircle2
            size={20}
            className="text-emerald-600"
          />
        );

      case "warning":
        return (
          <AlertCircle
            size={20}
            className="text-orange-600"
          />
        );

      default:
        return (
          <Bell
            size={20}
            className="text-blue-600"
          />
        );
    }
  }

  // ==========================================
  // ICON BACKGROUND
  // ==========================================

  function getIconBackground(type) {
    switch (type) {
      case "booking":
        return "bg-blue-50";

      case "payment":
        return "bg-green-50";

      case "message":
        return "bg-purple-50";

      case "success":
        return "bg-emerald-50";

      case "warning":
        return "bg-orange-50";

      default:
        return "bg-blue-50";
    }
  }

  // ==========================================
  // DATE
  // ==========================================

  function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  function formatTime(date) {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading notifications...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Customer Workspace
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Notifications
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Stay updated with your bookings, payments and travel activities.
            </p>
          </div>

          <button
            type="button"
            onClick={loadNotifications}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>


        {/* ======================================
            SUMMARY
        ====================================== */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Bell size={23} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Notifications
              </p>

              <h2 className="text-2xl font-extrabold text-slate-900">
                {notifications.length}
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {unreadCount} unread
            </span>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <Check size={16} />
                Mark All Read
              </button>
            )}

          </div>

        </div>


        {/* ======================================
            EMPTY
        ====================================== */}

        {notifications.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Bell size={30} />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              No notifications
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You're all caught up. New booking and travel updates will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/customer/packages")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore Packages
              <ArrowRight size={16} />
            </button>

          </div>

        ) : (

          /* ====================================
             NOTIFICATION LIST
          ==================================== */

          <div className="space-y-4">

            {notifications.map((notification) => (

              <div
                key={notification.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                  notification.is_read
                    ? "border-slate-200"
                    : "border-blue-200 bg-blue-50/20"
                }`}
              >

                <div className="flex gap-4">

                  {/* ICON */}

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getIconBackground(
                      notification.type
                    )}`}
                  >
                    {getIcon(notification.type)}
                  </div>


                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <div className="flex items-center gap-2">

                          <h3 className="text-base font-bold text-slate-900">
                            {notification.title ||
                              "Notification"}
                          </h3>

                          {!notification.is_read && (
                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                          )}

                        </div>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                          {notification.message ||
                            notification.description ||
                            "You have a new notification."}
                        </p>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex shrink-0 items-center gap-2">

                        {!notification.is_read && (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                            disabled={
                              markingId === notification.id
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                          >
                            <Check size={14} />
                            Read
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotification(
                              notification.id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-red-500 transition hover:bg-red-50"
                          title="Delete notification"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </div>


                    {/* DATE */}

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">

                      <Clock size={13} />

                      <span>
                        {formatDate(
                          notification.created_at
                        )}
                      </span>

                      <span>•</span>

                      <span>
                        {formatTime(
                          notification.created_at
                        )}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </Layout>
  );
}