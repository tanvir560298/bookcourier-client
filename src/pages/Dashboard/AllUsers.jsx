import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const AllUsers = () => {
  const { token, handleAuthError } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [viewingUser, setViewingUser] = useState(null);
  const pageSize = 6;

  const loadUsers = useCallback(() => {
    setError("");

    fetch(`${import.meta.env.VITE_API_URL}/users`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        return data;
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => {
        handleAuthError(err.message);
        setUsers([]);
        setError(err.message || "Failed to load users");
        toast.error(err.message || "Failed to load users");
      });
  }, [handleAuthError, token]);

  useEffect(() => {
    if (token) loadUsers();
  }, [loadUsers, token]);

  const handleRoleChange = (id, role) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}/role`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update role");
        return data;
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`User role updated to ${role}`);
          loadUsers();
        }
      })
      .catch((error) => {
        handleAuthError(error.message);
        toast.error(error.message || "Failed to update role");
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to delete user");
        return data;
      })
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("User deleted successfully");
          loadUsers();
        }
      })
      .catch((error) => {
        handleAuthError(error.message);
        toast.error(error.message || "Failed to delete user");
      });
  };

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users
      .filter((item) => {
        const role = item.role || "user";
        const matchesRole = roleFilter === "all" || role === roleFilter;
        const matchesSearch =
          !normalizedSearch ||
          [item.name, item.email, role]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch));

        return matchesRole && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
        if (sortBy === "role") return (a.role || "user").localeCompare(b.role || "user");
        return new Date(b.createdAt || b._id).getTime() - new Date(a.createdAt || a._id).getTime();
      });
  }, [roleFilter, search, sortBy, users]);

  const totalPages = Math.max(Math.ceil(filteredUsers.length / pageSize), 1);
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [roleFilter, search, sortBy]);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">All Users</h2>

      {error && (
        <div className="mb-6 rounded-2xl border border-error/20 bg-error/10 p-4 text-sm text-error">
          {error}
        </div>
      )}

      <div className="mb-5 grid gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Filter by name, email, role"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="input input-bordered w-full md:col-span-2"
        />
        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          className="select select-bordered w-full"
        >
          <option value="all">All roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="librarian">Librarian</option>
        </select>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="select select-bordered w-full"
        >
          <option value="newest">Newest first</option>
          <option value="name">Name A-Z</option>
          <option value="role">Role A-Z</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto">
  <table className="table table-xs md:table-md bg-base-200 rounded-2xl min-w-[880px]">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>View</th>
              <th>Make Librarian</th>
              <th>Make Admin</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * pageSize + index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={item.photo || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{item.name}</span>
                </td>

                <td>{item.email}</td>

                <td>
                  <span className="badge badge-warning">
                    {item.role || "user"}
                  </span>
                </td>

                <td>
                  <button onClick={() => setViewingUser(item)} className="btn btn-sm btn-outline">
                    View
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleRoleChange(item._id, "librarian")}
                    disabled={item.role === "librarian"}
                    className="btn btn-sm bg-blue-600 text-white border-none"
                  >
                    Make Librarian
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleRoleChange(item._id, "admin")}
                    disabled={item.role === "admin"}
                    className="btn btn-sm bg-amber-600 text-white border-none"
                  >
                    Make Admin
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-red-500 text-white border-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-base-content/60">
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </p>
        <div className="join">
          <button
            className="btn join-item btn-sm"
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(value - 1, 1))}
          >
            Prev
          </button>
          <button className="btn join-item btn-sm">Page {page} / {totalPages}</button>
          <button
            className="btn join-item btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60"
            aria-label="Close user details"
            onClick={() => setViewingUser(null)}
          />
          <div className="relative w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl">
            <img
              src={viewingUser.photo || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
              alt={viewingUser.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <h3 className="mt-4 text-2xl font-black">{viewingUser.name || "No Name"}</h3>
            <p className="mt-1 text-sm text-base-content/60">{viewingUser.email}</p>
            <p className="mt-4">
              <span className="badge badge-warning">{viewingUser.role || "user"}</span>
            </p>
            <button onClick={() => setViewingUser(null)} className="btn mt-6 w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
