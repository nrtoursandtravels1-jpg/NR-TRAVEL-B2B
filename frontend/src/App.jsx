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

// Tour Package Pages
import Packages from "./pages/Packages/Packages";
import CreatePackage from "./pages/Packages/CreatePackage";
import EditPackage from "./pages/Packages/EditPackage";
import UpcomingTours from "./pages/Packages/UpcomingTours";
import GroupTours from "./pages/Packages/GroupTours";
import GirlsOnlyTours from "./pages/Packages/GirlsOnlyTours";
import FamilyTours from "./pages/Packages/FamilyTours";
import CustomTours from "./pages/Packages/CustomTours";

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

          {/* Tour Package Management */}
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/create" element={<CreatePackage />} />
          <Route path="/packages/edit/:id" element={<EditPackage />} />
          <Route path="/packages/upcoming" element={<UpcomingTours />} />
          <Route path="/packages/group" element={<GroupTours />} />
          <Route path="/packages/girls" element={<GirlsOnlyTours />} />
          <Route path="/packages/family" element={<FamilyTours />} />
          <Route path="/packages/custom" element={<CustomTours />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;