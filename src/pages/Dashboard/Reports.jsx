import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarChart, LineChart, PieChart } from "../../components/DashboardCharts";
import useAuth from "../../hooks/useAuth";

const Reports = () => {
  const { token, handleAuthError } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/dashboard-stats`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.message || "Failed to load reports");
        return payload;
      })
      .then(setData)
      .catch((error) => {
        handleAuthError(error.message);
        toast.error(error.message || "Failed to load reports");
      })
      .finally(() => setLoading(false));
  }, [handleAuthError, token]);

  const cards = data?.cards || {};
  const charts = data?.charts || {};

  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Admin analytics
        </span>
        <h1 className="mt-3 text-4xl font-black">Reports</h1>
        <p className="mt-2 text-base-content/60">
          Dynamic catalog, user, order, and revenue reports from the backend.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Items", cards.totalItems || 0],
          ["Users", cards.totalUsers || 0],
          ["Orders", cards.totalOrders || 0],
          ["Revenue", `$${Number(cards.revenue || 0).toFixed(2)}`],
        ].map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-base-content/55">{label}</p>
            <p className="mt-2 text-3xl font-black">{loading ? "..." : value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <BarChart title="Bar Chart: Items by Category" data={charts.bar || []} />
        <PieChart title="Pie Chart: Order Status" data={charts.pie || []} />
        <LineChart title="Line Chart: Orders by Month" data={charts.line || []} className="xl:col-span-2" />
        <LineChart title="Revenue by Month" data={charts.revenue || []} className="xl:col-span-2" />
      </section>
    </div>
  );
};

export default Reports;
