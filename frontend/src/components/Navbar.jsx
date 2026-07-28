import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-amber-400">
          NR Tours & Travels
        </h1>

        {/* Menu */}
        <div className="flex gap-6 text-white font-medium">
          <Link to="/" className="hover:text-amber-400">Home</Link>
          <Link to="/hotel" className="hover:text-amber-400">Hotels</Link>
          <Link to="/dashboard" className="hover:text-amber-400">Dashboard</Link>
          <Link to="/login" className="hover:text-amber-400">Login</Link>
          <Link to="/register" className="bg-amber-500 px-4 py-2 rounded-lg hover:bg-amber-600">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;