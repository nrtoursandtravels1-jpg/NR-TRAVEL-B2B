import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>NR Tours CRM</h2>

      <hr />

      <ul style={{ listStyle: "none", padding: 0 }}>

        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </li>


        {/* B2B Agent */}
        <li>
          <Link
            to="/agent-profile"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Agent Profile
          </Link>
        </li>


        {/* CRM */}
        <li>
          <Link
            to="/crm"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Leads CRM
          </Link>
        </li>


        {/* Operations */}
        <li>
          <Link
            to="/operations"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Operations Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/operations/bookings"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Bookings
          </Link>
        </li>

        <li>
          <Link
            to="/operations/itinerary"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Itinerary
          </Link>
        </li>

        <li>
          <Link
            to="/operations/vendors"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Vendors
          </Link>
        </li>

        <li>
          <Link
            to="/operations/documents"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Documents
          </Link>
        </li>


        {/* Travel Modules */}
        <li>
          <Link
            to="/hotel"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Hotels
          </Link>
        </li>


        <li>
          <Link
            to="/packages"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Packages
          </Link>
        </li>


        <li>
          <Link
            to="/partners"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Partners
          </Link>
        </li>


        {/* Reports */}
        <li>
          <Link
            to="/reports"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Reports
          </Link>
        </li>


        {/* Admin Settings */}
        <li>
          <Link
            to="/settings"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Settings
          </Link>
        </li>


        {/* Website */}
        <li>
          <Link
            to="/"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Website
          </Link>
        </li>


      </ul>

    </div>
  );
}

export default Sidebar;