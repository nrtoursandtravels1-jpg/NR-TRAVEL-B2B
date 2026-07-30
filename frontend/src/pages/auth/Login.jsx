import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("customer");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }


    try {

      setLoading(true);


      // Supabase Authentication

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });


      if (error) {
        throw error;
      }


      const user = data.user;


      // Get User Profile

      const {
        data: profile,
        error: profileError
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();



      if (profileError) {
        throw profileError;
      }



      // Admin Login

      if (profile.role === "admin") {

        navigate("/admin-dashboard");
        return;

      }



      // Customer Login

      if (profile.role === "customer") {

        navigate("/customer-dashboard");
        return;

      }



      // Travel Agent Login

      if (profile.role === "b2b_agent") {


        const {
          data: subscription,
          error: subError

        } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false
          })
          .limit(1)
          .single();



        if (subError) {

          navigate("/upgrade-plan");
          return;

        }



        const today = new Date();

        const expiry = new Date(
          subscription.end_date
        );



        if (today > expiry) {

          navigate("/upgrade-plan");

        }

        else {

          navigate("/agent-dashboard");

        }


        return;

      }



      alert("Invalid user role");


    }


    catch(error) {

      console.log(
        "Login Error:",
        error
      );

      alert(error.message);

    }


    finally {

      setLoading(false);

    }

  };



  return (

    <div className="login-page">

      <div className="login-card">


        <div className="login-logo">
          NR
        </div>


        <h1>
          Welcome Back
        </h1>


        <p className="login-subtitle">
          Login to NR Travel SaaS Platform
        </p>



        <label>
          Login As
        </label>


        <select

          value={loginType}

          onChange={(e)=>
            setLoginType(e.target.value)
          }

        >

          <option value="admin">
            Admin
          </option>


          <option value="b2b_agent">
            Travel Agent
          </option>


          <option value="customer">
            Customer
          </option>


        </select>



        <form onSubmit={handleLogin}>


          <label>
            Email Address
          </label>


          <input

            type="email"

            placeholder="Enter your email"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
            }

          />



          <label>
            Password
          </label>


          <input

            type="password"

            placeholder="Enter your password"

            value={password}

            onChange={(e)=>
              setPassword(e.target.value)
            }

          />



          <button

            type="submit"

            className="login-submit"

            disabled={loading}

          >

            {
              loading
              ? "Checking..."
              : "Login"
            }


          </button>


        </form>



        <p className="register-text">

          Don't have an account?{" "}

          <a href="/register">
            Register Now
          </a>

        </p>



        <button

          className="back-home"

          onClick={() =>
            navigate("/")
          }

        >

          ← Back to Home

        </button>


      </div>

    </div>

  );

}


export default Login;