import PricingPlans from "../components/PricingPlans";

function Landingpage() {
  return (
    <div>

      {/* HERO */}
      <section
        style={{
          padding: "60px",
          background: "#0f172a",
          color: "white"
        }}
      >

        <h1>
          Grow Your Travel Business
          <br />
          With NR Travel SaaS Platform
        </h1>

        <p>
          Complete travel business management platform for
          B2B agents, customers and travel operators.
        </p>


        <button
          onClick={() => window.location.href="/register"}
        >
          Join as B2B Agent
        </button>


        <button
          onClick={() => window.location.href="/customer-login"}
          style={{marginLeft:"15px"}}
        >
          Customer Login
        </button>


        <div
          style={{
            marginTop:"40px",
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:"20px"
          }}
        >

          <div>
            <h2>125+</h2>
            <p>Travel Agents</p>
          </div>

          <div>
            <h2>48+</h2>
            <p>Tour Packages</p>
          </div>

          <div>
            <h2>326+</h2>
            <p>Bookings</p>
          </div>

          <div>
            <h2>$25K+</h2>
            <p>Revenue Managed</p>
          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section style={{padding:"50px"}}>

        <h2>
          Complete Travel Business Management System
        </h2>


        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"20px"
          }}
        >

          <div>
            <h3>CRM Lead Management</h3>
            <p>
              Capture enquiries, manage follow-ups and convert
              leads into bookings.
            </p>
          </div>


          <div>
            <h3>Tour Package Management</h3>
            <p>
              Create packages, itineraries, pricing and travel schedules.
            </p>
          </div>


          <div>
            <h3>Hotel Management</h3>
            <p>
              Manage hotel partners and accommodation inventory.
            </p>
          </div>


          <div>
            <h3>B2B Agent Portal</h3>
            <p>
              Give agents tools to sell packages and manage customers.
            </p>
          </div>


          <div>
            <h3>Customer Portal</h3>
            <p>
              Customers can view trips, bookings and payments.
            </p>
          </div>


          <div>
            <h3>Operations Dashboard</h3>
            <p>
              Manage bookings, vendors, documents and travel operations.
            </p>
          </div>

        </div>

      </section>



      {/* PRICING PLANS */}

      <PricingPlans />



      {/* BUSINESS FLOW */}

      <section
        style={{
          padding:"50px",
          background:"#f1f5f9"
        }}
      >

        <h2>
          How NR Travel Works
        </h2>


        <ol>

          <li>
            Register your travel business
          </li>

          <li>
            Connect with travel partners
          </li>

          <li>
            Manage packages and customers
          </li>

          <li>
            Grow your travel sales
          </li>

        </ol>

      </section>




      {/* DASHBOARD PREVIEW */}

      <section style={{padding:"50px"}}>

        <h2>
          One Platform For Your Entire Travel Business
        </h2>


        <div>

          <h3>
            NR Travel Admin Dashboard
          </h3>


          <p>
            ✔ Lead Management
          </p>

          <p>
            ✔ Agent Management
          </p>

          <p>
            ✔ Booking Operations
          </p>

          <p>
            ✔ Revenue Reports
          </p>


        </div>

      </section>




      {/* CTA */}

      <section
        style={{
          padding:"50px",
          background:"#1e293b",
          color:"white"
        }}
      >

        <h2>
          Ready To Grow Your Travel Business?
        </h2>


        <p>
          Join NR Travel B2B platform and connect
          with customers and travel partners.
        </p>


        <button
          onClick={() => window.location.href="/register"}
        >
          Create Business Account
        </button>


      </section>




      {/* FOOTER */}

      <footer
        style={{
          padding:"30px",
          textAlign:"center"
        }}
      >

        <h2>
          NR TRAVEL B2B
        </h2>


        <p>
          Professional Travel SaaS Platform
        </p>


        <p>
          India
        </p>


        <p>
          © 2026 NR Travel. All Rights Reserved.
        </p>


      </footer>


    </div>
  );
}


export default Landingpage;