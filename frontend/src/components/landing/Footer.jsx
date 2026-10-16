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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="lg:col-span-1">

            <div className="flex items-center gap-3">
              <img
                src="/worldtrip-connect-logo.png"
                alt="WorldTrip Connect"
                className="h-12 w-auto object-contain"
              />

              <div>
                <h2 className="text-lg font-extrabold">
                  WorldTrip Connect
                </h2>

                <p className="text-xs text-slate-400">
                  Travel Business Platform
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted travel platform for tours, hotels, flights,
              visa assistance and customized travel experiences.
            </p>

            {/* Secure Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <ShieldCheck
                size={18}
                className="text-emerald-400"
              />

              <span className="text-xs font-semibold text-slate-300">
                Secure Travel Platform
              </span>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-pink-600 hover:text-white"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-blue-700 hover:text-white"
              >
                <Linkedin size={18} />
              </a>

            </div>

          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h3>

            <ul className="mt-6 space-y-3 text-sm">

              <li>
                <a
                  href="/"
                  className="text-slate-400 transition hover:text-white"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/customer/packages"
                  className="text-slate-400 transition hover:text-white"
                >
                  Tour Packages
                </a>
              </li>

              <li>
                <a
                  href="/hotels"
                  className="text-slate-400 transition hover:text-white"
                >
                  Hotels
                </a>
              </li>

              <li>
                <a
                  href="/lead-marketplace"
                  className="text-slate-400 transition hover:text-white"
                >
                  Lead Marketplace
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="text-slate-400 transition hover:text-white"
                >
                  Login
                </a>
              </li>

            </ul>
          </div>

          {/* BUSINESS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Business
            </h3>

            <ul className="mt-6 space-y-3 text-sm">

              <li>
                <a
                  href="/register"
                  className="text-slate-400 transition hover:text-white"
                >
                  Become a Partner
                </a>
              </li>

              <li>
                <a
                  href="/customer/packages"
                  className="text-slate-400 transition hover:text-white"
                >
                  Explore Packages
                </a>
              </li>

              <li>
                <a
                  href="/lead-marketplace"
                  className="text-slate-400 transition hover:text-white"
                >
                  Find Travel Leads
                </a>
              </li>

              <li>
                <a
                  href="/pricing"
                  className="text-slate-400 transition hover:text-white"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-slate-400 transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>

            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <a
                href="mailto:info@worldtripconnect.com"
                className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span>
                  info@worldtripconnect.com
                </span>
              </a>

              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
              >
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span>
                  +91 XXXXX XXXXX
                </span>
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <span>
                  Ahmedabad, Gujarat,
                  <br />
                  India
                </span>
              </div>

            </div>

            {/* CTA */}
            <a
              href="mailto:info@worldtripconnect.com?subject=Travel%20Enquiry"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Contact Our Team
              <ArrowRight size={16} />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">

          <p className="text-slate-500">
            © {currentYear} WorldTrip Connect. All Rights Reserved.
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-slate-500 transition hover:text-white"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;