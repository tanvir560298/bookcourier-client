import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-amber-600"
      : "font-medium hover:text-amber-600";

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>

      <NavLink to="/books" className={navLinkClass}>
        Books
      </NavLink>

      <NavLink to="/dashboard" className={navLinkClass}>
        Dashboard
      </NavLink>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              ☰
            </button>

            <div
              tabIndex={0}
              className="dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52 flex flex-col gap-3"
            >
              {links}
            </div>
          </div>

          <Link to="/" className="text-2xl font-extrabold">
            Book<span className="text-amber-600">Courier</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex gap-8">{links}</div>

        <div className="navbar-end gap-3">
          <label className="swap swap-rotate btn btn-sm btn-outline">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) =>
                setTheme(e.target.checked ? "dark" : "light")
              }
            />
            <span className="swap-off">🌙</span>
            <span className="swap-on">☀️</span>
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <img
                tabIndex={0}
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border cursor-pointer"
              />

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-sm bg-amber-600 text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;