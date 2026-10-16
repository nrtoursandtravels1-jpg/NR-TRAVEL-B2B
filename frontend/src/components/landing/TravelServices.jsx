import {
  Plane,
  Hotel,
  Bus,
  TrainFront,
  FileCheck,
  Map,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";

function TravelServices() {
  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      description:
        "Find convenient domestic and international flights with reliable booking support.",
    },
    {
      icon: Hotel,
      title: "Hotel Booking",
      description:
        "Choose comfortable hotels and stays at destinations across India and worldwide.",
    },
    {
      icon: Bus,
      title: "Bus Booking",
      description:
        "Book comfortable bus journeys for individual travelers, families and groups.",
    },
    {
      icon: TrainFront,
      title: "Train Booking",
      description:
        "Get assistance with train travel planning and convenient journey arrangements.",
    },
    {
      icon: Map,
      title: "Tour Packages",
      description:
        "Explore curated holiday packages for family trips, honeymoons and group tours.",
    },
    {
      icon: FileCheck,
      title: "Visa Assistance",
      description:
        "Get professional assistance with visa documentation and international travel planning.",
    },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Trusted Service",
      text: "Reliable travel support from planning to your journey.",
    },
    {
      icon: Headphones,
      title: "Travel Support",
      text: "Our team is available to help whenever you need us.",
    },
    {
      icon: Map,
      title: "Complete Solutions",
      text: "Flights, hotels, packages and more in one place.",
    },
  ];

  return (
    <section
      style={{
        padding: "90px 20px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Section Heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "55px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "#f59e0b",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Our Services
          </span>

          <h2
            style={{
              margin: "0 0 15px",
              color: "#0f172a",
              fontSize: "clamp(30px, 5vw, 42px)",
              fontWeight: "800",
              lineHeight: "1.2",
            }}
          >
            Everything You Need for Your Journey
          </h2>

          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            From flights and hotels to complete holiday packages, WorldTrip
            Connect makes travel planning simple, convenient and reliable.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "30px",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-7px)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(15, 23, 42, 0.10)";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "#f8fafc";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #f59e0b, #ea580c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "22px",
                    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.25)",
                  }}
                >
                  <Icon size={28} color="#ffffff" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    margin: "0 0 12px",
                    color: "#0f172a",
                    fontSize: "20px",
                    fontWeight: "750",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "15px",
                    lineHeight: "1.7",
                  }}
                >
                  {service.description}
                </p>

                {/* Learn More */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    color: "#ea580c",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Explore Service
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div
          style={{
            marginTop: "65px",
            padding: "35px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, #fff7ed 0%, #fffbeb 100%)",
            border: "1px solid #fed7aa",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "30px",
            }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <Icon size={21} color="#ea580c" />
                  </div>

                  <div>
                    <h4
                      style={{
                        margin: "0 0 5px",
                        color: "#0f172a",
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      {benefit.title}
                    </h4>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      {benefit.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelServices;