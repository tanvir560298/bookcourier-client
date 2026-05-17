import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = (id, role) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}/role`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`User role updated to ${role}`);
          loadUsers();
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">All Users</h2>

      <div className="w-full overflow-x-auto">
  <table className="table table-xs md:table-md bg-base-200 rounded-2xl min-w-[700px]">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Librarian</th>
              <th>Make Admin</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;