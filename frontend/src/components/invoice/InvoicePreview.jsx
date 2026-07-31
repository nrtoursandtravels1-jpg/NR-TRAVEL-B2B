export default function InvoicePreview() {
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
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "5px",
          }}
        >
          NR Tours & Travels
        </h1>

        <p>Travel Management & B2B Solutions</p>

        <p>Ahmedabad, Gujarat</p>

        <p>📞 +91 XXXXX XXXXX</p>

        <p>✉ info@nrtours.com</p>
      </div>

      <hr />

      <h2>🧾 TAX INVOICE</h2>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <tbody>
          <tr>
            <td><strong>Invoice No</strong></td>
            <td>INV-XXXXXXXX</td>

            <td><strong>Date</strong></td>
            <td>DD/MM/YYYY</td>
          </tr>

          <tr>
            <td><strong>Customer</strong></td>
            <td>________________</td>

            <td><strong>Destination</strong></td>
            <td>________________</td>
          </tr>
        </tbody>
      </table>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Travel Services</td>
            <td>₹ ________</td>
          </tr>

          <tr>
            <td>GST</td>
            <td>₹ ________</td>
          </tr>

          <tr
            style={{
              fontWeight: "bold",
              background: "#f8fafc",
            }}
          >
            <td>Total Amount</td>
            <td>₹ ________</td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <h3>Terms & Conditions</h3>

        <ul>
          <li>Payment once received is non-refundable unless agreed.</li>
          <li>Kindly verify all travel details before confirmation.</li>
          <li>Subject to airline, hotel and supplier policies.</li>
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🖨 Print Invoice
        </button>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📄 Download PDF
        </button>
      </div>
    </div>