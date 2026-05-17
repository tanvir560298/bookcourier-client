import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;

    if (!hasUpper || !hasLower || !isLong) {
      toast.error(
        "Password must contain uppercase, lowercase and 6 characters"
      );
      return;
    }

    try {
      await createUser(email, password);

      await updateUserProfile(name, photo);

      toast.success("Account created successfully");

      form.reset();

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold text-center">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4 mt-8">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
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
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button className="btn bg-amber-600 text-white border-none w-full">
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;