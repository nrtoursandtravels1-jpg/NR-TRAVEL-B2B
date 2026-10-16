import { MessageCircle } from "lucide-react";

function WhatsAppButton() {
  const whatsappNumber = "919999999999";

  const whatsappMessage = encodeURIComponent(
    "Hello WorldTrip Connect, I would like to know more about your travel services."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WorldTrip Connect on WhatsApp"
      title="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        right: "22px",
        bottom: "22px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#25D366",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.22)",
        zIndex: 9999,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0, 0, 0, 0.30)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "0 8px 25px rgba(0, 0, 0, 0.22)";
      }}
    >
      <MessageCircle size={30} strokeWidth={2.2} />
    </a>
  );
}

export default WhatsAppButton;