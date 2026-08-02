function RevenueCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-gray-100">
      <p className="text-gray-500 text-sm front-medium">
        💰 Monthly Revenue
              </p>

      <h1 className="text-4xl font-bold text-slate-800 mt-3">
        ₹8,75,000
      </h1>

     <div className="mt-4 flex items-center justify-between">
      <span className="text-green-600 font-semibold">
        ▲ +18%
      </span>

      <span className="text-gray-500 text-sm">
        vs Last Month
      </span>
     </div>
    </div>
  );
}

export default RevenueCard;