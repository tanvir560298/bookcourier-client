import { useEffect, useMemo, useState } from "react";
import { FiBookOpen, FiMapPin, FiShield, FiUsers } from "react-icons/fi";

const StatsSection = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/books`).then((res) => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/users`).then((res) => res.json()),
    ])
      .then(([booksData, usersData]) => {
        setBooks(Array.isArray(booksData) ? booksData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
      })
      .catch(() => {
        setBooks([]);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categoryCount = useMemo(() => {
    const categories = new Set(
      books.map((book) => book.category).filter(Boolean)
    );
    return categories.size;
  }, [books]);

  const stats = [
    {
      label: "Books Available",
      value: books.length,
      helper: `${categoryCount || 0} active categories`,
      icon: FiBookOpen,
      accent: "from-amber-500/15 to-orange-500/15 text-amber-600",
    },
    {
      label: "Active Readers",
      value: users.length,
      helper: "Registered community members",
      icon: FiUsers,
      accent: "from-sky-500/15 to-indigo-500/15 text-sky-600",
    },
    {
      label: "Coverage Cities",
      value: 6,
      helper: "Major Bangladesh hubs",
      icon: FiMapPin,
      accent: "from-emerald-500/15 to-teal-500/15 text-emerald-600",
    },
    {
      label: "Delivery Promise",
      value: "99%",
      helper: "Safe handoff target",
      icon: FiShield,
      accent: "from-rose-500/15 to-pink-500/15 text-rose-600",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes statsRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stats-rise {
          animation: statsRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="badge badge-warning font-bold uppercase tracking-wide">
            Platform pulse
          </span>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            BookCourier by the <span className="text-amber-600">numbers</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-base-content/60">
            A quick look at the catalog, readers, and delivery network powering
            the local library-to-door experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="stats-rise group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-base-300 transition group-hover:bg-amber-500" />

                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent}`}
                  >
                    <Icon className="text-2xl" />
                  </span>
                  <span className="rounded-full bg-base-200 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-base-content/45">
                    Live
                  </span>
                </div>

                {loading ? (
                  <>
                    <div className="skeleton mt-6 h-10 w-28" />
                    <div className="skeleton mt-3 h-5 w-36" />
                  </>
                ) : (
                  <>
                    <h3 className="mt-6 text-4xl font-black tracking-tight">
                      {typeof stat.value === "number" ? stat.value : stat.value}
                    </h3>
                    <p className="mt-2 font-bold">{stat.label}</p>
                    <p className="mt-1 text-sm text-base-content/55">
                      {stat.helper}
                    </p>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
