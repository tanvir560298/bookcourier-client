import { useState } from "react";
import { FiBookOpen, FiMapPin, FiNavigation, FiTruck, FiUsers } from "react-icons/fi";

const cities = [
  {
    name: "Dhaka",
    role: "Capital Hub",
    deliverySpeed: "1-3 hours",
    status: "High demand",
    libraries: 24,
    couriers: 145,
    description:
      "Full pickup and delivery coverage across Dhanmondi, Gulshan, Uttara, Mirpur, and nearby library zones.",
    dot: "top-[42%] left-[49%]",
  },
  {
    name: "Chattogram",
    role: "Port City Hub",
    deliverySpeed: "Same day",
    status: "Active",
    libraries: 12,
    couriers: 64,
    description:
      "Express book deliveries around Halishahar, GEC, Agrabad, Nasirabad, and central reading hubs.",
    dot: "bottom-[27%] right-[25%]",
  },
  {
    name: "Sylhet",
    role: "Division Hub",
    deliverySpeed: "Same day",
    status: "Active",
    libraries: 8,
    couriers: 32,
    description:
      "Reader networks around Zindabazar, Amberkhana, and university areas can request doorstep delivery.",
    dot: "top-[31%] right-[21%]",
  },
  {
    name: "Rajshahi",
    role: "Education Zone",
    deliverySpeed: "Next day",
    status: "Active",
    libraries: 10,
    couriers: 40,
    description:
      "Student-focused delivery routes serving Rajshahi University, Motihar, and Saheb Bazar.",
    dot: "top-[37%] left-[25%]",
  },
  {
    name: "Khulna",
    role: "Division Hub",
    deliverySpeed: "Next day",
    status: "Active",
    libraries: 6,
    couriers: 22,
    description:
      "Book exchange channels support Boyra, Khalishpur, KU campus circles, and central city areas.",
    dot: "bottom-[34%] left-[33%]",
  },
  {
    name: "Barishal",
    role: "Growing Hub",
    deliverySpeed: "Next day",
    status: "Expanding",
    libraries: 4,
    couriers: 18,
    description:
      "Pickup lines are expanding around Sadar Road, Natullabad, and BM College reader communities.",
    dot: "bottom-[24%] left-[45%]",
  },
];

const CoverageSection = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0].name);
  const activeCity = cities.find((city) => city.name === selectedCity) || cities[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes coverageRadar {
          0% { transform: scale(0.65); opacity: 0.75; }
          100% { transform: scale(2.35); opacity: 0; }
        }

        @keyframes coverageRise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .coverage-radar {
          animation: coverageRadar 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .coverage-rise {
          animation: coverageRise 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="badge badge-warning font-bold uppercase tracking-wide">
            Expanding network
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Delivery Coverage Across{" "}
            <span className="text-amber-600">Major Cities</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-base-content/60 sm:text-lg">
            BookCourier connects readers with partner libraries and delivery
            riders across Bangladesh&apos;s major education and library zones.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => {
              const isActive = city.name === selectedCity;

              return (
                <button
                  type="button"
                  key={city.name}
                  onClick={() => setSelectedCity(city.name)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isActive
                      ? "border-amber-400 bg-base-100 shadow-md"
                      : "border-base-300 bg-base-100/70"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 font-extrabold">
                        <FiMapPin className="text-amber-600" />
                        <span className="break-words">{city.name}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-base-content/45">
                        {city.role}
                      </p>
                    </div>
                    <span className="badge badge-sm badge-outline h-auto whitespace-normal py-1 text-center leading-tight sm:shrink-0">
                      {city.deliverySpeed}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-base-300 pb-4">
              <div>
                <h3 className="text-lg font-black">Network Status Map</h3>
                <p className="text-xs text-base-content/50">
                  Interactive hub coverage preview
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.16),transparent_58%)]" />

              <svg
                className="absolute inset-0 h-full w-full p-9 text-white/20"
                fill="none"
                viewBox="0 0 220 220"
                aria-hidden="true"
              >
                <path
                  d="M111 12 C144 25 165 53 164 88 C184 108 179 145 151 161 C141 184 119 206 104 210 C88 190 63 170 62 142 C43 123 40 88 58 67 C66 42 85 22 111 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 6"
                />
                <path
                  d="M76 78 C105 60 139 69 149 98 C158 126 135 155 104 153 C78 151 59 130 62 105 C63 93 67 84 76 78Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>

              {cities.map((city) => {
                const isActive = city.name === selectedCity;

                return (
                  <button
                    type="button"
                    key={city.name}
                    onClick={() => setSelectedCity(city.name)}
                    className={`absolute ${city.dot} z-10 -translate-x-1/2 -translate-y-1/2`}
                    aria-label={`Select ${city.name}`}
                  >
                    {isActive && (
                      <>
                        <span className="coverage-radar absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400 bg-amber-400/20" />
                        <span className="coverage-radar absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400 bg-amber-400/20 [animation-delay:850ms]" />
                      </>
                    )}
                    <span
                      className={`block rounded-full ring-2 ring-white transition ${
                        isActive
                          ? "h-4 w-4 bg-amber-500 shadow-lg shadow-amber-500/50"
                          : "h-2.5 w-2.5 bg-sky-400/80 hover:scale-125 hover:bg-amber-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div
              key={activeCity.name}
              className="coverage-rise mt-5 rounded-2xl border border-base-300 bg-base-200 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black">{activeCity.name} Hub</p>
                  <p className="text-xs text-base-content/50">
                    {activeCity.description}
                  </p>
                </div>
                <span className="badge badge-success badge-outline h-auto whitespace-normal py-1 text-center leading-tight">
                  {activeCity.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-base-100 p-3">
                  <p className="flex items-center gap-2 text-xs text-base-content/50">
                    <FiUsers />
                    Partner libraries
                  </p>
                  <p className="mt-1 text-xl font-black">{activeCity.libraries}</p>
                </div>
                <div className="rounded-xl bg-base-100 p-3">
                  <p className="flex items-center gap-2 text-xs text-base-content/50">
                    <FiTruck />
                    Couriers online
                  </p>
                  <p className="mt-1 text-xl font-black">{activeCity.couriers}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-base-200 p-3">
                <FiTruck className="mx-auto text-amber-600" />
                <p className="mt-1 text-xs font-bold">320+ Fleet</p>
              </div>
              <div className="rounded-xl bg-base-200 p-3">
                <FiBookOpen className="mx-auto text-amber-600" />
                <p className="mt-1 text-xs font-bold">14k+ Swaps</p>
              </div>
              <div className="rounded-xl bg-base-200 p-3">
                <FiNavigation className="mx-auto text-emerald-600" />
                <p className="mt-1 text-xs font-bold">99.7% Success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
