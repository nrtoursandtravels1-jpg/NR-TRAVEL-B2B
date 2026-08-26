import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  Globe2,
  Headphones,
  Search,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[76px] flex items-center justify-between">

          {/* LOGO */}

          <a
            href="/"
            className="flex items-center"
          >
            <img
              src="/worldtrip-connect-logo.png"
              alt="WorldTrip Connect"
              className="h-14 w-auto max-w-[210px] object-contain"
            />
          </a>


          {/* NAVIGATION */}

          <nav className="hidden lg:flex items-center gap-7">

            <a
              href="/"
              className="text-sm font-semibold text-blue-600"
            >
              Home
            </a>

            <a
              href="/packages"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Packages
            </a>

            <a
              href="/hotel"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Hotels
            </a>

            <a
              href="/lead-marketplace"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Lead Marketplace
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Pricing
            </a>

          </nav>


          {/* ACTIONS */}

          <div className="flex items-center gap-3">

            <a
              href="/login"
              className="
                hidden sm:inline-flex
                items-center
                justify-center
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              Login
            </a>

            <a
              href="/register"
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm
                font-semibold
                transition
                shadow-sm
              "
            >
              Get Started
              <ArrowRight size={16} />
            </a>

          </div>

        </div>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.18),transparent_30%)]
        " />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* HERO CONTENT */}

            <div>

              <div className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-blue-500/10
                border
                border-blue-400/20
                text-blue-300
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
              ">
                <Globe2 size={14} />
                WorldTrip Connect
              </div>


              <h1 className="
                mt-6
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-extrabold
                leading-[1.08]
                tracking-tight
                text-white
              ">
                Connect.
                <br />
                Manage.
                <br />
                <span className="text-blue-400">
                  Grow Your Travel Business.
                </span>
              </h1>


              <p className="
                mt-6
                max-w-xl
                text-base
                lg:text-lg
                leading-8
                text-slate-300
              ">
                WorldTrip Connect is a modern travel business platform
                connecting travel agents, customers, leads, packages,
                bookings and operations in one powerful workspace.
              </p>


              {/* HERO BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                <a
                  href="/register"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3.5
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    text-sm
                    font-bold
                    transition
                    shadow-lg
                    shadow-blue-900/20
                  "
                >
                  Join as B2B Agent
                  <ArrowRight size={17} />
                </a>


                <a
                  href="/packages"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3.5
                    rounded-xl
                    border
                    border-slate-700
                    bg-white/5
                    hover:bg-white/10
                    text-white
                    text-sm
                    font-semibold
                    transition
                  "
                >
                  <Search size={17} />
                  Explore Packages
                </a>

              </div>


              {/* TRUST */}

              <div className="flex flex-wrap gap-5 mt-8">

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  B2B Travel Management
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Lead Marketplace
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Travel Operations
                </div>

              </div>

            </div>


            {/* HERO DASHBOARD PREVIEW */}

            <div className="hidden lg:block">

              <div className="
                rounded-3xl
                border
                border-slate-700
                bg-white/5
                backdrop-blur
                p-4
                shadow-2xl
              ">

                <div className="rounded-2xl bg-white overflow-hidden">

                  <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

                    <div>

                      <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">
                        Business Dashboard
                      </p>

                      <p className="text-lg font-bold text-slate-900 mt-1">
                        WorldTrip Connect
                      </p>

                    </div>

                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <BriefcaseBusiness size={20} />
                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-4 p-5">

                    <PreviewCard
                      title="Available Leads"
                      value="128"
                    />

                    <PreviewCard
                      title="My Customers"
                      value="64"
                    />

                    <PreviewCard
                      title="Bookings"
                      value="32"
                    />

                    <PreviewCard
                      title="Revenue"
                      value="₹2.4L"
                    />

                  </div>


                  <div className="px-5 pb-5">

                    <div className="rounded-xl bg-slate-50 p-4">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Lead Activity
                          </p>

                          <p className="text-sm font-bold text-slate-800 mt-1">
                            New qualified opportunities
                          </p>

                        </div>

                        <span className="text-sm font-bold text-emerald-600">
                          +24%
                        </span>

                      </div>


                      <div className="flex items-end gap-2 h-20 mt-5">

                        {[35, 48, 42, 65, 55, 72, 88, 78, 95].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="flex-1 rounded-t-md bg-blue-500"
                              style={{
                                height: `${height}%`,
                              }}
                            />
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            <Stat
              value="125+"
              label="Travel Agents"
            />

            <Stat
              value="48+"
              label="Travel Packages"
            />

            <Stat
              value="326+"
              label="Bookings Managed"
            />

            <Stat
              value="25K+"
              label="Business Revenue"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          EXISTING LANDING COMPONENTS
      ===================================================== */}

      <FeaturedPackages />

      <Services />

      <StatsCounter />

      <Testimonials />

      <FAQ />

      <PopularDestinations />

      <WhyChooseUs />


      {/* =====================================================
          PLATFORM FEATURES
      ===================================================== */}

      <section className="py-20 bg-slate-100">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="max-w-2xl mb-12">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              One Platform
            </p>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
              Everything your travel business needs.
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              Manage your complete travel business from one connected
              platform instead of switching between multiple systems.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            <Feature
              icon={<Users size={21} />}
              title="Travel Agent CRM"
              description="Manage customers, enquiries, leads and follow-ups from one workspace."
            />

            <Feature
              icon={<BriefcaseBusiness size={21} />}
              title="Lead Marketplace"
              description="Discover qualified travel opportunities and grow your customer pipeline."
            />

            <Feature
              icon={<Globe2 size={21} />}
              title="Travel Services"
              description="Manage packages, hotels, flights, buses, trains, visas and cabs."
            />

            <Feature
              icon={<ShieldCheck size={21} />}
              title="Secure Business Data"
              description="Keep customer, lead and business information organized and protected."
            />

            <Feature
              icon={<Headphones size={21} />}
              title="Operations Management"
              description="Coordinate vendors, itineraries, documents and travel operations."
            />

            <Feature
              icon={<CreditCard size={21} />}
              title="Business Management"
              description="Track quotations, invoices, bookings, subscriptions and revenue."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          LEAD MARKETPLACE
      ===================================================== */}

      <section className="py-20 bg-white border-y border-slate-200">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Lead Marketplace
              </p>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3">
                Find qualified travel leads.
                <br />

                <span className="text-blue-600">
                  Grow your business faster.
                </span>
              </h2>

              <p className="text-slate-500 leading-7 mt-5 max-w-xl">
                Discover qualified travel enquiries from customers
                looking for hotels, tours, transportation, holidays
                and other travel services. Claim the right opportunities
                and manage them directly from your CRM.
              </p>


              <div className="grid sm:grid-cols-2 gap-5 mt-8">

                <MarketplaceFeature
                  icon={<Users size={19} />}
                  title="Qualified Leads"
                  description="Access genuine travel enquiries."
                  iconClass="bg-blue-50 text-blue-600"
                />

                <MarketplaceFeature
                  icon={<CheckCircle2 size={19} />}
                  title="Simple Claiming"
                  description="Claim opportunities using lead credits."
                  iconClass="bg-emerald-50 text-emerald-600"
                />

                <MarketplaceFeature
                  icon={<BriefcaseBusiness size={19} />}
                  title="CRM Integration"
                  description="Manage claimed leads in your CRM."
                  iconClass="bg-purple-50 text-purple-600"
                />

                <MarketplaceFeature
                  icon={<CreditCard size={19} />}
                  title="Credit Based"
                  description="Use your available lead credits."
                  iconClass="bg-amber-50 text-amber-600"
                />

              </div>


              <a
                href="/lead-marketplace"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-8
                  px-6
                  py-3.5
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-bold
                  transition
                  shadow-lg
                  shadow-blue-900/10
                "
              >
                Explore Lead Marketplace
                <ArrowRight size={17} />
              </a>

            </div>


            {/* RIGHT */}

            <div className="bg-slate-950 rounded-3xl p-5 shadow-xl">

              <div className="bg-white rounded-2xl overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Lead Marketplace
                    </p>

                    <p className="text-lg font-bold text-slate-900 mt-1">
                      Available Opportunities
                    </p>

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>

                </div>


                <div className="p-5 space-y-3">

                  <MarketplacePreview
                    destination="Goa"
                    service="Family Tour"
                    travelers="4 Travelers"
                    budget="₹45,000"
                  />

                  <MarketplacePreview
                    destination="Dubai"
                    service="Holiday Package"
                    travelers="2 Travelers"
                    budget="₹1.25L"
                  />

                  <MarketplacePreview
                    destination="Manali"
                    service="Group Tour"
                    travelers="12 Travelers"
                    budget="₹1.80L"
                  />

                </div>


                <div className="px-5 pb-5">

                  <div className="rounded-xl bg-blue-50 p-4">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                          Available
                        </p>

                        <p className="text-sm font-bold text-slate-800 mt-1">
                          128 qualified leads
                        </p>

                      </div>

                      <ArrowRight
                        size={19}
                        className="text-blue-600"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BECOME PARTNER
      ===================================================== */}

      <BecomePartner />


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <ContactCTA />


      {/* =====================================================
          PRICING
      ===================================================== */}

      <section id="pricing">

        <PricingPlans />

      </section>


      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <Newsletter />


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <PremiumFooter />


      {/* =====================================================
          FLOATING ACTIONS
      ===================================================== */}

      <WhatsAppButton />

      <ScrollTopButton />

    </div>
  );
}


