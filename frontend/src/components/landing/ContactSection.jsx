function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-slate-50 px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Contact Us
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Let's Plan Your Next Journey
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500 md:text-lg">
            Our travel experts are ready to help you plan domestic tours,
            international holidays, hotels, flights, visas and customized
            travel packages.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Phone */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              📞
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Call Us
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              +91 XXXXX XXXXX
            </p>

            <p className="mt-3 text-sm font-semibold text-blue-600">
              Call our travel team
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:info@worldtripconnect.com"
            className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              📧
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Email Us
            </h3>

            <p className="mt-2 break-words text-sm text-slate-500">
              info@worldtripconnect.com
            </p>

            <p className="mt-3 text-sm font-semibold text-blue-600">
              Send an enquiry
            </p>
          </a>

          {/* Office */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              📍
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Visit Our Office
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Ahmedabad, Gujarat, India
            </p>

            <p className="mt-3 text-sm font-semibold text-blue-600">
              Travel with confidence
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="mailto:info@worldtripconnect.com?subject=Travel%20Enquiry"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Contact Our Team
          </a>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;