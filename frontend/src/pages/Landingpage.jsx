function LandingPage() {
  return (
    <div>
      {/* NAVBAR */}
      <header>
        <div>
          <h2>NR TRAVEL B2B</h2>
          <p>Travel Business Network</p>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div>
          <button
  onClick={() => (window.location.href = "/login")}
>
  Login
</button>
          <button
  onClick={() => (window.location.href = "/register")}
>
  Register
</button>
        </div>
      </header>
      {/* HERO */}
      <section id="home">
        <div>
          <p>B2B TRAVEL BUSINESS PLATFORM</p>

          <h1>
            Grow Your Travel Business
            <br />
            With NR Travel B2B
          </h1>

          <p>
            Connect with trusted travel partners, transport operators,
            hotels and tour services. Manage your travel business
            from one powerful platform.
          </p>

          <button>Get Started →</button>
          <button>Explore Services</button>
        </div>

        <div>
          <h3>NR Travel Dashboard</h3>

          <div>
            <h4>🤝 Partners</h4>
            <strong>125</strong>
          </div>

          <div>
            <h4>📦 Packages</h4>
            <strong>48</strong>
          </div>

          <div>
            <h4>🎫 Bookings</h4>
            <strong>326</strong>
          </div>

          <div>
            <h4>💰 Revenue</h4>
            <strong>₹1.25L</strong>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <h2>Everything You Need for Your Travel Business</h2>

        <p>
          Manage your complete travel business from one platform.
        </p>

        <div>
          <article>
            <h3>🤝 B2B Partners</h3>
            <p>
              Connect with travel agents, tour operators and trusted
              business partners.
            </p>
          </article>

          <article>
            <h3>📦 Tour Packages</h3>
            <p>
              Create and manage your tour packages, prices and itineraries.
            </p>
          </article>

          <article>
            <h3>🚌 Transport</h3>
            <p>
              Manage buses, cars, drivers and transport partners.
            </p>
          </article>

          <article>
            <h3>🏨 Hotels</h3>
            <p>
              Organize hotel partners and accommodation options.
            </p>
          </article>

          <article>
            <h3>🎫 Bookings</h3>
            <p>
              Manage customers, bookings, payments and travel details.
            </p>
          </article>

          <article>
            <h3>📊 Reports</h3>
            <p>
              Track sales, revenue, expenses and business performance.
            </p>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <h2>How NR Travel B2B Works</h2>

        <div>
          <div>
            <strong>01</strong>
            <h3>Register</h3>
            <p>Create your travel business account.</p>
          </div>

          <div>
            <strong>02</strong>
            <h3>Connect</h3>
            <p>Connect with trusted B2B travel partners.</p>
          </div>

          <div>
            <strong>03</strong>
            <h3>Manage</h3>
            <p>Manage leads, packages and bookings.</p>
          </div>

          <div>
            <strong>04</strong>
            <h3>Grow</h3>
            <p>Grow your travel business network.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <h2>Built for Travel Businesses</h2>

        <p>
          NR Travel B2B is designed to help travel agents, tour operators,
          transport providers and travel businesses manage their operations
          and build strong business partnerships.
        </p>

        <button>Join NR Travel B2B →</button>
      </section>

      {/* CTA */}
      <section>
        <h2>Ready to Grow Your Travel Business?</h2>

        <p>
          Join NR Travel B2B and build your network with trusted
          travel businesses.
        </p>

        <button>Register Your Business →</button>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <h2>NR TRAVEL B2B</h2>

        <p>
          Your trusted platform for managing and growing
          your travel business.
        </p>

        <p>📧 support@nrtravelb2b.com</p>
        <p>📱 +91 XXXXX XXXXX</p>
        <p>📍 India</p>

        <hr />

        <p>
          © 2026 NR Travel B2B. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;