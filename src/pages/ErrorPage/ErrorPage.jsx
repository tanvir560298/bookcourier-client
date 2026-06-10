import { Link } from "react-router";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="max-w-xl rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <FiBookOpen className="text-3xl" />
        </div>
        <h1 className="mt-6 text-7xl font-black text-amber-600">404</h1>
        <h2 className="mt-4 text-3xl font-black">Page Not Found</h2>
        <p className="mt-3 text-base-content/60">
          This page may have moved, or the book you are looking for is on
          another shelf.
        </p>
        <Link to="/" className="btn mt-8 border-none bg-amber-600 text-white">
          <FiArrowLeft />
          Back To Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
