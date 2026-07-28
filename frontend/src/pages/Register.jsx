import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !formData.ownerName ||
      !formData.businessName ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.password
    ) {
      alert("Please fill all the fields");
      return;
    }

    console.log("Registration Data:", formData);

    alert("Registration form submitted successfully!");

    // Later we will connect this form to Supabase
  };

  return (
    <div className="login-page">
      <div className="login-card register-card">

        <div className="login-logo">
          NR
        </div>

        <h1>Create Your Account</h1>

        <p className="login-subtitle">
          Join the NR Travel B2B Network
        </p>

        <form onSubmit={handleRegister}>

          <label>Owner / Contact Person</label>

          <input
            type="text"
            name="ownerName"
            placeholder="Enter your name"
            value={formData.ownerName}
            onChange={handleChange}
          />

          <label>Business Name</label>

          <input
            type="text"
            name="businessName"
            placeholder="Enter your travel business name"
            value={formData.businessName}
            onChange={handleChange}
          />

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your business email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Mobile Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter mobile number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>City</label>

          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="login-submit"
          >
            Create B2B Account
          </button>

        </form>

        <p className="register-text">
          Already have an account?{" "}
          <a href="/login">Login</a>
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

export default Register;