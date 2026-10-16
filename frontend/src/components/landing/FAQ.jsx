import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
} from "lucide-react";

function FAQ() {
  const faqs = [
    {
      question: "How do I book a tour package?",
      answer:
        "Simply browse our packages, choose your preferred destination, and contact our travel expert or book online.",
    },
    {
      question: "Do you provide visa assistance?",
      answer:
        "Yes. We provide Tourist, Business and Student Visa assistance for multiple countries.",
    },
    {
      question: "Can I customize my holiday package?",
      answer:
        "Absolutely. We specialize in customized Domestic and International holiday packages.",
    },
    {
      question: "Do you offer B2B travel partnerships?",
      answer:
        "Yes. Travel agencies can join WorldTrip Connect and manage customers, bookings and packages through our CRM platform.",
    },
    {
      question: "Is travel insurance available?",
      answer:
        "Yes. We provide comprehensive travel insurance for both Domestic and International trips.",
    },
  ];

  const [open, setOpen] = useState(null);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-50 px-6 py-20 md:px-10 lg:px-16 lg:py-24"
    >
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Everything You Need{" "}
            <span className="text-blue-600">
              to Know
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 md:text-lg">
            Find answers to the most common questions before planning
            your next journey with WorldTrip Connect.
          </p>

        </div>

        {/* FAQ LIST */}
        <div className="mt-12 space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-blue-200 shadow-lg"
                    : "border-slate-200 shadow-sm hover:border-blue-100 hover:shadow-md"
                }`}
              >

                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                >
                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="text-base font-bold text-slate-900 sm:text-lg">
                      {faq.question}
                    </span>

                  </div>

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">

                    <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-7">
                      <div className="flex gap-4">

                        <div className="hidden w-10 shrink-0 sm:block" />

                        <p className="text-sm leading-7 text-slate-500 sm:text-base">
                          {faq.answer}
                        </p>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 rounded-3xl bg-slate-950 px-6 py-9 text-center shadow-xl sm:px-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Sparkles size={22} />
          </div>

          <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
            Still have questions?
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Our travel experts are always ready to help you plan
            your perfect journey.
          </p>

          <a
            href="#contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Talk to Our Team
          </a>

        </div>

      </div>
    </section>
  );
}

export default FAQ;