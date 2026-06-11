import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FiArrowRight, FiBookOpen, FiLogIn } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await loginUser(credentials.email, credentials.password);
      toast.success("Logged in successfully");
      navigate(from);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate(from);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fillDemo = () => {
    setCredentials({ email: "ami@tumi.com", password: "Amitumi" });
  };

  return (
    <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-900 p-10 text-white shadow-2xl lg:block">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <FiBookOpen className="text-2xl" />
        </div>
        <h1 className="mt-8 text-5xl font-black leading-tight">
          Welcome back to BookCourier.
        </h1>
        <p className="mt-5 max-w-md leading-7 text-slate-300">
          Continue managing orders, borrowing books, and discovering titles from
          nearby library hubs.
        </p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-8 shadow-xl">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Sign in
        </span>
        <h2 className="mt-4 text-4xl font-black">Welcome Back</h2>
        <p className="mt-2 text-sm text-base-content/60">
          Enter your credentials to access your dashboard.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={credentials.email}
              onChange={(event) =>
                setCredentials((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Your password"
              className="input input-bordered w-full"
              value={credentials.password}
              onChange={(event) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              required
            />
          </div>

          <button
            disabled={loading}
            className="btn w-full border-none bg-amber-600 text-white hover:bg-amber-700"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : <FiLogIn />}
            Login
          </button>
        </form>

        <button onClick={fillDemo} className="btn btn-outline mt-3 w-full">
          Fill Demo Admin
        </button>

        <div className="divider">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-base-content/60">
          New here?{" "}
          <Link to="/register" className="font-bold text-amber-600">
            Create an account <FiArrowRight className="inline" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
