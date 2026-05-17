const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Fast Delivery",
      description: "Get books delivered quickly to your location.",
    },
    {
      id: 2,
      title: "Trusted Libraries",
      description: "Connected with reliable libraries and readers.",
    },
    {
      id: 3,
      title: "Easy Borrowing",
      description: "Simple and smooth borrowing experience.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-5xl font-extrabold">
          Why Choose{" "}
          <span className="text-amber-600">BookCourier</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Experience a smarter way to borrow books.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-base-200 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold">
              {feature.title}
            </h3>

            <p className="text-gray-500 mt-5 leading-8">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;