import { useState } from "react";
import { loginUser } from "../../services/auth";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      alert("Admin Login Successful");

      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div>
      <h1>Admin Login</h1>

      <p>
        NR Travel CRM Admin Panel
      </p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">
          Login as Admin
        </button>

      </form>
    </div>
  );
}