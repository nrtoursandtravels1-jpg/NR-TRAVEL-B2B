import { useState } from "react";
import { supabase } from "../services/supabase";

function Register() {

  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  const handleRegister = async (e) => {

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


    try {

      setLoading(true);


      // 1. Create Auth User

      const {
        data: authData,
        error: authError
      } = await supabase.auth.signUp({

        email: formData.email,

        password: formData.password,

      });


      if(authError) throw authError;


      const userId = authData.user.id;



      // 2. Create Profile

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({

          id: userId,

          full_name: formData.ownerName,

          email: formData.email,

          phone: formData.phone,

          role: "agent",

        });


      if(profileError) throw profileError;




      // 3. Create Lead Provider Account

      const { error: providerError } = await supabase
        .from("lead_providers")
        .insert({

          user_id: userId,

          company_name: formData.businessName,

          business_type: "Travel Agency",

          status: "active",

        });


      if(providerError) throw providerError;




      // 4. Create 2 Day Trial Subscription

      const startDate = new Date();


      const endDate = new Date();

      endDate.setDate(
        endDate.getDate() + 2
      );



      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .insert({

          user_id: userId,

          plan_id:
          "321798b7-23b0-494a-848c-107662d0cbc5",

          start_date: startDate,

          end_date: endDate,

          status: "trial",

          payment_status: "free",

        });



      if(subscriptionError) throw subscriptionError;



      alert(
        "Account created successfully! Your 2 Day Trial has started."
      );


      window.location.href="/dashboard";



    } catch(error) {

      console.log(
        "Registration Error:",
        error
      );

      alert(error.message);


    } finally {

      setLoading(false);

    }


  };



  return (

    <div className="login-page">

      <div className="login-card register-card">


        <div className="login-logo">
          NR
        </div>


        <h1>
          Create Your Account
        </h1>


        <p className="login-subtitle">
          Join the NR Travel B2B Network
        </p>



        <form onSubmit={handleRegister}>


          <label>Owner / Contact Person</label>

          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
          />



          <label>Business Name</label>

          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
          />



          <label>Email Address</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />



          <label>Mobile Number</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />



          <label>City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />



          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />



          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >

            {
              loading
              ?
              "Creating Account..."
              :
              "Start 2 Day Free Trial"
            }

          </button>


        </form>



        <p className="register-text">

          Already have an account?{" "}

          <a href="/login">
            Login
          </a>

        </p>


        <button
          className="back-home"
          onClick={() => window.location.href="/"}
        >

          ← Back to Home

        </button>


      </div>

    </div>

  );

}


export default Register;