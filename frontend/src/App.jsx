import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Main Pages
import Landingpage from "./pages/Landingpage";
import Dashboard from "./pages/Dashboard";
import Train from "./pages/Train";
import Visa from "./pages/Visa";
import CRM from "./pages/CRM";
import AddLead from "./pages/AddLead";
import Leads from "./pages/Lead";
import Hotel from "./pages/Hotel";
import Destinations from "./pages/Destinations";
import Partners from "./pages/Partners";
import Register from "./pages/Register";

// Authentication
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import AgentLogin from "./pages/auth/AgentLogin";
import CustomerLogin from "./pages/auth/CustomerLogin";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Customers from "./pages/admin/Customers";
import Subscriptions from "./pages/admin/Subscriptions";

// Agent
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentProfile from "./pages/agent/AgentProfile";

// Customer
import CustomerDashboard from "./pages/customer/CustomerDashboard";

// Booking
import Bookings from "./pages/booking/Bookings";
import Invoice from "./pages/Invoice";

// Operations
import OperationsDashboard from "./pages/operations/OperationsDashboard";
import OperationsBookings from "./pages/operations/Bookings";
import Itinerary from "./pages/operations/Itinerary";
import Vendors from "./pages/operations/Vendors";
import Documents from "./pages/operations/Documents";

// Packages
import Packages from "./pages/Packages/Packages";
import CreatePackage from "./pages/Packages/CreatePackage";
import EditPackage from "./pages/Packages/EditPackage";
import UpcomingTours from "./pages/Packages/UpcomingTours";
import GroupTours from "./pages/Packages/GroupTours";
import GirlsOnlyTours from "./pages/Packages/GirlsOnlyTours";
import FamilyTours from "./pages/Packages/FamilyTours";
import CustomTours from "./pages/Packages/CustomTours";
import ViewPackage from "./pages/Packages/ViewPackage";

// Reports
import Reports from "./pages/reports/Reports";

// Settings
import Settings from "./pages/settings/Settings";

// Subscription
import UpgradePlan from "./pages/subscription/UpgradePlan";

function App() {
  return (
      
      <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">

        <Navbar />

        <Suspense
          fallback={
            <div className="p-8 text-center">
              Loading...
            </div>
          }
        >
          <Routes>

            {/* ================= HOME ================= */}

            <Route path="/" element={<Landingpage />} />
            <Route path="/train" element={<Train />} />
            <Route path="/visa" element={<Visa />} />
            {/* ================= AUTH ================= */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/customer-login" element={<CustomerLogin />} />

            {/* ================= DASHBOARD ================= */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ================= ADMIN ================= */}

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/subscriptions"
              element={
                <ProtectedRoute>
                  <Subscriptions />
                </ProtectedRoute>
              }
            />

            {/* ================= AGENT ================= */}

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

            {/* ================= CUSTOMER ================= */}

            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ================= LEADS CRM ================= */}

            <Route
              path="/crm"
              element={
                <ProtectedRoute>
                  <CRM />
                </ProtectedRoute>
              }
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

            {/* ================= HOTEL ================= */}

            <Route
              path="/hotel"
              element={
                <ProtectedRoute>
                  <Hotel />
                </ProtectedRoute>
              }
            />

            {/* ================= BOOKINGS ================= */}

            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />

            <Route path="/invoice" element={<Invoice />} />
            
            <Route
              path="/operations/bookings"
              element={
                <ProtectedRoute>
                  <OperationsBookings />
                </ProtectedRoute>
              }
            />

            {/* ================= PACKAGES ================= */}

            <Route
              path="/packages"
              element={
                <ProtectedRoute>
                  <Packages />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/create"
              element={
                <ProtectedRoute>
                  <CreatePackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/view/:id"
              element={<ViewPackage />}
            />


            <Route
              path="/packages/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPackage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/upcoming"
              element={
                <ProtectedRoute>
                  <UpcomingTours />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/group"
              element={
                <ProtectedRoute>
                  <GroupTours />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/girls-only"
              element={
                <ProtectedRoute>
                  <GirlsOnlyTours />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/family"
              element={
                <ProtectedRoute>
                  <FamilyTours />
                </ProtectedRoute>
              }
            />

            <Route
              path="/packages/custom"
              element={
                <ProtectedRoute>
                  <CustomTours />
                </ProtectedRoute>
              }
            />

            {/* ================= OPERATIONS ================= */}

            <Route
              path="/operations"
              element={
                <ProtectedRoute>
                  <OperationsDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/operations/itinerary"
              element={
                <ProtectedRoute>
                  <Itinerary />
                </ProtectedRoute>
              }
            />

            <Route
              path="/operations/vendors"
              element={
                <ProtectedRoute>
                  <Vendors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/operations/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />

            {/* ================= REPORTS ================= */}

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            {/* ================= SETTINGS ================= */}

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* ================= OTHER ================= */}

            <Route
              path="/partners"
              element={
                <ProtectedRoute>
                  <Partners />
                </ProtectedRoute>
              }
            />

            <Route
              path="/destinations"
              element={
                <ProtectedRoute>
                  <Destinations />
                </ProtectedRoute>
              }
            />

            <Route
              path="/upgrade-plan"
              element={
                <ProtectedRoute>
                  <UpgradePlan />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Suspense>

        <Footer />

      </div>

      );
}

export default App;