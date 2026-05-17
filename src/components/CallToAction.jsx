import { Link } from "react-router";

const CallToAction = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-amber-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-5xl font-extrabold leading-tight">
          Ready To Start <br />
          Your Reading Journey?
        </h2>

        <p className="mt-6 text-lg max-w-2xl mx-auto">
          Discover thousands of books and borrow them easily through
          BookCourier.
        </p>

        <Link
          to="/books"
          className="btn btn-white bg-white text-black border-none mt-8"
        >
          Explore Books
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;