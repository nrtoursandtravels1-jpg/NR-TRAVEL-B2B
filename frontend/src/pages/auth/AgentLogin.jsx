import { useState } from "react";
import { loginUser } from "../../services/auth";

export default function AgentLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      alert("B2B Agent Login Successful");

      window.location.href = "/agent-dashboard";

    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div>
      <h1>B2B Agent Login</h1>

      <p>
        NR Travel Partner Portal
      </p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Agent Email"
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
          Login as B2B Agent
        </button>

      </form>
    </div>
  );
}