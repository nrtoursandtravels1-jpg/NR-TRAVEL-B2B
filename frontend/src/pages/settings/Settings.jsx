import { useEffect, useState } from "react";
import {
  Building2,
  UserRound,
  ShieldCheck,
  Settings2,
  Save,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

import { supabase } from "../../services/supabase";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    companyName: "NR Travel",
    email: "",
    phone: "",
    website: "",
    address: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    emailNotifications: true,
    bookingNotifications: true,
    leadNotifications: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Settings Load Error:", error);
        return;
      }

      if (data) {
        setSettings((previous) => ({
          ...previous,
          email: data.email || user.email || "",
          phone: data.phone_number || "",
          companyName:
            data.company_name ||
            previous.companyName,
        }));
      } else {
        setSettings((previous) => ({
          ...previous,
          email: user.email || "",
        }));
      }
    } catch (error) {
      console.error("Settings Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function updateSetting(field, value) {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  }

  async function saveSettings() {
    try {
      setSaving(true);
      setSaved(false);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login again.");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          company_name: settings.companyName,
          phone_number: settings.phone,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Settings Save Error:", error);
      alert(
        "Unable to save settings: " +
          error.message
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-6 md:p-8">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading settings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            System Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage company, notification and system preferences.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={loadSettings}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />

            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>

        </div>

      </div>


      {/* SUCCESS */}

      {saved && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          <CheckCircle size={18} />
          Settings saved successfully.
        </div>
      )}


      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* COMPANY PROFILE */}

        <section className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Building2 size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Company Profile
              </h2>

              <p className="text-sm text-slate-500">
                Basic business information.
              </p>
            </div>

          </div>


          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            <Input
              label="Company Name"
              value={settings.companyName}
              onChange={(value) =>
                updateSetting(
                  "companyName",
                  value
                )
              }
            />

            <Input
              label="Email"
              type="email"
              value={settings.email}
              onChange={(value) =>
                updateSetting(
                  "email",
                  value
                )
              }
            />

            <Input
              label="Phone Number"
              value={settings.phone}
              onChange={(value) =>
                updateSetting(
                  "phone",
                  value
                )
              }
            />

            <Input
              label="Website"
              value={settings.website}
              onChange={(value) =>
                updateSetting(
                  "website",
                  value
                )
              }
            />

            <div className="md:col-span-2">

              <label className="text-sm font-semibold text-slate-700">
                Office Address
              </label>

              <textarea
                value={settings.address}
                onChange={(e) =>
                  updateSetting(
                    "address",
                    e.target.value
                  )
                }
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter office address"
              />

            </div>

          </div>

        </section>


        {/* ACCOUNT */}

        <section className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Account
              </h2>

              <p className="text-sm text-slate-500">
                Current account information.
              </p>
            </div>

          </div>


          <div className="mt-6 space-y-4">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Login Email
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                {settings.email || "-"}
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Platform
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                NR Travel CRM
              </p>

            </div>

          </div>

        </section>


        {/* SYSTEM CONFIGURATION */}

        <section className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Settings2 size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                System Configuration
              </h2>

              <p className="text-sm text-slate-500">
                Regional system preferences.
              </p>
            </div>

          </div>


          <div className="mt-6 space-y-5">

            <SelectInput
              label="Currency"
              value={settings.currency}
              onChange={(value) =>
                updateSetting(
                  "currency",
                  value
                )
              }
              options={[
                ["INR", "Indian Rupee (₹)"],
                ["USD", "US Dollar ($)"],
                ["EUR", "Euro (€)"],
                ["GBP", "British Pound (£)"],
              ]}
            />

            <SelectInput
              label="Timezone"
              value={settings.timezone}
              onChange={(value) =>
                updateSetting(
                  "timezone",
                  value
                )
              }
              options={[
                [
                  "Asia/Kolkata",
                  "India (Asia/Kolkata)",
                ],
                [
                  "Asia/Dubai",
                  "UAE (Asia/Dubai)",
                ],
                [
                  "Europe/London",
                  "London",
                ],
              ]}
            />

            <SelectInput
              label="Date Format"
              value={settings.dateFormat}
              onChange={(value) =>
                updateSetting(
                  "dateFormat",
                  value
                )
              }
              options={[
                ["DD/MM/YYYY", "DD/MM/YYYY"],
                ["MM/DD/YYYY", "MM/DD/YYYY"],
                ["YYYY-MM-DD", "YYYY-MM-DD"],
              ]}
            />

          </div>

        </section>


        {/* NOTIFICATIONS */}

        <section className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Control important CRM notifications.
              </p>
            </div>

          </div>


          <div className="mt-6 space-y-3">

            <Toggle
              label="Email Notifications"
              description="Receive important system notifications by email."
              checked={
                settings.emailNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "emailNotifications",
                  value
                )
              }
            />

            <Toggle
              label="Booking Notifications"
              description="Receive notifications when bookings are created or updated."
              checked={
                settings.bookingNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "bookingNotifications",
                  value
                )
              }
            />

            <Toggle
              label="Lead Notifications"
              description="Receive alerts for new and updated leads."
              checked={
                settings.leadNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "leadNotifications",
                  value
                )
              }
            />

          </div>

        </section>

      </div>

    </div>
  );
}


/* ==========================================
   INPUT
========================================== */

function Input({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}


/* ==========================================
   SELECT
========================================== */

function SelectInput({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map(([optionValue, label]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}


/* ==========================================
   TOGGLE
========================================== */

function Toggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">

      <div>
        <p className="text-sm font-semibold text-slate-800">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
          checked
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
        aria-label={label}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}