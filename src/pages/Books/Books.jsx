import { Link } from "react-router";
import { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/books?search=${search}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, [search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h2 className="text-5xl font-extrabold">
          Explore <span className="text-amber-600">Books</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Browse popular books from nearby libraries.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10 grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search books by title..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-warning"></span>
        </div>
      ) : books.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold mb-4">No Books Found</h2>
            <p className="text-gray-500">Try searching with another title.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {books.map((book) => (
            <div
              key={book._id}
              className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden border"
            >
              <figure className="h-72 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </figure>

              <div className="card-body">
                <div className="badge badge-warning text-black">
                  {book.category}
                </div>

                <h2 className="card-title text-2xl mt-3">{book.title}</h2>

                <p className="text-gray-500">By {book.author}</p>

                <p className="font-bold text-amber-600 text-lg">
                  Price: ${book.price || 0}
                </p>

                <div className="card-actions mt-5">
                  <Link
                    to={`/books/${book._id}`}
                    className="btn bg-amber-600 text-white border-none w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;