function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Explore the World with
          <span className="text-amber-400"> NR Tours & Travels</span>
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Hotels • Tours • Cabs • Bus Booking
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Destination"
            className="px-4 py-3 rounded-lg text-black w-64"
          />

          <input
            type="date"
            className="px-4 py-3 rounded-lg text-black"
          />

          <button className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg font-semibold">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;