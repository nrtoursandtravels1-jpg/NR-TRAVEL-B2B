import { useState } from "react";
import { loginUser } from "../../services/auth";

export default function CustomerLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      alert("Customer Login Successful");

      window.location.href = "/customer-dashboard";

    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div>
      <h1>Customer Login</h1>

      <p>
        NR Travel Customer Portal
      </p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Customer Email"
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
          Login as Customer
        </button>

      </form>
    </div>
  );
}