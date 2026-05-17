import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-amber-600">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="btn bg-amber-600 text-white border-none mt-8"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;