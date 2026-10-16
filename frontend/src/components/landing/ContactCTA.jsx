import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 py-20 sm:py-24 lg:px-8">
      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <MessageCircle size={16} />
            We're Here to Help
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Let's Plan Your{" "}
            <span className="text-blue-600">
              Next Journey
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Contact our travel experts for domestic tours, international
            holidays, visa assistance, hotels, flights and customized
            packages.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* CALL */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="group rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <Phone size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Call Us
            </h3>

            <p className="mt-2 text-slate-500">
              +91 XXXXX XXXXX
            </p>

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
              Call our team
              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </span>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:info@worldtripconnect.com"
            className="group rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
              <Mail size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Email Us
            </h3>

            <p className="mt-2 break-words text-slate-500">
              info@worldtripconnect.com
            </p>

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
              Send an enquiry
              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </span>
          </a>

          {/* OFFICE */}
          <div className="group rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
              <MapPin size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Our Office
            </h3>

            <p className="mt-2 text-slate-500">
              Ahmedabad, Gujarat, India
            </p>

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
              Visit us
              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </span>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-center shadow-xl sm:px-10">

          <div className="mx-auto max-w-2xl">

            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to plan your next trip?
            </h3>

            <p className="mt-3 text-slate-400">
              Talk to our travel experts and let us create the perfect
              journey for you.
            </p>

            <a
              href="mailto:info@worldtripconnect.com?subject=Travel%20Enquiry"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Contact Our Team
              <ArrowRight size={18} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactCTA;