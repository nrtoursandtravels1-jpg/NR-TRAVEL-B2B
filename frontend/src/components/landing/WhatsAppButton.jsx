function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#25D366",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        fontSize: "30px",
        boxShadow: "0 8px 20px rgba(0,0,0,.3)",
        zIndex: 9999,
      }}
    >
      💬
    </a>
  );
}

export default WhatsAppButton;