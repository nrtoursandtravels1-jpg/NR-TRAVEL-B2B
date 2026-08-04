import PricingPlans from "../components/PricingPlans";
import FeaturedPackages from "../components/landing/FeaturedPackages";
import PopularDestinations from "../components/landing/PopularDestinations";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import Testimonials from "../components/landing/Testimonials";
import BecomePartner from "../components/landing/BecomePartner";
import ContactCTA from "../components/landing/ContactCTA";
import PremiumFooter from "../components/landing/PremiumFooter";
import Services from "../components/landing/Services";
import StatsCounter from "../components/landing/StatsCounter";
import FAQ from "../components/landing/FAQ";
import Newsletter from "../components/landing/Newsletter";
import WhatsAppButton from "../components/landing/WhatsAppButton";
import ScrollTopButton from "../components/landing/ScrollTopButton";

function Landingpage() {
  return (
    <div>
      {/* HERO */}
      <section
        style={{
          padding: "60px",
          background: "#0f172a",
          color: "white",
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

        <button onClick={() => (window.location.href = "/register")}>
          Join as B2B Agent
        </button>

        <button
          onClick={() => (window.location.href = "/customer-login")}
          style={{ marginLeft: "15px" }}
        >
          Customer Login
        </button>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
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

<FeaturedPackages />

<Services />

<StatsCounter />

<Testimonials />

<FAQ />

<PopularDestinations />

<WhyChooseUs />

{/* FEATURES */}

{/* BUSINESS FLOW */}

{/* DASHBOARD PREVIEW */}

<BecomePartner />

<ContactCTA />

<PricingPlans />

<Newsletter />

<PremiumFooter />

<WhatsAppButton />

<ScrollTopButton />

</div>
);
}

export default Landingpage;