function Newsletter() {
  return (
    <section
      style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(30px,5vw,44px)",
            marginBottom: "15px",
          }}
        >
          Subscribe To Our Travel Newsletter
        </h2>

        <p
          style={{
            color: "#dbeafe",
            marginBottom: "35px",
            fontSize: "18px",
            lineHeight: "30px",
          }}
        >
          Get exclusive travel deals, holiday packages, travel tips and
          special offers directly in your inbox.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            style={{
              padding: "15px",
              width: "350px",
              maxWidth: "100%",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />

          <button
            style={{
              padding: "15px 30px",
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;