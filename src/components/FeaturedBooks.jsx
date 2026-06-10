import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiArrowRight, FiBookOpen, FiRefreshCw, FiStar } from "react-icons/fi";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBooks = () => {
    setLoading(true);
    setError("");

    fetch(`${import.meta.env.VITE_API_URL}/latest-books`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load latest books");
        }

        return data;
      })
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => {
        setBooks([]);
        setError(err.message || "Failed to load latest books");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes featuredRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .featured-rise {
          animation: featuredRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Recent additions
        </span>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Discover Latest <span className="text-amber-600">Books</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-base-content/60">
          Explore the newest titles added by partner libraries and available
          for BookCourier delivery.
        </p>
      </div>

      {loading ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-base-300 bg-base-100 p-4"
            >
              <div className="skeleton h-72 w-full rounded-2xl" />
              <div className="mt-5 skeleton h-5 w-24" />
              <div className="mt-4 skeleton h-7 w-3/4" />
              <div className="mt-3 skeleton h-4 w-1/2" />
              <div className="mt-6 skeleton h-12 w-full rounded-2xl" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <FiRefreshCw className="text-2xl" />
          </div>
          <h3 className="mt-5 text-2xl font-black">Latest books unavailable</h3>
          <p className="mt-2 text-sm text-base-content/60">{error}</p>
          <button onClick={loadBooks} className="btn mt-6 bg-amber-600 text-white">
            Try Again
          </button>
        </div>
      ) : books.length === 0 ? (
        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-base-300 bg-base-100 p-8 text-center">
          <FiBookOpen className="mx-auto text-4xl text-amber-600" />
          <h3 className="mt-4 text-2xl font-black">No latest books yet</h3>
          <p className="mt-2 text-sm text-base-content/60">
            Add books from the dashboard and they will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <article
              key={book._id}
              className="featured-rise group flex overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex w-full flex-col">
                <div className="relative h-72 overflow-hidden bg-base-200">
                  <img
                    src={book.image}
                    alt={book.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

                  <span className="absolute right-4 top-4 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                    {book.available === false ? "Unavailable" : "Available"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="badge badge-outline">
                      {book.category || "Library book"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-600">
                      <FiStar />
                      {book.rating || "4.7"}
                    </span>
                  </div>

                  <h3 className="line-clamp-1 text-2xl font-black transition group-hover:text-amber-600">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-sm text-base-content/55">
                    By {book.author || "Unknown author"}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-base-300 pt-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-base-content/40">
                        Courier fee
                      </p>
                      <p className="mt-1 text-xl font-black text-amber-600">
                        ${Number(book.price || 0).toFixed(2)}
                      </p>
                    </div>

                    <Link
                      to={`/books/${book._id}`}
                      className="btn bg-slate-950 text-white hover:bg-amber-600"
                    >
                      Details
                      <FiArrowRight className="transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedBooks;
