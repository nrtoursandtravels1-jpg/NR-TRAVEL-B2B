function UpcomingTours() {
  const tours = [
    {
      destination: "Goa",
      date: "12 Aug",
      seats: "18 Seats Left",
    },
    {
      destination: "Manali",
      date: "18 Aug",
      seats: "8 Seats Left",
    },
    {
      destination: "Dubai",
      date: "25 Aug",
      seats: "5 Seats Left",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        🧳 Upcoming Tours
      </h2>

      <div className="space-y-4">

        {tours.map((tour) => (
          <div
            key={tour.destination}
            className="flex justify-between items-center border-b border-slate-200 pb-4"
          >
            <div>
              <h3 className="font-semibold text-slate-800">
                {tour.destination}
              </h3>

              <p className="text-sm text-slate-500">
                Departure: {tour.date}
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {tour.seats}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default UpcomingTours;