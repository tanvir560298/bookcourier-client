import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiUserPlus } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const rules = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
  ];

  const handleRegister = async (event) => {
    event.preventDefault();

    if (rules.some((rule) => !rule.valid)) {
      toast.error("Password must contain uppercase, lowercase and 6 characters");
      return;
    }

    const form = event.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();

    setLoading(true);

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      toast.success("Account created successfully");
      form.reset();
      setPassword("");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="hidden rounded-[2rem] bg-gradient-to-br from-amber-600 via-orange-700 to-slate-950 p-10 text-white shadow-2xl lg:block">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <FiBookOpen className="text-2xl" />
        </div>
        <h1 className="mt-8 text-5xl font-black leading-tight">
          Create your reader account.
        </h1>
        <p className="mt-5 max-w-md leading-7 text-orange-50">
          Browse books, place delivery requests, and manage your library journey
          from one dashboard.
        </p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-8 shadow-xl">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Join BookCourier
        </span>
        <h2 className="mt-4 text-4xl font-black">Create Account</h2>
        <p className="mt-2 text-sm text-base-content/60">
          Start borrowing books from nearby library hubs.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="input input-bordered w-full"
            required
          />

          <input
            name="photo"
            type="url"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="input input-bordered w-full"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="rounded-2xl bg-base-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-base-content/45">
              Password rules
            </p>
            <div className="mt-3 space-y-2">
              {rules.map((rule) => (
                <p
                  key={rule.label}
                  className={`flex items-center gap-2 text-sm font-semibold ${
                    rule.valid ? "text-emerald-600" : "text-base-content/45"
                  }`}
                >
                  <FiCheckCircle />
                  {rule.label}
                </p>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="btn w-full border-none bg-amber-600 text-white hover:bg-amber-700"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : <FiUserPlus />}
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-amber-600">
            Login <FiArrowRight className="inline" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
