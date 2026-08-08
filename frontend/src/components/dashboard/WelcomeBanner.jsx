export default function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl mb-8">

      <h1 className="text-3xl font-bold">
        Welcome Back, Administrator 👋
      </h1>

      <p className="mt-3 text-blue-100 text-lg">
        Manage your travel business, bookings, leads and operations from one dashboard.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
          ➕ Add New Lead
        </button>

        <button className="bg-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
          📅 View Bookings
        </button>

      </div>

    </div>
  );
}