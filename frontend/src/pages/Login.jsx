import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    alert("Login button is working!");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          NR
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your NR Travel B2B account
        </p>

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
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <a href="#">Register Now</a>
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