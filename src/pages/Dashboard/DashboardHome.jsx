import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FiActivity,
  FiBookOpen,
  FiClock,
  FiSearch,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { BarChart, LineChart, PieChart } from "../../components/DashboardCharts";

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

const DashboardHome = () => {
  const { user, token, handleAuthError } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [trackingSearch, setTrackingSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard-stats`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard data");
        }

        setDashboardData(data);
      } catch (err) {
        handleAuthError(err.message);
        setError(err.message || "Dashboard data failed to load");
      } finally {
        setLoading(false);
      }
    };

    if (token) loadDashboardData();
  }, [handleAuthError, token]);

  const cards = dashboardData?.cards || {};
  const charts = dashboardData?.charts || {};
  const recentBooks = dashboardData?.recent?.books || [];
  const recentOrders = dashboardData?.recent?.orders || [];
  const canManageItems = ["admin", "librarian"].includes(dashboardData?.role);

  const stats = [
    {
      label: "Total Books",
      value: cards.totalItems || 0,
      helper: "Available in the catalog",
      icon: FiBookOpen,
      accent: "text-amber-600 bg-amber-100",
    },
    {
      label: "Community Users",
      value: cards.totalUsers || 0,
      helper: "Registered readers",
      icon: FiUsers,
      accent: "text-sky-600 bg-sky-100",
    },
    {
      label: "Revenue",
      value: `$${Number(cards.revenue || 0).toFixed(2)}`,
      helper: "Paid order income",
      icon: FiShield,
      accent: "text-emerald-600 bg-emerald-100",
    },
    {
      label: "Orders / Activity",
      value: cards.totalOrders || 0,
      helper: `${cards.pendingOrders || 0} pending, ${cards.paidOrders || 0} paid`,
      icon: FiTruck,
      accent: "text-violet-600 bg-violet-100",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-900 p-6 text-white shadow-xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-amber-100">
            <FiActivity />
            BookCourier dashboard
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Welcome back, {user?.displayName || "Reader"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
            Track books, review catalog growth, and manage the people keeping
            the BookCourier library moving.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/books" className="btn border-none bg-white text-slate-950 hover:bg-amber-100">
              Explore Books
            </Link>
            <Link
              to={canManageItems ? "/dashboard/add-book" : "/dashboard/my-orders"}
              className="btn btn-outline border-white/40 text-white hover:bg-white hover:text-slate-950"
            >
              {canManageItems ? "Add New Book" : "View My Items"}
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <div className="alert alert-warning">
          <span>{error}</span>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-base-content/60">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <span className={`rounded-xl p-3 ${stat.accent}`}>
                  <Icon className="text-xl" />
                </span>
              </div>
              <p className="mt-4 text-sm text-base-content/60">{stat.helper}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <BarChart title="Books by Category" data={charts.bar || []} />
        <PieChart title="Order Status Split" data={charts.pie || []} />
        <LineChart title="Orders by Month" data={charts.line || []} className="xl:col-span-2" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Recent Books</h2>
              <p className="text-sm text-base-content/60">
                Latest catalog items from the backend.
              </p>
            </div>
            <Link
              to={dashboardData?.role === "admin" ? "/dashboard/manage-books" : "/books"}
              className="btn btn-sm btn-outline"
            >
              {dashboardData?.role === "admin" ? "Manage Books" : "Browse Books"}
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="skeleton h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : recentBooks.length ? (
            <div className="grid gap-3">
              {recentBooks.map((book) => (
                <article
                  key={book._id}
                  className="flex flex-col gap-4 rounded-xl border border-base-300 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={book.image || book.photo || "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=240&q=80"}
                    alt={book.title || "Book cover"}
                    className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-16"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold">
                      {book.title || "Untitled Book"}
                    </h3>
                    <p className="text-sm text-base-content/60">
                      {book.author || book.category || "BookCourier catalog"}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-base-content/50">
                      <FiClock />
                      {formatDate(book.createdAt || book.orderDate)}
                    </p>
                  </div>
                  <Link to={`/books/${book._id}`} className="btn btn-sm bg-amber-600 text-white hover:bg-amber-700">
                    View
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
              <p className="font-semibold">No books found yet.</p>
              <p className="mt-1 text-sm text-base-content/60">
                Add a book to start filling the dashboard.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              {recentOrders.length ? (
                recentOrders.slice(0, 4).map((order) => (
                  <div key={order._id} className="rounded-xl bg-base-200 p-3">
                    <p className="truncate text-sm font-bold">{order.bookTitle || "Book order"}</p>
                    <p className="mt-1 text-xs text-base-content/55">
                      {order.status || "pending"} · {formatDate(order.orderDate)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-base-content/50">No activity yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <h2 className="text-xl font-bold">Quick Tracking</h2>
            <p className="mt-1 text-sm text-base-content/60">
              Search a book, order, or courier reference.
            </p>

            <div className="mt-4 flex gap-2">
              <label className="input input-bordered flex flex-1 items-center gap-2">
                <FiSearch className="text-base-content/40" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Track ID"
                  value={trackingSearch}
                  onChange={(event) => setTrackingSearch(event.target.value)}
                />
              </label>
              <button
                className="btn bg-slate-900 text-white hover:bg-slate-800"
                disabled={!trackingSearch.trim()}
              >
                Track
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-600 p-5 text-white shadow-sm">
            <h2 className="text-xl font-bold">Community Impact</h2>
            <p className="mt-2 text-sm text-emerald-50">
              Reusing books keeps stories moving and reduces unnecessary new
              purchases.
            </p>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span>Monthly sharing goal</span>
                <span>72%</span>
              </div>
              <progress className="progress progress-warning w-full" value="72" max="100" />
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <h2 className="text-xl font-bold">Fast Actions</h2>
            <div className="mt-4 grid gap-3">
              <Link to={canManageItems ? "/dashboard/add-book" : "/books"} className="btn justify-start">
                <FiBookOpen />
                {canManageItems ? "Register a Book" : "Browse Books"}
              </Link>
              <Link to="/dashboard/my-orders" className="btn justify-start">
                <FiTruck />
                View My Orders
              </Link>
              <Link to="/dashboard/profile" className="btn justify-start">
                <FiUsers />
                Update Profile
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default DashboardHome;
