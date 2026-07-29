import { BrowserRouter, Routes, Route } from "react-router-dom";


// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";


// Main
import Landingpage from "./pages/Landingpage";


// Authentication
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import AgentLogin from "./pages/auth/AgentLogin";
import CustomerLogin from "./pages/auth/CustomerLogin";
import Register from "./pages/Register";


// Dashboards
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentProfile from "./pages/agent/AgentProfile";
import CustomerDashboard from "./pages/customer/CustomerDashboard";


// CRM
import CRM from "./pages/CRM";
import AddLead from "./pages/AddLead";
import Leads from "./pages/Lead";
import Hotel from "./pages/Hotel";


// Packages
import Packages from "./pages/Packages/Packages";
import CreatePackage from "./pages/Packages/CreatePackage";
import EditPackage from "./pages/Packages/EditPackage";
import UpcomingTours from "./pages/Packages/UpcomingTours";
import GroupTours from "./pages/Packages/GroupTours";
import GirlsOnlyTours from "./pages/Packages/GirlsOnlyTours";
import FamilyTours from "./pages/Packages/FamilyTours";
import CustomTours from "./pages/Packages/CustomTours";


// Operations
import OperationsDashboard from "./pages/operations/OperationsDashboard";
import Bookings from "./pages/operations/Bookings";
import Itinerary from "./pages/operations/Itinerary";
import Vendors from "./pages/operations/Vendors";
import Documents from "./pages/operations/Documents";


// Reports
import Reports from "./pages/reports/Reports";


// Settings
import Settings from "./pages/settings/Settings";


// Other
import Destinations from "./pages/Destinations";


// Subscription
import UpgradePlan from "./pages/subscription/UpgradePlan";



function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-slate-900 text-white">


        <Navbar />


        <Routes>



          {/* Website */}

          <Route
            path="/"
            element={<Landingpage />}
          />



          {/* Authentication */}

          <Route
            path="/login"
            element={<Login />}
          />


          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />


          <Route
            path="/agent-login"
            element={<AgentLogin />}
          />


          <Route
            path="/customer-login"
            element={<CustomerLogin />}
          />


          <Route
            path="/register"
            element={<Register />}
          />




          {/* Dashboards */}


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />



          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />



          <Route
            path="/admin/users"
            element={<Users />}
          />



          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRoute>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />



          <Route
            path="/agent-profile"
            element={
              <ProtectedRoute>
                <AgentProfile />
              </ProtectedRoute>
            }
          />



          <Route
            path="/customer-dashboard"
            element={<CustomerDashboard />}
          />




          {/* CRM */}


          <Route
            path="/crm"
            element={<CRM />}
          />



          <Route
            path="/add-lead"
            element={
              <ProtectedRoute>
                <AddLead />
              </ProtectedRoute>
            }
          />



          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />



          <Route
            path="/hotel"
            element={<Hotel />}
          />




          {/* Packages */}


          <Route
            path="/packages"
            element={<Packages />}
          />


          <Route
            path="/packages/create"
            element={<CreatePackage />}
          />


          <Route
            path="/packages/edit/:id"
            element={<EditPackage />}
          />


          <Route
            path="/packages/upcoming"
            element={<UpcomingTours />}
          />


          <Route
            path="/packages/group"
            element={<GroupTours />}
          />


          <Route
            path="/packages/girls"
            element={<GirlsOnlyTours />}
          />


          <Route
            path="/packages/family"
            element={<FamilyTours />}
          />


          <Route
            path="/packages/custom"
            element={<CustomTours />}
          />




          {/* Operations */}


          <Route
            path="/operations"
            element={<OperationsDashboard />}
          />


          <Route
            path="/operations/bookings"
            element={<Bookings />}
          />


          <Route
            path="/operations/itinerary"
            element={<Itinerary />}
          />


          <Route
            path="/operations/vendors"
            element={<Vendors />}
          />


          <Route
            path="/operations/documents"
            element={<Documents />}
          />




          {/* Reports */}


          <Route
            path="/reports"
            element={<Reports />}
          />




          {/* Settings */}


          <Route
            path="/settings"
            element={<Settings />}
          />




          {/* Destinations */}


          <Route
            path="/destinations"
            element={<Destinations />}
          />




          {/* Subscription */}


          <Route
            path="/upgrade-plan"
            element={<UpgradePlan />}
          />



        </Routes>



        <Footer />


      </div>


    </BrowserRouter>

  );

}


export default App;