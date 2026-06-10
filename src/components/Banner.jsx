import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiPause, FiPlay, FiTruck } from "react-icons/fi";

const slides = [
  {
    title: "Academic Swaps &",
    highlight: "Textbooks Delivered",
    description:
      "Get school textbooks, research materials, and library favorites delivered to your study desk while sharing books with your reader community.",
    badge: "Exam prep and research swaps",
    cta: "Find Course Materials",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200",
    accent: "from-amber-500 to-orange-600",
    stat: "2.4k books moving",
  },
  {
    title: "Cozy Study Circles &",
    highlight: "Shared Knowledge",
    description:
      "Borrow textbook stacks, classics, and bestsellers from nearby readers. Save money, reduce waste, and keep stories circulating.",
    badge: "Peer-to-peer exchanging",
    cta: "Explore Study Circles",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=1200",
    accent: "from-indigo-500 to-violet-600",
    stat: "1.2k readers online",
  },
  {
    title: "Unlock City Libraries",
    highlight: "At Your Desk",
    description:
      "Request special titles, reading guides, and academic resources from nearby libraries with fast BookCourier delivery.",
    badge: "Fast campus and city delivery",
    cta: "Browse Library Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200",
    accent: "from-emerald-500 to-teal-600",
    stat: "Same-day routes",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activeSlide = slides[currentSlide];

  useEffect(() => {
    if (isPaused || isHovered) return undefined;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isHovered, isPaused]);

  const progressItems = useMemo(
    () =>
      slides.map((slide, index) => ({
        ...slide,
        isActive: index === currentSlide,
      })),
    [currentSlide]
  );

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <style>{`
        @keyframes bannerFadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bannerScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes bannerFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(14px) scale(1.04); }
        }

        @keyframes bannerImageFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(0.7deg); }
        }

        @keyframes bannerPulseRing {
          0% { transform: scale(1); opacity: 0.85; }
          70% { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1.65); opacity: 0; }
        }

        @keyframes bannerProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .banner-fade-up {
          animation: bannerFadeInUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .banner-scale-in {
          animation: bannerScaleIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .banner-float {
          animation: bannerFloat 10s ease-in-out infinite;
        }

        .banner-image-float {
          animation: bannerImageFloat 5.5s ease-in-out infinite;
        }

        .banner-pulse-ring::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          border: 2px solid rgba(16, 185, 129, 0.45);
          animation: bannerPulseRing 1.8s ease-out infinite;
        }

        .banner-progress {
          transform-origin: left;
          animation: bannerProgress 6.5s linear forwards;
        }

        .banner-progress-paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-slate-950/10" />
        <div className="banner-float absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="banner-float absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl [animation-delay:2s]" />

        <div
          key={currentSlide}
          className="relative grid min-h-[560px] items-center gap-8 px-5 py-8 sm:px-8 lg:min-h-[calc(70vh-4rem)] lg:max-h-[calc(70vh-4rem)] lg:grid-cols-12 lg:px-12 lg:py-10"
        >
          <div className="lg:col-span-7">
            <div className="banner-fade-up inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-base-content/70 backdrop-blur">
              <span className="relative h-2 w-2 rounded-full bg-amber-500 before:absolute before:inset-0 before:rounded-full before:bg-amber-400 before:animate-ping" />
              {activeSlide.badge}
            </div>

            <h1 className="banner-fade-up mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-base-content [animation-delay:100ms] sm:text-5xl lg:text-6xl">
              {activeSlide.title}{" "}
              <span className={`bg-gradient-to-r ${activeSlide.accent} bg-clip-text text-transparent`}>
                {activeSlide.highlight}
              </span>
            </h1>

            <p className="banner-fade-up mt-5 max-w-2xl text-base leading-7 text-base-content/65 [animation-delay:200ms] sm:text-lg">
              {activeSlide.description}
            </p>

            <div className="banner-fade-up mt-7 flex flex-wrap items-center gap-3 [animation-delay:300ms]">
              <Link
                to="/books"
                className={`btn group border-none bg-gradient-to-r ${activeSlide.accent} px-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                {activeSlide.cta}
                <FiArrowRight className="transition duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setIsPaused((value) => !value)}
                className="btn btn-outline"
                aria-label={isPaused ? "Resume banner carousel" : "Pause banner carousel"}
              >
                {isPaused ? <FiPlay /> : <FiPause />}
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {progressItems.map((slide, index) => (
                <button
                  type="button"
                  key={slide.title}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    slide.isActive
                      ? "border-amber-500 bg-amber-50 text-slate-950"
                      : "border-base-300 bg-base-100/70 text-base-content/70 hover:border-amber-300"
                  }`}
                >
                  <span className="text-xs font-bold">0{index + 1}</span>
                  <p className="mt-1 text-sm font-semibold">{slide.stat}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`banner-scale-in relative rounded-3xl bg-gradient-to-br ${activeSlide.accent} p-1 shadow-2xl [animation-delay:180ms]`}>
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                <span className="banner-pulse-ring relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live preview
              </div>

              <img
                src={activeSlide.image}
                alt={`${activeSlide.highlight} through BookCourier`}
                className="banner-image-float h-[300px] w-full rounded-[1.35rem] object-cover sm:h-[380px] lg:h-[min(430px,50vh)]"
              />

              <div className="banner-fade-up absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/90 p-4 text-slate-900 shadow-lg backdrop-blur [animation-delay:350ms]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <FiBookOpen />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Study Mode Active</p>
                      <p className="text-xs text-slate-500">Books packed for delivery</p>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 sm:inline-flex">
                    <FiTruck className="mr-1" />
                    On route
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-5 flex gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            className="btn btn-circle btn-sm border-base-300 bg-base-100/80 backdrop-blur"
            aria-label="Previous banner slide"
          >
            <FiArrowLeft />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="btn btn-circle btn-sm border-base-300 bg-base-100/80 backdrop-blur"
            aria-label="Next banner slide"
          >
            <FiArrowRight />
          </button>
        </div>

        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.title}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to banner slide ${index + 1}`}
              className={`relative h-2.5 overflow-hidden rounded-full transition-all ${
                index === currentSlide
                  ? "w-10 bg-amber-200"
                  : "w-2.5 bg-base-content/25 hover:bg-base-content/40"
              }`}
            >
              {index === currentSlide && (
                <span
                  key={`${currentSlide}-${isPaused}-${isHovered}`}
                  className={`banner-progress absolute inset-y-0 left-0 w-full bg-amber-600 ${
                    isPaused || isHovered ? "banner-progress-paused" : ""
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
