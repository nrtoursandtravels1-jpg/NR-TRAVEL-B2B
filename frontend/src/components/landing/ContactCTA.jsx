function ContactCTA() {
  return (
    <section
      className="px-6 py-20"
      style={{
        background: "#f8fafc",
      }}
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
          Let's Plan Your Next Journey
        </h2>

        <p className="mx-auto mb-12 max-w-3xl text-base leading-7 text-slate-500 md:text-lg">
          Contact our travel experts for domestic tours, international
          holidays, visa assistance, hotels, flights and customized packages.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* CALL */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="rounded-2xl bg-white p-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl">📞</div>

            <h3 className="text-lg font-bold text-slate-900">
              Call Us
            </h3>

            <p className="mt-2 text-slate-500">
              +91 XXXXX XXXXX
            </p>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:info@worldtripconnect.com"
            className="rounded-2xl bg-white p-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl">📧</div>

            <h3 className="text-lg font-bold text-slate-900">
              Email
            </h3>

            <p className="mt-2 break-words text-slate-500">
              info@worldtripconnect.com
            </p>
          </a>

          {/* OFFICE */}
          <div className="rounded-2xl bg-white p-8 shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 text-3xl">📍</div>

            <h3 className="text-lg font-bold text-slate-900">
              Office
            </h3>

            <p className="mt-2 text-slate-500">
              Ahmedabad, Gujarat, India
            </p>
          </div>

        </div>

        {/* CONTACT BUTTON */}
        <a
          href="mailto:info@worldtripconnect.com?subject=Travel%20Enquiry"
          className="mt-10 inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          Contact Our Team
        </a>
      </div>
    </section>
  );
}

export default ContactCTA;