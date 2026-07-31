export default function QuotationPreview() {
  return (
    <div
      style={{
        background: "#ffffff",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        📄 Quotation Preview
      </h2>

      <hr />

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h3>NR Tours & Travels</h3>

        <p>
          Professional Travel Solutions
        </p>

        <p>
          📞 +91 XXXXX XXXXX
        </p>

        <p>
          📧 info@nrtours.com
        </p>

        <hr />

        <h3>Customer Details</h3>

        <p>Name : ________________________</p>

        <p>Destination : ________________________</p>

        <p>Travel Date : ________________________</p>

        <hr />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
          border="1"
          cellPadding="10"
        >
          <thead
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <tr>
              <th>Service</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Hotel</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Flight</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Train</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Bus</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Cab</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Visa</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Package</td>
              <td>₹ ______</td>
            </tr>

            <tr>
              <td>Other</td>
              <td>₹ ______</td>
            </tr>

            <tr
              style={{
                fontWeight: "bold",
                background: "#f1f5f9",
              }}
            >
              <td>Total</td>
              <td>₹ ______</td>
            </tr>
          </tbody>
        </table>

        <br />

        <p>
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
    </div>
  );
}