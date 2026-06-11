import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiRefreshCw,
  FiSearch,
  FiSliders,
  FiStar,
} from "react-icons/fi";

const fallbackCategories = [
  "Programming",
  "Self Development",
  "Business",
  "Science",
  "History",
  "Productivity",
  "Fiction",
];

const Books = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    limit: 8,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/book-categories`)
      .then((res) => res.json())
      .then((data) => {
        const merged = new Set([
          ...fallbackCategories,
          ...(Array.isArray(data) ? data : []),
        ]);
        setCategories([...merged]);
      })
      .catch(() => setCategories(fallbackCategories));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, sort, category, availability, minPrice, maxPrice]);

  useEffect(() => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: String(page),
      limit: "8",
    });

    if (search.trim()) params.set("search", search.trim());
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);
    if (availability) params.set("availability", availability);
    if (minPrice !== "") params.set("minPrice", minPrice);
    if (maxPrice !== "") params.set("maxPrice", maxPrice);

    fetch(
      `${import.meta.env.VITE_API_URL}/books?${params.toString()}`
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load books");
        }

        return data;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
          setPagination({ total: data.length, totalPages: 1, limit: 8 });
          return;
        }

        setBooks(Array.isArray(data.data) ? data.data : []);
        setPagination({
          total: data.total || 0,
          totalPages: data.totalPages || 1,
          limit: data.limit || 6,
        });
      })
      .catch((err) => {
        setBooks([]);
        setError(err.message || "Failed to load books");
      })
      .finally(() => setLoading(false));
  }, [availability, category, maxPrice, minPrice, page, search, sort]);

  const categoryCount = useMemo(() => {
    return new Set(books.map((book) => book.category).filter(Boolean)).size;
  }, [books]);

  const formatDate = (value) => {
    if (!value) return "Recently added";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recently added";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const hasActiveFilters =
    search || category || availability || minPrice || maxPrice || sort;

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setAvailability("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <span className="badge badge-warning font-bold uppercase tracking-wide">
              Book catalog
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Explore <span className="text-amber-600">Books</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/60">
              Search the BookCourier collection, compare courier fees, and open
              the details page when you are ready to request delivery.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <FiSearch className="text-base-content/40" />
              <input
                type="text"
                placeholder="Search title, author, category..."
                className="grow"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className="select select-bordered flex items-center gap-2 bg-base-200">
              <FiSliders className="text-base-content/40" />
              <select
                className="grow bg-transparent outline-none"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="">Default sorting</option>
                <option value="newest">Newest First</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </label>

            <select
              className="select select-bordered w-full bg-base-200"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full bg-base-200"
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
            >
              <option value="">All availability</option>
              <option value="available">Available only</option>
              <option value="unavailable">Unavailable only</option>
            </select>

            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <span className="text-sm font-bold text-base-content/45">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Minimum price"
                className="grow"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <span className="text-sm font-bold text-base-content/45">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Maximum price"
                className="grow"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-base-content/55">
          <span className="badge badge-outline">{pagination.total} books found</span>
          <span className="badge badge-outline">{categoryCount} categories</span>
          {search && <span className="badge badge-warning">Search: {search}</span>}
          {category && <span className="badge badge-warning">Category: {category}</span>}
          {sort && <span className="badge badge-warning">Sort: {sort}</span>}
          {availability && (
            <span className="badge badge-warning capitalize">
              {availability}
            </span>
          )}
          {minPrice && <span className="badge badge-warning">Min: ${minPrice}</span>}
          {maxPrice && <span className="badge badge-warning">Max: ${maxPrice}</span>}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn btn-ghost btn-xs"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="rounded-3xl border border-base-300 bg-base-100 p-4">
              <div className="skeleton h-72 rounded-2xl" />
              <div className="mt-5 skeleton h-5 w-24" />
              <div className="mt-4 skeleton h-7 w-3/4" />
              <div className="mt-3 skeleton h-4 w-1/2" />
              <div className="mt-4 skeleton h-16 w-full" />
              <div className="mt-6 skeleton h-12 w-full rounded-2xl" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
          <FiRefreshCw className="mx-auto text-5xl text-amber-600" />
          <h2 className="mt-5 text-3xl font-black">Books unavailable</h2>
          <p className="mt-2 text-base-content/60">{error}</p>
        </div>
      ) : books.length === 0 ? (
        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-base-300 bg-base-100 p-8 text-center">
          <FiBookOpen className="mx-auto text-5xl text-amber-600" />
          <h2 className="mt-5 text-3xl font-black">No Books Found</h2>
          <p className="mt-2 text-base-content/60">
            Try another title or clear your search.
          </p>
          {hasActiveFilters && (
            <button onClick={handleClearFilters} className="btn mt-6">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <article
              key={book._id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden bg-base-200">
                <img
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                  {book.available === false ? "Unavailable" : "Available"}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="badge badge-outline">
                  {book.category || "Library book"}
                </span>
                <h2 className="mt-4 line-clamp-2 min-h-[3.5rem] text-xl font-black leading-tight transition group-hover:text-amber-600">
                  {book.title}
                </h2>
                <p className="mt-2 text-sm text-base-content/55">
                  By {book.author || "Unknown author"}
                </p>

                <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-base-content/60">
                  {book.description ||
                    `${book.title} is available through the BookCourier catalog for library-to-door delivery requests.`}
                </p>

                <div className="mt-4 grid gap-2 text-xs text-base-content/55">
                  <p className="flex items-center gap-2">
                    <FiStar className="text-amber-600" />
                    Rating: {book.rating || "4.7"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiCalendar className="text-amber-600" />
                    Added: {formatDate(book.createdAt || book.updatedAt)}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMapPin className="text-amber-600" />
                    {book.library || "Dhaka Central Library"}
                  </p>
                </div>

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
                    View Details
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && books.length > 0 && pagination.totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(value - 1, 1))}
          >
            Previous
          </button>
          {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map(
            (item) => (
              <button
                key={item}
                className={`btn btn-sm ${
                  item === page ? "bg-amber-600 text-white" : ""
                }`}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            )
          )}
          <button
            className="btn btn-sm"
            disabled={page === pagination.totalPages}
            onClick={() =>
              setPage((value) => Math.min(value + 1, pagination.totalPages))
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Books;
