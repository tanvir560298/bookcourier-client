const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      review:
        "BookCourier made borrowing books incredibly easy and fast.",
    },
    {
      id: 2,
      name: "Tanvir Hasan",
      review:
        "The dashboard and delivery system feel very smooth and modern.",
    },
    {
      id: 3,
      name: "Rakib Hossain",
      review:
        "I loved the UI and the borrowing experience was excellent.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-5xl font-extrabold">
          User <span className="text-amber-600">Reviews</span>
        </h2>

        <p className="text-gray-500 mt-4">
          What our readers say about us.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-base-200 p-8 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold">
              {review.name}
            </h3>

            <p className="text-gray-500 mt-4 leading-8">
              "{review.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;