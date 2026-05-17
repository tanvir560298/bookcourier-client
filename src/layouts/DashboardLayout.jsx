import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role || "user"));
  }, [user?.email]);

  const linkClass = ({ isActive }) =>
    isActive
      ? "btn btn-sm lg:btn-md bg-amber-600 text-white border-none justify-start whitespace-nowrap"
      : "btn btn-sm lg:btn-md btn-ghost justify-start whitespace-nowrap";

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-12">
      <aside className="lg:col-span-3 bg-base-200 p-4 lg:p-6 lg:min-h-screen">
        <h2 className="text-2xl lg:text-3xl font-extrabold mb-2">
          Dashboard
        </h2>

        <p className="badge badge-warning mb-4 lg:mb-8 capitalize">{role}</p>

        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2">
          <NavLink to="/dashboard" end className={linkClass}>
            Overview
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass}>
            Profile
          </NavLink>

          <NavLink to="/dashboard/my-orders" className={linkClass}>
            My Orders
          </NavLink>

          <NavLink to="/dashboard/invoices" className={linkClass}>
            Invoices
          </NavLink>

          {(role === "librarian" || role === "admin") && (
            <>
              <NavLink to="/dashboard/add-book" className={linkClass}>
                Add Book
              </NavLink>

              <NavLink to="/dashboard/my-books" className={linkClass}>
                My Books
              </NavLink>

              <NavLink to="/dashboard/orders" className={linkClass}>
                Orders
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/all-users" className={linkClass}>
                All Users
              </NavLink>

              <NavLink to="/dashboard/manage-books" className={linkClass}>
                Manage Books
              </NavLink>
            </>
          )}

          <NavLink
            to="/"
            className="btn btn-sm lg:btn-md btn-outline justify-start lg:mt-8 whitespace-nowrap"
          >
            Back To Home
          </NavLink>
        </div>
      </aside>

      <main className="lg:col-span-9 p-4 lg:p-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;