import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function AddUser({ onUserAdded }) {

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "customer",
    status: "active",
  });


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const { error } = await supabase
      .from("profiles")
      .insert([user]);


    if (error) {
      console.log(error);
      alert("User creation failed");
      return;
    }


    alert("User created successfully");


    setUser({
      full_name: "",
      email: "",
      phone: "",
      role: "customer",
      status: "active",
    });


    if (onUserAdded) {
      onUserAdded();
    }

  };


  return (
    <div>

      <h2>Add New User</h2>


      <form onSubmit={handleSubmit}>


        <input
          name="full_name"
          placeholder="Full Name"
          value={user.full_name}
          onChange={handleChange}
        />


        <input
          name="email"
          placeholder="Email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />


        <input
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
        />


        <select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="admin">
            Admin
          </option>

          <option value="agent">
            B2B Agent
          </option>

          <option value="customer">
            Customer
          </option>

          <option value="staff">
            Staff
          </option>

        </select>


        <select
          name="status"
          value={user.status}
          onChange={handleChange}
        >

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>


        <button type="submit">
          Save User
        </button>


      </form>

    </div>
  );
}