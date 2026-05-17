const StatsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-base-200 rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-5xl font-extrabold text-amber-600">
            10K+
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Books Available
          </p>
        </div>

        <div className="bg-base-200 rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-5xl font-extrabold text-amber-600">
            5K+
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Active Readers
          </p>
        </div>

        <div className="bg-base-200 rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-5xl font-extrabold text-amber-600">
            150+
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Partner Libraries
          </p>
        </div>

        <div className="bg-base-200 rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-5xl font-extrabold text-amber-600">
            99%
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Satisfaction Rate
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;