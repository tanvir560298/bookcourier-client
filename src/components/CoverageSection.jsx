const CoverageSection = () => {
  const cities = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-extrabold leading-tight">
            Delivery Coverage Across{" "}
            <span className="text-amber-600">Major Cities</span>
          </h2>

          <p className="text-gray-500 mt-5 leading-8">
            BookCourier currently supports book pickup and home delivery in
            major library zones. Users can request books from nearby libraries
            and receive them at their doorstep.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {cities.map((city) => (
              <div
                key={city}
                className="p-4 rounded-2xl bg-base-200 font-semibold text-center shadow"
              >
                📍 {city}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-200 rounded-3xl p-6 shadow-xl">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-center p-8">
            <div>
              <h3 className="text-4xl font-extrabold text-amber-700">
                Bangladesh Coverage Map
              </h3>

              <p className="text-gray-700 mt-4">
                Dhaka • Chattogram • Sylhet • Rajshahi • Khulna • Barishal
              </p>

              <div className="mt-6 text-6xl">🗺️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;