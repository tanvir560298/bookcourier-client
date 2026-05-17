import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-extrabold">
            Book<span className="text-amber-600">Courier</span>
          </h2>

          <p className="text-gray-500 mt-5 leading-8">
            Borrow books from nearby libraries and enjoy a seamless reading
            experience with fast delivery.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-3 text-gray-500">
            <p>Dhaka, Bangladesh</p>
            <p>support@bookcourier.com</p>
            <p>+880 1234-567890</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-5">
            Newsletter
          </h3>

          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full"
          />

          <button className="btn bg-amber-600 text-white border-none w-full mt-4">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t py-5 text-center text-gray-500">
        © 2026 BookCourier. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;