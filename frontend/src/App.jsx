import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// CRM Pages
import CRM from "./pages/CRM";
import AddLead from "./pages/AddLead";
import Hotel from "./pages/Hotel";

// Lead Components
import Leads from "./components/leads/Leads";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Landingpage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* CRM */}
          <Route path="/crm" element={<CRM />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/hotel" element={<Hotel />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;