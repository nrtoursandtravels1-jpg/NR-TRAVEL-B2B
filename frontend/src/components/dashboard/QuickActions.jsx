const actions = [
  { title: "👥 Add Lead", color: "bg-blue-600" },
  { title: "🏨 Add Hotel", color: "bg-green-600" },
  { title: "🧳 Create Tour Package", color: "bg-purple-600" },
  { title: "🚌 Bus Booking", color: "bg-orange-500" },
  { title: "🚗 Cab Booking", color: "bg-cyan-600" },
  { title: "✈️ Flight Booking", color: "bg-red-600" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {actions.map((action) => (
          <button
            key={action.title}
            className={`${action.color} text-white rounded-xl p-5 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300`}
          >
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
}