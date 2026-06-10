import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiCode,
  FiCompass,
  FiCpu,
  FiTrendingUp,
} from "react-icons/fi";

const categoryMeta = {
  Programming: {
    tags: "Algorithms, Web Dev, AI",
    icon: FiCode,
    accent: "from-sky-500 to-indigo-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
  },
  "Self Development": {
    tags: "Mindset, Habits, Focus",
    icon: FiTrendingUp,
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  Business: {
    tags: "Finance, Startups, Strategy",
    icon: FiBriefcase,
    accent: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  Science: {
    tags: "Physics, Biology, Astronomy",
    icon: FiCpu,
    accent: "from-violet-500 to-fuchsia-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  History: {
    tags: "Civilizations, Wars, Empires",
    icon: FiBookOpen,
    accent: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  Productivity: {
    tags: "Time management, Focus, Flow",
    icon: FiClock,
    accent: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
  },
};

const fallbackCategories = Object.keys(categoryMeta);

const Categories = () => {
  const [books, setBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Programming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const names = new Set(fallbackCategories);
    books.forEach((book) => {
      if (book.category) names.add(book.category);
    });

    return [...names].slice(0, 6).map((name) => {
      const meta = categoryMeta[name] || {
        tags: "Fresh picks from the catalog",
        icon: FiCompass,
        accent: "from-slate-600 to-slate-900",
        bg: "bg-slate-100",
        text: "text-slate-700",
      };

      const categoryBooks = books.filter((book) => book.category === name);

      return {
        name,
        count: categoryBooks.length,
        preview: categoryBooks.slice(0, 3),
        ...meta,
      };
    });
  }, [books]);

  const activeData =
    categories.find((category) => category.name === activeCategory) ||
    categories[0];

  useEffect(() => {
    if (!activeData) return;
    setActiveCategory(activeData.name);
  }, [activeData]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Curated shelves
        </span>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Explore Popular <span className="text-amber-600">Categories</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-base-content/60">
          Move from broad browsing to a focused shelf. Pick a category, preview
          what is available, then jump into the full book collection.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.name === activeCategory;

          return (
            <button
              type="button"
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isActive
                  ? "border-amber-400 bg-base-100 shadow-md"
                  : "border-base-300 bg-base-100/70"
              }`}
            >
              {isActive && (
                <span
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category.accent}`}
                />
              )}

              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.bg} ${category.text} transition group-hover:scale-110`}
              >
                <Icon className="text-xl" />
              </span>

              <h3 className="mt-4 text-sm font-extrabold leading-tight">
                {category.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-base-content/45">
                {loading ? "Loading..." : `${category.count} books available`}
              </p>
              <p className="mt-3 border-t border-base-300 pt-3 text-xs leading-5 text-base-content/55">
                {category.tags}
              </p>
            </button>
          );
        })}
      </div>

      {activeData && (
        <div className="mt-10 overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className={`h-2 bg-gradient-to-r ${activeData.accent}`} />

          <div className="grid gap-8 p-6 lg:grid-cols-12 lg:p-8">
            <div className="lg:col-span-4">
              <p className="text-sm font-bold uppercase tracking-wide text-base-content/45">
                Selected shelf
              </p>
              <h3 className="mt-2 text-3xl font-black">{activeData.name}</h3>
              <p className="mt-3 text-sm leading-6 text-base-content/60">
                {activeData.tags}. This shelf currently has{" "}
                <span className="font-bold text-base-content">
                  {activeData.count}
                </span>{" "}
                matching books in the catalog.
              </p>

              <Link
                to={`/books?search=${encodeURIComponent(activeData.name)}`}
                className="btn mt-6 bg-slate-950 text-white hover:bg-amber-600"
              >
                Explore This Shelf
                <FiArrowRight />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <FiBarChart2 className="text-amber-600" />
                  Available now
                </div>
                <span className="badge badge-outline">
                  Backend data
                </span>
              </div>

              {loading ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="skeleton h-44 rounded-2xl" />
                  ))}
                </div>
              ) : activeData.preview.length ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {activeData.preview.map((book) => (
                    <Link
                      to={`/books/${book._id}`}
                      key={book._id}
                      className="group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="p-4">
                        <h4 className="line-clamp-1 font-bold">
                          {book.title}
                        </h4>
                        <p className="mt-1 text-xs text-base-content/55">
                          By {book.author || "BookCourier library"}
                        </p>
                        <p className="mt-3 text-sm font-extrabold text-amber-600">
                          ${book.price || 0}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-base-300 p-8 text-center">
                  <p className="font-bold">No books in this shelf yet.</p>
                  <p className="mt-1 text-sm text-base-content/60">
                    Add a book in this category and it will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;
