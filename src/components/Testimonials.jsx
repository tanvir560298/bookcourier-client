import { FiStar } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Medical Student",
    review:
      "BookCourier made borrowing heavy reference books incredibly easy. I could request what I needed and focus on studying instead of travelling across the city.",
    initials: "SA",
    accent: "from-amber-400 to-orange-500",
    note: "28 books borrowed",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Software Engineer",
    review:
      "The dashboard feels smooth, and finding technical books is much faster than messaging people one by one. The whole flow feels organized.",
    initials: "TH",
    accent: "from-indigo-400 to-violet-500",
    note: "14 books shared",
  },
  {
    id: 3,
    name: "Rakib Hossain",
    role: "Novel Enthusiast",
    review:
      "I like that BookCourier makes book sharing feel simple. It is useful for readers who want more books without buying every single title.",
    initials: "RH",
    accent: "from-emerald-400 to-teal-500",
    note: "42 swaps completed",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @keyframes testimonialRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .testimonial-rise {
          animation: testimonialRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Reader stories
        </span>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          What Our <span className="text-amber-600">Readers Say</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-base-content/60">
          Students, professionals, and book lovers use BookCourier to make
          borrowing and sharing books feel less complicated.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <article
            key={review.id}
            className="testimonial-rise group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <span className="absolute right-6 top-3 text-7xl font-black leading-none text-base-200 transition group-hover:scale-110">
              ”
            </span>

            <div className="relative z-10 flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((item) => (
                <FiStar key={item} className="fill-current" />
              ))}
            </div>

            <p className="relative z-10 mt-6 text-sm italic leading-7 text-base-content/65">
              “{review.review}”
            </p>

            <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-base-300 pt-6">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${review.accent} text-sm font-black text-white shadow-md`}
              >
                {review.initials}
              </span>
              <div>
                <h3 className="font-black">{review.name}</h3>
                <p className="text-xs font-semibold text-base-content/45">
                  {review.role}
                </p>
                <p className="mt-1 text-xs font-bold text-amber-600">
                  {review.note}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
