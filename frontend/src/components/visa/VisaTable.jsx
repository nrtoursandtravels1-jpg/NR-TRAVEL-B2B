import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function VisaTable({
  refresh,
  setSelectedVisa,
}) {
  const [visas, setVisas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisas();
  }, [refresh]);

  async function fetchVisas() {
    setLoading(true);

    const { data, error } = await supabase
      .from("visa_applications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
    } else {
      setVisas(data || []);
    }

    setLoading(false);
  }

  async function deleteVisa(id) {
    if (!window.confirm("Delete this visa application?")) return;

    const { error } = await supabase
      .from("visa_applications")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Visa application deleted successfully.");

    fetchVisas();
  }

  const filtered = visas.filter((visa) =>
    (
      (visa.applicant_name || "") +
      " " +
      (visa.mobile || "") +
      " " +
      (visa.destination_country || "") +
      " " +
      (visa.passport_number || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading Visa Applications...</h3>;
  }

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>Visa Applications</h2>

      <input
        type="text"
        placeholder="Search Applicant / Passport / Country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th>Applicant</th>
            <th>Passport</th>
            <th>Country</th>
            <th>Visa Type</th>
            <th>Fee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((visa) => (
              <tr
                key={visa.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td>{visa.applicant_name}</td>

                <td>{visa.passport_number}</td>

                <td>{visa.destination_country}</td>

                <td>{visa.visa_type}</td>

                <td>₹ {visa.visa_fee}</td>

                <td>{visa.visa_status}</td>

                <td>
                  <button
                    onClick={() => setSelectedVisa(visa)}
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteVisa(visa.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Visa Applications Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}