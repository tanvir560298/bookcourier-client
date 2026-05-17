const Categories = () => {
  const categories = [
    "Programming",
    "Self Development",
    "Business",
    "Science",
    "History",
    "Productivity",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-5xl font-extrabold">
          Popular <span className="text-amber-600">Categories</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Explore books by your favorite category.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mt-14">
        {categories.map((category, index) => (
          <button
            key={index}
            className="btn rounded-full px-8 bg-base-200 border-none hover:bg-amber-600 hover:text-white transition"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;