// ============================================================
// STAT
// ============================================================

function Stat({ value, label }) {
  return (
    <div className="text-center">

      <p className="text-3xl font-extrabold text-slate-900">
        {value}
      </p>

      <p className="text-sm text-slate-500 mt-1">
        {label}
      </p>

    </div>
  );
}


// ============================================================
// PREVIEW CARD
// ============================================================

function PreviewCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">

      <p className="text-xs text-slate-400">
        {title}
      </p>

      <p className="text-2xl font-extrabold text-slate-900 mt-2">
        {value}
      </p>

    </div>
  );
}


// ============================================================
// FEATURE
// ============================================================

function Feature({
  icon,
  title,
  description,
}) {
  return (
    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-md
      hover:border-blue-200
      transition
    ">

      <div className="
        w-11
        h-11
        rounded-xl
        bg-blue-50
        text-blue-600
        flex
        items-center
        justify-center
      ">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-900 mt-5">
        {title}
      </h3>

      <p className="text-sm text-slate-500 leading-6 mt-2">
        {description}
      </p>

    </div>
  );
}


// ============================================================
// MARKETPLACE FEATURE
// ============================================================

function MarketplaceFeature({
  icon,
  title,
  description,
  iconClass,
}) {
  return (
    <div className="flex items-start gap-3">

      <div
        className={`
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          shrink-0
          ${iconClass}
        `}
      >
        {icon}
      </div>

      <div>

        <p className="font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-sm text-slate-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}


// ============================================================
// MARKETPLACE PREVIEW
// ============================================================

function MarketplacePreview({
  destination,
  service,
  travelers,
  budget,
}) {
  return (
    <div className="
      border
      border-slate-200
      rounded-xl
      p-4
      hover:border-blue-200
      transition
    ">

      <div className="flex items-center justify-between gap-4">

        <div className="min-w-0">

          <p className="text-sm font-bold text-slate-900">
            {destination} — {service}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {travelers}
          </p>

        </div>

        <p className="text-sm font-bold text-blue-600 whitespace-nowrap">
          {budget}
        </p>

      </div>

    </div>
  );
}


export default Landingpage;