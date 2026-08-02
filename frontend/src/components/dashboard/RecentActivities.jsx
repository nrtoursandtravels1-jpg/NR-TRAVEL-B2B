export default function RecentActivities() {
  const activities = [
    {
      icon: "👥",
      title: "New Lead Added",
      description: "Rahul Sharma - Goa Package",
      time: "5 min ago",
      color: "#2563EB",
    },
    {
      icon: "🏨",
      title: "Hotel Added",
      description: "The Royal Palace Hotel",
      time: "20 min ago",
      color: "#16A34A",
    },
    {
      icon: "📦",
      title: "Package Created",
      description: "Dubai Luxury Tour",
      time: "1 hour ago",
      color: "#9333EA",
    },
    {
      icon: "🚌",
      title: "Bus Booking",
      description: "Delhi → Manali",
      time: "2 hours ago",
      color: "#EA580C",
    },
    {
      icon: "🚗",
      title: "Cab Assigned",
      description: "Toyota Innova",
      time: "3 hours ago",
      color: "#0891B2",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        marginTop: "30px",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(15,23,42,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#0F172A",
            }}
          >
            🕒 Recent Activities
          </h2>

          <p
            style={{
              color: "#64748B",
              marginTop: "8px",
            }}
          >
            Latest updates from your Travel ERP
          </p>
        </div>

        <button
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          View All
        </button>
      </div>

      {activities.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 0",
            borderBottom:
              index !== activities.length - 1
                ? "1px solid #E2E8F0"
                : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: item.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                color: "#fff",
              }}
            >
              {item.icon}
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#0F172A",
                  fontSize: "17px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748B",
                }}
              >
                {item.description}
              </p>
            </div>
          </div>

          <span
            style={{
              color: "#94A3B8",
              fontSize: "14px",
            }}
          >
            {item.time}
          </span>
        </div>
      ))}
    </div>
  );
}