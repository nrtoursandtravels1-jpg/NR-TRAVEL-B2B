import { Link } from "react-router-dom";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">

        <div className="grid lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-12">

          {/* BRAND */}

          <div className="max-w-sm">

            <Link
              to="/"
              className="inline-flex items-center"
            >
              <img
                src="/worldtrip-connect-logo.png"
                alt="WorldTrip Connect"
                className="h-14 w-auto max-w-[200px] object-contain"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-7 mt-5">
              A modern travel business platform connecting travel
              agents, customers, leads, packages, bookings and
              operations in one powerful workspace.
            </p>


            {/* TRUST */}

            <div className="flex items-center gap-2 mt-6 text-sm text-slate-300">
              <ShieldCheck
                size={18}
                className="text-blue-400"
              />

              Secure Travel Business Platform
            </div>


            {/* SOCIAL */}

            <div className="flex items-center gap-3 mt-6">

              <SocialButton
                icon={<Facebook size={17} />}
                label="Facebook"
              />

              <SocialButton
                icon={<Instagram size={17} />}
                label="Instagram"
              />

              <SocialButton
                icon={<Linkedin size={17} />}
                label="LinkedIn"
              />

            </div>

          </div>


          {/* PLATFORM */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider">
              Platform
            </h3>

            <div className="mt-5 space-y-3">

              <FooterLink
                to="/"
                label="Home"
              />

              <FooterLink
                to="/packages"
                label="Packages"
              />

              <FooterLink
                to="/hotel"
                label="Hotels"
              />

              <FooterLink
                to="/lead-marketplace"
                label="Lead Marketplace"
              />

              <FooterLink
                to="/login"
                label="Login"
              />

            </div>

          </div>


          {/* BUSINESS */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider">
              Business
            </h3>

            <div className="mt-5 space-y-3">

              <FooterLink
                to="/register"
                label="Become a Partner"
              />

              <FooterLink
                to="/packages"
                label="Explore Packages"
              />

              <FooterLink
                to="/lead-marketplace"
                label="Find Leads"
              />

              <a
                href="#pricing"
                className="block text-sm text-slate-400 hover:text-white transition"
              >
                Pricing
              </a>

            </div>

          </div>


          {/* CONTACT */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider">
              Contact
            </h3>


            <div className="mt-5 space-y-4">

              <ContactItem
                icon={<Mail size={17} />}
                text="Support@worldtripconnect.com"
              />

              <ContactItem
                icon={<Phone size={17} />}
                text="+91 00000 00000"
              />

              <ContactItem
                icon={<MapPin size={17} />}
                text="India"
              />

            </div>


            {/* CTA */}

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                gap-2
                mt-7
                px-4
                py-2.5
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-sm
                font-bold
                transition
              "
            >
              Start Your Journey
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="border-t border-white/10">

        <div className="
          max-w-7xl
          mx-auto
          px-5
          lg:px-8
          py-5
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
        ">

          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} WorldTrip Connect. All Rights Reserved.
          </p>


          <div className="flex items-center gap-5">

            <a
              href="#"
              className="text-xs sm:text-sm text-slate-500 hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs sm:text-sm text-slate-500 hover:text-white transition"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}


// ============================================================
// FOOTER LINK
// ============================================================

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="
        block
        text-sm
        text-slate-400
        hover:text-white
        hover:translate-x-0.5
        transition
      "
    >
      {label}
    </Link>
  );
}


// ============================================================
// CONTACT ITEM
// ============================================================

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3">

      <div className="
        w-9
        h-9
        rounded-lg
        bg-white/5
        border
        border-white/10
        text-blue-400
        flex
        items-center
        justify-center
        shrink-0
      ">
        {icon}
      </div>

      <p className="text-sm text-slate-400 leading-6 break-all">
        {text}
      </p>

    </div>
  );
}


// ============================================================
// SOCIAL BUTTON
// ============================================================

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="
        w-9
        h-9
        rounded-lg
        bg-white/5
        border
        border-white/10
        text-slate-400
        hover:text-white
        hover:bg-white/10
        transition
        flex
        items-center
        justify-center
      "
    >
      {icon}
    </button>
  );
}


export default Footer;