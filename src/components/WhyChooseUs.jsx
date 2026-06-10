import { FiCheckCircle, FiMousePointer, FiShield, FiZap } from "react-icons/fi";

const features = [
  {
    title: "Fast Delivery",
    description:
      "Request a book from the catalog and arrange library-to-door delivery without extra travel.",
    metric: "City hub routing",
    icon: FiZap,
    color: "from-amber-500 to-orange-600",
    tone: "text-amber-600 bg-amber-50",
  },
  {
    title: "Trusted Library Flow",
    description:
      "Books, users, and orders stay connected through a clear dashboard and managed catalog workflow.",
    metric: "Managed catalog",
    icon: FiShield,
    color: "from-indigo-500 to-violet-600",
    tone: "text-indigo-600 bg-indigo-50",
  },
  {
    title: "Simple Borrowing",
    description:
      "Browse, view details, place an order, and track your request from one responsive web experience.",
    metric: "Browse to order",
    icon: FiMousePointer,
    color: "from-emerald-500 to-teal-600",
    tone: "text-emerald-600 bg-emerald-50",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes whyRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .why-rise {
          animation: whyRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Why choose us
        </span>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          A smarter way to{" "}
          <span className="text-amber-600">borrow books</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-base-content/60">
          BookCourier brings catalog discovery, delivery requests, and reader
          management into one simple library experience.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="why-rise group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <span
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${feature.color} opacity-0 transition group-hover:opacity-100`}
              />

              <div className="flex items-center justify-between">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.tone} transition group-hover:scale-105`}
                >
                  <Icon className="text-2xl" />
                </span>
                <span className="text-xs font-black uppercase tracking-wide text-base-content/35">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-black transition group-hover:text-amber-600">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-base-content/60">
                {feature.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-base-300 pt-5">
                <span className="badge badge-outline font-bold">
                  {feature.metric}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 opacity-0 transition group-hover:opacity-100">
                  <FiCheckCircle />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
