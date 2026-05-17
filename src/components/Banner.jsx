import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="carousel w-full rounded-3xl overflow-hidden min-h-[75vh]">

        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <div className="hero bg-base-200 w-full">
            <div className="hero-content flex-col lg:flex-row-reverse gap-16">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                className="max-w-md w-full rounded-3xl shadow-2xl object-cover"
              />

              <div>
                <h1 className="text-6xl font-extrabold leading-tight">
                  Library Books <br />
                  Delivered To{" "}
                  <span className="text-amber-600">Your Door</span>
                </h1>

                <p className="py-8 text-lg text-gray-500 max-w-xl leading-8">
                  Borrow books from nearby libraries and get them delivered
                  easily through BookCourier.
                </p>

                <Link
                  to="/books"
                  className="btn bg-amber-600 text-white border-none"
                >
                  Explore Books
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <div className="hero bg-base-200 w-full">
            <div className="hero-content flex-col lg:flex-row-reverse gap-16">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                className="max-w-md w-full rounded-3xl shadow-2xl object-cover"
              />

              <div>
                <h1 className="text-6xl font-extrabold leading-tight">
                  Read Smarter <br />
                  With{" "}
                  <span className="text-amber-600">BookCourier</span>
                </h1>

                <p className="py-8 text-lg text-gray-500 max-w-xl leading-8">
                  Discover best-selling books and order them directly from
                  your nearby libraries.
                </p>

                <Link
                  to="/books"
                  className="btn bg-amber-600 text-white border-none"
                >
                  Browse Collection
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <div className="hero bg-base-200 w-full">
            <div className="hero-content flex-col lg:flex-row-reverse gap-16">
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                className="max-w-md w-full rounded-3xl shadow-2xl object-cover"
              />

              <div>
                <h1 className="text-6xl font-extrabold leading-tight">
                  Knowledge <br />
                  At Your{" "}
                  <span className="text-amber-600">Fingertips</span>
                </h1>

                <p className="py-8 text-lg text-gray-500 max-w-xl leading-8">
                  Order books online and enjoy fast home delivery service
                  across major cities.
                </p>

                <Link
                  to="/books"
                  className="btn bg-amber-600 text-white border-none"
                >
                  Start Reading
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;