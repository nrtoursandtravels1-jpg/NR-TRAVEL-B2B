import { useState } from "react";

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

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(30px,5vw,42px)",
            marginBottom: "15px",
            color: "#0f172a",
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "40px",
          }}
        >
          Everything you need to know before your journey.
        </p>

        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              marginBottom: "18px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,.05)",
            }}
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              style={{
                width: "100%",
                padding: "18px 20px",
                background: "#f8fafc",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "17px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {faq.question}

              <span style={{ fontSize: "22px" }}>
                {open === index ? "−" : "+"}
              </span>
            </button>

            {open === index && (
              <div
                style={{
                  padding: "20px",
                  color: "#475569",
                  lineHeight: "28px",
                  background: "#fff",
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;