import { Link } from "react-router-dom";
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
  Sparkles,
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
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between">

          {/* LOGO */}

          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/worldtrip-connect-logo.png"
              alt="WorldTrip Connect"
              className="h-12 sm:h-14 w-auto max-w-[190px] object-contain"
            />
          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className="text-sm font-semibold text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/packages"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Packages
            </Link>

            <Link
              to="/hotel"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Hotels
            </Link>

            <Link
              to="/lead-marketplace"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Lead Marketplace
            </Link>

            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              Pricing
            </a>

          </nav>


          {/* ACTIONS */}

          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              to="/login"
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
            </Link>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                gap-2
                px-4
                sm:px-5
                py-2.5
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm
                font-bold
                transition
                shadow-lg
                shadow-blue-600/15
              "
            >
              <span className="hidden sm:inline">
                Get Started
              </span>

              <span className="sm:hidden">
                Start
              </span>

              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        {/* BACKGROUND */}

        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>


        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 sm:py-20 lg:py-28">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 xl:gap-20 items-center">

            {/* HERO LEFT */}

            <div>

              <div className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-2
                rounded-full
                bg-blue-500/10
                border
                border-blue-400/20
                text-blue-300
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
              ">
                <Sparkles size={14} />
                Modern Travel Business Platform
              </div>


              <h1 className="
                mt-6
                text-4xl
                sm:text-5xl
                lg:text-6xl
                xl:text-[68px]
                font-extrabold
                leading-[1.04]
                tracking-tight
                text-white
              ">
                Connect.
                <br />
                Manage.
                <br />

                <span className="text-blue-400">
                  Grow.
                </span>
              </h1>


              <p className="
                mt-7
                max-w-xl
                text-base
                sm:text-lg
                leading-8
                text-slate-300
              ">
                WorldTrip Connect brings travel agents, customers,
                leads, packages, bookings and operations together
                in one powerful business platform.
              </p>


              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 mt-9">

                <Link
                  to="/register"
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
                    shadow-xl
                    shadow-blue-950/30
                  "
                >
                  Join as B2B Agent
                  <ArrowRight size={17} />
                </Link>


                <Link
                  to="/packages"
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
                </Link>

              </div>


              {/* TRUST */}

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">

                <TrustItem text="B2B Travel Management" />

                <TrustItem text="Lead Marketplace" />

                <TrustItem text="Travel Operations" />

              </div>

            </div>


            {/* HERO RIGHT */}

            <div className="relative">

              {/* Decorative glow */}

              <div className="
                absolute
                -inset-5
                bg-blue-500/10
                rounded-[40px]
                blur-2xl
              " />


              <div className="
                relative
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-3
                sm:p-4
                shadow-2xl
              ">

                <div className="
                  rounded-[22px]
                  bg-white
                  overflow-hidden
                  shadow-2xl
                ">

                  {/* DASHBOARD HEADER */}

                  <div className="
                    px-5
                    py-4
                    border-b
                    border-slate-200
                    flex
                    items-center
                    justify-between
                  ">

                    <div>

                      <p className="
                        text-[10px]
                        text-slate-400
                        uppercase
                        tracking-[0.15em]
                        font-bold
                      ">
                        Business Dashboard
                      </p>

                      <p className="
                        text-lg
                        font-extrabold
                        text-slate-900
                        mt-1
                      ">
                        WorldTrip Connect
                      </p>

                    </div>


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
                      <BriefcaseBusiness size={20} />
                    </div>

                  </div>


                  {/* DASHBOARD CARDS */}

                  <div className="grid grid-cols-2 gap-3 p-5">

                    <PreviewCard
                      title="Available Leads"
                      value="128"
                      icon={<Users size={17} />}
                    />

                    <PreviewCard
                      title="Customers"
                      value="64"
                      icon={<Users size={17} />}
                    />

                    <PreviewCard
                      title="Bookings"
                      value="32"
                      icon={<ShoppingBag size={17} />}
                    />

                    <PreviewCard
                      title="Revenue"
                      value="₹2.4L"
                      icon={<CreditCard size={17} />}
                    />

                  </div>


                  {/* ACTIVITY */}

                  <div className="px-5 pb-5">

                    <div className="
                      rounded-2xl
                      bg-slate-50
                      border
                      border-slate-100
                      p-4
                    ">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.15em]
                            text-slate-400
                          ">
                            Lead Activity
                          </p>

                          <p className="
                            text-sm
                            font-bold
                            text-slate-800
                            mt-1
                          ">
                            Qualified opportunities
                          </p>

                        </div>


                        <span className="
                          px-2.5
                          py-1
                          rounded-lg
                          bg-emerald-50
                          text-emerald-600
                          text-xs
                          font-bold
                        ">
                          +24%
                        </span>

                      </div>


                      <div className="
                        flex
                        items-end
                        gap-2
                        h-24
                        mt-5
                      ">

                        {[35, 48, 42, 65, 55, 72, 88, 78, 95].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="
                                flex-1
                                rounded-t-md
                                bg-blue-500
                                opacity-90
                              "
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
          STATS STRIP
      ===================================================== */}

      <section className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            divide-x-0
            lg:divide-x
            divide-slate-200
          ">

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
          FEATURED PACKAGES
      ===================================================== */}

      <SectionWrapper>
        <SectionHeading
          eyebrow="Explore"
          title="Featured Travel Packages"
          description="Discover attractive travel experiences and packages from our growing travel network."
        />

        <FeaturedPackages />
      </SectionWrapper>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="py-20 lg:py-24 bg-slate-100">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <SectionHeading
            eyebrow="Travel Services"
            title="Everything your travel business needs"
            description="Manage the complete travel journey from one connected platform."
          />

          <Services />

        </div>

      </section>


      {/* =====================================================
          PLATFORM STATS
      ===================================================== */}

      <section className="py-16 bg-white border-y border-slate-200">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <StatsCounter />

        </div>

      </section>


      {/* =====================================================
          LEAD MARKETPLACE
      ===================================================== */}

      <section className="py-20 lg:py-28 bg-slate-950">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* LEFT */}

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
                <ShoppingBag size={14} />
                Lead Marketplace
              </div>


              <h2 className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-extrabold
                leading-tight
                text-white
                mt-5
              ">
                Find qualified travel leads.
                <span className="block text-blue-400 mt-1">
                  Grow faster.
                </span>
              </h2>


              <p className="
                text-slate-400
                leading-7
                mt-5
                max-w-xl
              ">
                Discover travel enquiries from customers looking
                for hotels, tours, transportation, holidays and
                other travel services. Claim the right opportunities
                and manage them directly from your CRM.
              </p>


              <div className="grid sm:grid-cols-2 gap-5 mt-9">

                <MarketplaceFeature
                  icon={<Users size={19} />}
                  title="Qualified Leads"
                  description="Access genuine travel enquiries."
                  iconClass="bg-blue-500/10 text-blue-400"
                />

                <MarketplaceFeature
                  icon={<CheckCircle2 size={19} />}
                  title="Simple Claiming"
                  description="Claim opportunities using credits."
                  iconClass="bg-emerald-500/10 text-emerald-400"
                />

                <MarketplaceFeature
                  icon={<BriefcaseBusiness size={19} />}
                  title="CRM Integration"
                  description="Manage claimed leads in your CRM."
                  iconClass="bg-purple-500/10 text-purple-400"
                />

                <MarketplaceFeature
                  icon={<CreditCard size={19} />}
                  title="Credit Based"
                  description="Use your available lead credits."
                  iconClass="bg-amber-500/10 text-amber-400"
                />

              </div>


              <Link
                to="/lead-marketplace"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-9
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
                  shadow-blue-900/30
                "
              >
                Explore Lead Marketplace
                <ArrowRight size={17} />
              </Link>

            </div>


            {/* RIGHT PREVIEW */}

            <div className="
              rounded-[28px]
              bg-white/5
              border
              border-white/10
              p-3
              sm:p-4
            ">

              <div className="
                bg-white
                rounded-[22px]
                overflow-hidden
              ">

                <div className="
                  px-5
                  py-4
                  border-b
                  border-slate-200
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-slate-400
                    ">
                      Marketplace
                    </p>

                    <p className="
                      text-lg
                      font-extrabold
                      text-slate-900
                      mt-1
                    ">
                      Available Opportunities
                    </p>

                  </div>


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

                  <div className="
                    rounded-xl
                    bg-blue-50
                    border
                    border-blue-100
                    p-4
                    flex
                    items-center
                    justify-between
                  ">

                    <div>

                      <p className="
                        text-[10px]
                        text-blue-600
                        font-bold
                        uppercase
                        tracking-wide
                      ">
                        Available
                      </p>

                      <p className="
                        text-sm
                        font-extrabold
                        text-slate-800
                        mt-1
                      ">
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

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <SectionWrapper background="white">

        <SectionHeading
          eyebrow="Why Us"
          title="Built for modern travel businesses"
          description="Everything is designed to help travel businesses manage relationships, opportunities and operations more efficiently."
        />

        <WhyChooseUs />

      </SectionWrapper>


      {/* =====================================================
          DESTINATIONS
      ===================================================== */}

      <section className="py-20 lg:py-24 bg-slate-100">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <SectionHeading
            eyebrow="Inspiration"
            title="Popular Destinations"
            description="Explore destinations your customers are already looking for."
          />

          <PopularDestinations />

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <SectionWrapper background="white">

        <SectionHeading
          eyebrow="Partners"
          title="Trusted by travel professionals"
          description="See how travel businesses can use WorldTrip Connect to manage their daily operations."
        />

        <Testimonials />

      </SectionWrapper>


      {/* =====================================================
          BECOME PARTNER
      ===================================================== */}

      <BecomePartner />


      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        id="pricing"
        className="py-20 lg:py-24 bg-slate-100"
      >

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <SectionHeading
            eyebrow="Plans"
            title="Choose the right plan for your business"
            description="Start small and upgrade as your travel business grows."
          />

          <PricingPlans />

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <SectionWrapper background="white">

        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about WorldTrip Connect."
        />

        <FAQ />

      </SectionWrapper>


      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <ContactCTA />


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
// SECTION WRAPPER
// ============================================================

