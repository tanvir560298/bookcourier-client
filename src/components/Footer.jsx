import { useState } from "react";
import { Link } from "react-router";
import {
  FiBookOpen,
  FiClock,
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiTwitter,
} from "react-icons/fi";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Browse Books" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Blog" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/login", label: "Login" },
];

const socialLinks = [
  { label: "Facebook", icon: FiFacebook, href: "https://facebook.com" },
  { label: "Twitter", icon: FiTwitter, href: "https://twitter.com" },
  { label: "Instagram", icon: FiInstagram, href: "https://instagram.com" },
  { label: "GitHub", icon: FiGithub, href: "https://github.com" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thanks for subscribing to BookCourier updates.");
    setEmail("");
  };

  return (
    <footer className="mt-20 border-t border-base-300 bg-base-200">
      <div className="border-b border-base-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <span className="badge badge-warning font-bold uppercase tracking-wide">
              Reader circle
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Get library updates before your next read.
            </h2>
            <p className="mt-3 text-sm leading-6 text-base-content/60">
              Weekly book recommendations, new partner library alerts, and
              courier coverage updates from BookCourier.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <label className="input input-bordered flex items-center gap-2 bg-base-100">
              <FiMail className="text-base-content/40" />
              <input
                type="email"
                className="grow"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
              />
            </label>
            <button className="btn mt-3 w-full bg-amber-600 text-white hover:bg-amber-700">
              Subscribe
              <FiSend />
            </button>
            {message && (
              <p className="mt-2 text-sm font-semibold text-emerald-600">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/20">
              <FiBookOpen className="text-xl" />
            </span>
            <span className="text-2xl font-black">
              Book<span className="text-amber-600">Courier</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-base-content/60">
            Borrow books from nearby libraries and enjoy a smoother reading
            journey with fast, reliable delivery.
          </p>

          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="btn btn-circle btn-sm bg-base-100 hover:border-amber-600 hover:text-amber-600"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wide">
            Quick Links
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="w-fit text-base-content/60 transition hover:translate-x-1 hover:text-amber-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wide">
            Contact
          </h3>
          <div className="mt-5 space-y-4 text-sm text-base-content/60">
            <p className="flex items-start gap-3">
              <FiMapPin className="mt-1 text-amber-600" />
              <span>Banani Road 11, Dhaka, Bangladesh</span>
            </p>
            <p className="flex items-center gap-3">
              <FiMail className="text-amber-600" />
              <span>support@bookcourier.com</span>
            </p>
            <p className="flex items-center gap-3">
              <FiPhone className="text-amber-600" />
              <span>+880 1234-567890</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wide">
            Courier Hours
          </h3>
          <div className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <FiClock className="text-amber-600" />
              Active delivery window
            </div>
            <div className="mt-4 space-y-3 text-sm text-base-content/60">
              <div className="flex justify-between gap-4">
                <span>Sun - Thu</span>
                <span className="font-bold text-base-content">8AM - 10PM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Fri - Sat</span>
                <span className="font-bold text-base-content">9AM - 8PM</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-base-300 pt-4 text-xs font-bold uppercase tracking-wide text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Couriers active now
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center text-sm text-base-content/50 sm:px-6 md:flex-row lg:px-8">
          <p>© 2026 BookCourier. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy-terms">Terms of Service</Link>
            <Link to="/privacy-terms">Privacy Policy</Link>
            <Link to="/privacy-terms">Courier Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
