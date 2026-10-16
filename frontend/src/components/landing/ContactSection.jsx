import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function ContactSection() {
  const contactItems = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 XXXXX XXXXX",
      description: "Call our travel team",
      href: "tel:+91XXXXXXXXXX",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@worldtripconnect.com",
      description: "Send an enquiry",
      href: "mailto:info@worldtripconnect.com",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      value: "Ahmedabad, Gujarat, India",
      description: "Travel with confidence",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 px-6 py-20 md:px-10 lg:px-16 lg:py-24"
    >
      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
            Contact Us
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Let's Plan Your{" "}
            <span className="text-blue-600">
              Next Journey
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 md:text-lg">
            Our travel experts are ready to help you plan domestic tours,
            international holidays, hotels, flights, visas and customized
            travel packages.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">

          {contactItems.map((item) => {
            const Icon = item.icon;

            const cardContent = (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 break-words text-sm text-slate-500">
                  {item.value}
                </p>

                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  {item.description}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                {cardContent}
              </div>
            );
          })}

        </div>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-center shadow-xl md:px-10">

          <div className="mx-auto max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              WorldTrip Connect
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Ready to plan your next adventure?
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400 md:text-base">
              Speak with our travel team and let us create the perfect
              journey for you.
            </p>

            <a
              href="mailto:info@worldtripconnect.com?subject=Travel%20Enquiry"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
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

export default ContactSection;