import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function HotelCards() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    cities: 0,
  });

  useEffect(() => {
    fetchHotelStats();
  }, []);

  async function fetchHotelStats() {
    const { data, error } = await supabase
      .from("hotels")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setStats({
      total: data.length,
      active: data.filter(
        (h) => h.status === "Active"
      ).length,
      inactive: data.filter(
        (h) => h.status === "Inactive"
      ).length,
      cities: [...new Set(data.map((h) => h.city))]
        .length,
    });
  }

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const valueStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "8px",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(240px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <div>
          <h4>Total Hotels</h4>
          <div style={valueStyle}>
            {stats.total}
          </div>
        </div>

        <Building2
          size={42}
          color="#2563eb"
        />
      </div>

      <div style={cardStyle}>
        <div>
          <h4>Active Hotels</h4>
          <div
            style={{
              ...valueStyle,
              color: "#16a34a",
            }}
          >
            {stats.active}
          </div>
        </div>

        <CheckCircle
          size={42}
          color="#16a34a"
        />
      </div>

      <div style={cardStyle}>
        <div>
          <h4>Inactive Hotels</h4>
          <div
            style={{
              ...valueStyle,
              color: "#dc2626",
            }}
          >
            {stats.inactive}
          </div>
        </div>

        <XCircle
          size={42}
          color="#dc2626"
        />
      </div>

      <div style={cardStyle}>
        <div>
          <h4>Cities Covered</h4>
          <div
            style={{
              ...valueStyle,
              color: "#7c3aed",
            }}
          >
            {stats.cities}
          </div>
        </div>

        <MapPin
          size={42}
          color="#7c3aed"
        />
      </div>
    </div>
  );
}