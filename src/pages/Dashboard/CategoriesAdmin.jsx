import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiSearch } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const CategoriesAdmin = () => {
  const { token, handleAuthError } = useAuth();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/dashboard-stats`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load categories");
        return data;
      })
      .then((data) => setCategories(data.charts?.bar || []))
      .catch((error) => {
        handleAuthError(error.message);
        toast.error(error.message || "Failed to load categories");
      });
  }, [handleAuthError, token]);

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.label.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [categories, search]
  );

  return (
    <div>
      <div className="mb-8">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Admin taxonomy
        </span>
        <h1 className="mt-3 text-4xl font-black">Categories</h1>
        <p className="mt-2 text-base-content/60">
          Category counts are calculated from real catalog items.
        </p>
      </div>

      <label className="input input-bordered mb-5 flex max-w-md items-center gap-2">
        <FiSearch className="text-base-content/40" />
        <input
          type="text"
          className="grow"
          placeholder="Filter categories"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category.label}>
                <td>{index + 1}</td>
                <td className="font-bold">{category.label}</td>
                <td>{category.value}</td>
                <td>
                  <Link
                    to={`/books?category=${encodeURIComponent(category.label)}`}
                    className="btn btn-sm btn-outline"
                  >
                    <FiEye />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