function SectionWrapper({
  children,
  background = "slate",
}) {
  const bgClass =
    background === "white"
      ? "bg-white"
      : "bg-slate-50";

  return (
    <section className={`py-20 lg:py-24 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {children}
      </div>
    </section>
  );
}


// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="max-w-2xl mb-12">

      <div className="
        inline-flex
        items-center
        gap-2
        text-xs
        font-bold
        uppercase
        tracking-[0.2em]
        text-blue-600
      ">
        <span className="w-6 h-px bg-blue-600" />
        {eyebrow}
      </div>


      <h2 className="
        text-3xl
        sm:text-4xl
        lg:text-[42px]
        font-extrabold
        tracking-tight
        text-slate-900
        mt-3
        leading-tight
      ">
        {title}
      </h2>


      <p className="
        text-slate-500
        leading-7
        mt-4
      ">
        {description}
      </p>

    </div>
  );
}


// ============================================================
// TRUST ITEM
// ============================================================

function TrustItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">

      <CheckCircle2
        size={16}
        className="text-emerald-400 shrink-0"
      />

      <span>{text}</span>

    </div>
  );
}


// ============================================================
// STAT
// ============================================================

function Stat({ value, label }) {
  return (
    <div className="
      text-center
      py-7
      sm:py-8
      px-3
    ">

      <p className="
        text-2xl
        sm:text-3xl
        lg:text-4xl
        font-extrabold
        text-slate-900
      ">
        {value}
      </p>

      <p className="
        text-xs
        sm:text-sm
        text-slate-500
        mt-1.5
      ">
        {label}
      </p>

    </div>
  );
}


// ============================================================
// PREVIEW CARD
// ============================================================

function PreviewCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="
      rounded-xl
      border
      border-slate-200
      bg-white
      p-4
      hover:border-blue-200
      transition
    ">

      <div className="flex items-center justify-between">

        <p className="text-xs text-slate-400">
          {title}
        </p>

        <div className="
          w-7
          h-7
          rounded-lg
          bg-blue-50
          text-blue-600
          flex
          items-center
          justify-center
        ">
          {icon}
        </div>

      </div>


      <p className="
        text-2xl
        font-extrabold
        text-slate-900
        mt-3
      ">
        {value}
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

        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="text-sm text-slate-400 mt-1 leading-5">
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
      hover:shadow-sm
      transition
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-4
      ">

        <div className="min-w-0">

          <p className="
            text-sm
            font-bold
            text-slate-900
            truncate
          ">
            {destination} — {service}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {travelers}
          </p>

        </div>


        <p className="
          text-sm
          font-extrabold
          text-blue-600
          whitespace-nowrap
        ">
          {budget}
        </p>

      </div>

    </div>
  );
}


export default Landingpage;