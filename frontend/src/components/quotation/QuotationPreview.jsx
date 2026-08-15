export default function QuotationPreview({
  quotation,
}) {
  if (!quotation) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,.08)",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        <h2>📄 Quotation Preview</h2>

        <p>
          Create a quotation to see the preview
          here.
        </p>
      </div>
    );
  }

  const services = [
    ["Hotel", quotation.hotel_amount],
    ["Flight", quotation.flight_amount],
    ["Train", quotation.train_amount],
    ["Bus", quotation.bus_amount],
    ["Cab", quotation.cab_amount],
    ["Visa", quotation.visa_amount],
    ["Package", quotation.package_amount],
    ["Other", quotation.other_amount],
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        marginBottom: "30px",
        padding: "30px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "15px",
        }}
      >
        📄 Quotation Preview
      </h2>

      <hr />

      {/* Company */}

      <div style={{ marginTop: "20px" }}>
        <h3
          style={{
            fontSize: "24px",
            marginBottom: "5px",
          }}
        >
          NR Tours & Travels
        </h3>

        <p>
          Professional Travel Solutions
        </p>

        <p>📞 +91 XXXXX XXXXX</p>

        <p>📧 info@nrtours.com</p>
      </div>

      <hr />

      {/* Customer */}

      <h3
        style={{
          marginTop: "20px",
        }}
      >
        Customer Details
      </h3>

      <p>
        <strong>Name:</strong>{" "}
        {quotation.customer_name || "-"}
      </p>

      <p>
        <strong>Mobile:</strong>{" "}
        {quotation.mobile || "-"}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {quotation.email || "-"}
      </p>

      <p>
        <strong>Destination:</strong>{" "}
        {quotation.destination || "-"}
      </p>

      <hr />

      {/* Services */}

      <h3>Travel Services</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <th
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Service
            </th>

            <th
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "right",
              }}
            >
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map(([service, amount]) => (
            <tr key={service}>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {service}
              </td>

              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "right",
                }}
              >
                ₹{" "}
                {Number(amount || 0).toLocaleString(
                  "en-IN"
                )}
              </td>
            </tr>
          ))}

          <tr
            style={{
              fontWeight: "bold",
              background: "#f1f5f9",
            }}
          >
            <td
              style={{
                padding: "14px",
                border: "1px solid #ddd",
              }}
            >
              Grand Total
            </td>

            <td
              style={{
                padding: "14px",
                border: "1px solid #ddd",
                textAlign: "right",
                color: "#2563eb",
                fontSize: "18px",
              }}
            >
              ₹{" "}
              {Number(
                quotation.total_amount || 0
              ).toLocaleString("en-IN")}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Status */}

      <p style={{ marginTop: "20px" }}>
        <strong>Status:</strong>{" "}
        {quotation.status || "Draft"}
      </p>

      {/* Notes */}

      {quotation.notes && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            background: "#f8fafc",
            borderRadius: "8px",
          }}
        >
          <strong>Notes:</strong>

          <p>{quotation.notes}</p>
        </div>
      )}

      <p style={{ marginTop: "25px" }}>
        Thank you for choosing
        <strong> NR Tours & Travels.</strong>
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => window.print()}
      >
        🖨️ Print Quotation
      </button>
    </div>
  );
}

