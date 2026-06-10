import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import toast from "react-hot-toast";
import {
  FiBookOpen,
  FiGrid,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setProfileOpen(false);
      setMobileOpen(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-amber-100 text-amber-700"
        : "text-base-content/70 hover:bg-base-200 hover:text-amber-600"
    }`;

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const links = (
    <>
      <NavLink to="/" end className={navLinkClass} onClick={closeMenus}>
        Home
      </NavLink>
      <NavLink to="/books" className={navLinkClass} onClick={closeMenus}>
        Books
      </NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={closeMenus}>
        About
      </NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={closeMenus}>
        Contact
      </NavLink>
      <NavLink to="/blog" className={navLinkClass} onClick={closeMenus}>
        Blog
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenus}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
      <style>{`
        @keyframes navDrop {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-drop {
          animation: navDrop 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="btn btn-ghost btn-sm lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>

          <Link to="/" onClick={closeMenus} className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/20 transition group-hover:rotate-3 group-hover:scale-105">
              <FiBookOpen className="text-xl" />
            </span>
            <span className="text-xl font-black tracking-tight sm:text-2xl">
              Book<span className="text-amber-600">Courier</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">{links}</div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            className="btn btn-outline btn-sm"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 p-1 pr-2 shadow-sm transition hover:border-amber-400"
                aria-label="Open profile menu"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={user.displayName || "User"}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="hidden max-w-28 truncate text-sm font-bold sm:inline">
                  {user.displayName || "Reader"}
                </span>
              </button>

              {profileOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-30 cursor-default"
                    aria-label="Close profile menu"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="nav-drop absolute right-0 z-40 mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">
                    <div className="border-b border-base-300 px-3 py-3">
                      <p className="text-xs font-semibold text-base-content/45">
                        Signed in as
                      </p>
                      <p className="mt-1 truncate text-sm font-black">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard/profile"
                      onClick={closeMenus}
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold hover:bg-base-200 hover:text-amber-600"
                    >
                      <FiUser />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold hover:bg-base-200 hover:text-amber-600"
                    >
                      <FiGrid />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 flex w-full items-center gap-3 border-t border-base-300 px-3 py-3 text-left text-sm font-bold text-rose-600 hover:bg-rose-50"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-outline btn-sm">
                <FiLogIn />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="btn btn-sm border-none bg-amber-600 text-white hover:bg-amber-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="nav-drop border-t border-base-300 bg-base-100 px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">{links}</div>
          {!user && (
            <div className="mx-auto mt-3 flex max-w-7xl gap-2 border-t border-base-300 pt-3">
              <Link
                to="/login"
                onClick={closeMenus}
                className="btn btn-outline btn-sm flex-1"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenus}
                className="btn btn-sm flex-1 border-none bg-amber-600 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
