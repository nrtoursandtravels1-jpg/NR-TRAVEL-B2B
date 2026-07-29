import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("customer");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    alert(`${loginType} login successful!`);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          NR
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to NR Travel CRM
        </p>


        {/* Login Type Selection */}

        <label>Login As</label>

        <select
          value={loginType}
          onChange={(e) => setLoginType(e.target.value)}
        >
          <option value="admin">
            Admin
          </option>

          <option value="b2b_agent">
            B2B Agent
          </option>

          <option value="customer">
            Customer
          </option>
        </select>


        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <div className="forgot-password">
            <a href="#">
              Forgot Password?
            </a>
          </div>


          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>


        <p className="register-text">
          Don't have an account?{" "}
          <a href="#">
            Register Now
          </a>
        </p>


        <button
          className="back-home"
          onClick={() => (window.location.href = "/")}
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default Login;