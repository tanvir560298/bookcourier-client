import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/latest-books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-5xl font-extrabold">
          Latest <span className="text-amber-600">Books</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Discover the newest books added by our libraries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {books.map((book) => (
          <div
            key={book._id}
            className="rounded-3xl overflow-hidden shadow-xl group bg-base-100 border"
          >
            <div className="h-80 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-6 bg-base-200">
              <div className="badge badge-warning text-black mb-3">
                {book.category}
              </div>

              <h3 className="text-2xl font-bold">{book.title}</h3>

              <p className="text-gray-500 mt-2">By {book.author}</p>

              <p className="font-bold text-amber-600 mt-2">
                Price: ${book.price || 0}
              </p>

              <Link
                to={`/books/${book._id}`}
                className="btn bg-amber-600 text-white border-none w-full mt-5"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;