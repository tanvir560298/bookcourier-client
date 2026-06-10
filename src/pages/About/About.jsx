import { Link } from "react-router";
import { FiArrowRight, FiBookOpen, FiShield, FiTruck, FiUsers } from "react-icons/fi";

const About = () => {
  const values = [
    { title: "Reader Access", icon: FiUsers },
    { title: "Trusted Catalogs", icon: FiShield },
    { title: "Courier Delivery", icon: FiTruck },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          About BookCourier
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
          We connect nearby readers with library books and reliable delivery.
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-base-content/60">
          BookCourier helps people discover books from local library hubs,
          request delivery, manage orders, and keep the borrowing experience
          organized from one responsive web app.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="rounded-2xl bg-base-200 p-5">
                <Icon className="text-2xl text-amber-600" />
                <h2 className="mt-4 font-black">{value.title}</h2>
              </div>
            );
          })}
        </div>

        <Link to="/books" className="btn mt-8 border-none bg-amber-600 text-white">
          Explore Books
          <FiArrowRight />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6">
          <FiBookOpen className="text-3xl text-amber-600" />
          <h2 className="mt-4 text-2xl font-black">What We Do</h2>
          <p className="mt-3 leading-7 text-base-content/60">
            We provide a catalog-first book borrowing flow where readers can
            browse, order, and track book requests through their dashboard.
          </p>
        </div>
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6">
          <FiTruck className="text-3xl text-amber-600" />
          <h2 className="mt-4 text-2xl font-black">How Delivery Works</h2>
          <p className="mt-3 leading-7 text-base-content/60">
            Readers place requests with contact details, and the order moves
            through pending, shipped, and delivered states in the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
