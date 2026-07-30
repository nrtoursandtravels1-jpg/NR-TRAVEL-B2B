import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

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

// CRM
import CRM from "./pages/CRM";
import AddLead from "./pages/AddLead";
import Leads from "./pages/Lead";
import Hotel from "./pages/Hotel";

// Packages
import Packages from "./pages/Packages/Packages";
import CreatePackage from "./pages/Packages/CreatePackage";
import EditPackage from "./pages/Packages/EditPackage";

// Operations
import OperationsDashboard from "./pages/operations/OperationsDashboard";
import OperationsBookings from "./pages/operations/Bookings";
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

        <Suspense
          fallback={
            <div style={{ padding: "30px" }}>
              Loading...
            </div>
          }
        >
          <Routes>

            {/* HOME */}
            <Route path="/" element={<Landingpage />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/customers" element={<Customers />} />

            <Route
              path="/admin/subscriptions"
              element={
                <ProtectedRoute>
                  <Subscriptions />
                </ProtectedRoute>
              }
            />

            {/* AGENT */}
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

            {/* CUSTOMER */}
            <Route
              path="/customer-dashboard"
              element={<CustomerDashboard />}
            />

            {/* CRM */}
            <Route path="/crm" element={<CRM />} />

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

            <Route path="/hotel" element={<Hotel />} />

            {/* BOOKINGS */}
            <Route path="/bookings" element={<Bookings />} />
            <Route
              path="/operations/bookings"
              element={<OperationsBookings />}
            />

            {/* PACKAGES */}
            <Route path="/packages" element={<Packages />} />
            <Route
              path="/packages/create"
              element={<CreatePackage />}
            />
            <Route
              path="/packages/edit/:id"
              element={<EditPackage />}
            />

            {/* OPERATIONS */}
            <Route
              path="/operations"
              element={<OperationsDashboard />}
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

            {/* REPORTS */}
            <Route path="/reports" element={<Reports />} />

            {/* SETTINGS */}
            <Route path="/settings" element={<Settings />} />

            {/* DESTINATIONS */}
            <Route
              path="/destinations"
              element={<Destinations />}
            />

            {/* SUBSCRIPTION */}
            <Route
              path="/upgrade-plan"
              element={<UpgradePlan />}
            />

          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;