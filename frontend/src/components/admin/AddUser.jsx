```jsx
import { useState } from "react";
import { supabase } from "../../services/supabase";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Card from "../../ui/Card";

export default function AddUser({ onUserAdded }) {
  const initialUser = {
    full_name: "",
    email: "",
    phone_number: "",
    role: "travel_agent",
    status: "active",
  };

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const {
        data: { currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        alert("Admin session not found. Please login again.");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            full_name: user.full_name.trim(),
            email: user.email.trim().toLowerCase(),
            phone_number: user.phone_number.trim(),
            role: user.role,
            status: user.status,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("User Creation Error:", error);
        alert(error.message);
        return;
      }

      console.log("User profile created:", data);

      alert(
        "User profile created successfully.\n\n" +
        "Note: This creates the profile record only. " +
        "The Supabase Auth account must be created separately."
      );

      setUser(initialUser);

      if (onUserAdded) {
        onUserAdded(data);
      }
    } catch (error) {
      console.error("Add User Error:", error);
      alert("Something went wrong while creating the user profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Full Name */}
          <Input
            label="Full Name"
            name="full_name"
            value={user.full_name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            name="phone_number"
            value={user.phone_number}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />

          {/* Role */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              User Role
            </label>

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="
                w-full
                rounded-[10px]
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-[15px]
                text-slate-900
                outline-none
                transition
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="admin">
                Admin
              </option>

              <option value="staff">
                Staff
              </option>

              <option value="travel_agent">
                Travel Agent
              </option>

              <option value="customer">
                Customer
              </option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={user.status}
              onChange={handleChange}
              className="
                w-full
                rounded-[10px]
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-[15px]
                text-slate-900
                outline-none
                transition
                focus:border-blue-600
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setUser(initialUser)}
            disabled={loading}
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save User"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
```
