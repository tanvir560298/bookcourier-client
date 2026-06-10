import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiBookOpen,
  FiClock,
  FiCheckCircle,
  FiGrid,
  FiMapPin,
  FiRefreshCw,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);

  const loadBook = () => {
    setLoading(true);
    setError("");

    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load book details");
        }

        return data;
      })
      .then((data) => {
        setBook(data);
        const images = Array.isArray(data.images) ? data.images : [];
        setActiveImage(images.find(Boolean) || data.image || "");
      })
      .catch((err) => {
        setBook(null);
        setError(err.message || "Failed to load book details");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  useEffect(() => {
    if (!book?.category) {
      setRelatedBooks([]);
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/books?category=${encodeURIComponent(
        book.category
      )}&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setRelatedBooks(list.filter((item) => item._id !== book._id).slice(0, 4));
      })
      .catch(() => setRelatedBooks([]));
  }, [book]);

  const handleOrder = (event) => {
    event.preventDefault();

    const form = event.target;
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();

    if (!phone || !address) {
      toast.error("Please provide your phone number and address");
      return;
    }

    const order = {
      bookId: book._id,
      bookTitle: book.title,
      author: book.author,
      image: book.image,
      category: book.category,
      price: book.price || 0,
      userName: user?.displayName,
      userEmail: user?.email,
      phone,
      address,
    };

    setSubmitting(true);

    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to place order");
        }

        return data;
      })
      .then((data) => {
        if (data.insertedId) {
          toast.success("Order placed successfully");
          setIsModalOpen(false);
          form.reset();
        }
      })
      .catch((err) => toast.error(err.message || "Failed to place order"))
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton h-[520px] rounded-3xl" />
          <div className="space-y-5">
            <div className="skeleton h-8 w-28" />
            <div className="skeleton h-14 w-4/5" />
            <div className="skeleton h-6 w-2/5" />
            <div className="skeleton h-28 w-full" />
            <div className="skeleton h-14 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4 text-center">
        <div>
          <FiRefreshCw className="mx-auto text-5xl text-amber-600" />
          <h2 className="mt-5 text-3xl font-black">Book details unavailable</h2>
          <p className="mt-2 text-base-content/60">
            {error || "This book could not be found."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={loadBook} className="btn bg-amber-600 text-white">
              Try Again
            </button>
            <Link to="/books" className="btn btn-outline">
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isAvailable = book.available !== false;
  const galleryImages = [
    ...new Set([
      ...(Array.isArray(book.images) ? book.images : []),
      book.image,
    ].filter(Boolean)),
  ];
  const rating = Number(book.rating || book.averageRating || 0);
  const reviewCount = Number(book.reviewCount || book.reviews?.length || 0);
  const publishedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently added";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <style>{`
        @keyframes detailsLeft {
          from { opacity: 0; transform: translateX(-22px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes detailsRight {
          from { opacity: 0; transform: translateX(22px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes detailsFade {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .details-left {
          animation: detailsLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .details-right {
          animation: detailsRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .details-fade {
          animation: detailsFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <Link to="/books" className="btn btn-ghost mb-8">
        <FiArrowLeft />
        Back to Books
      </Link>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="details-left lg:col-span-5">
          <div className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <img
              src={activeImage || book.image}
              alt={book.title}
              className="h-[520px] w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`overflow-hidden rounded-2xl border-2 bg-base-100 p-1 transition ${
                  activeImage === image
                    ? "border-amber-500 shadow-lg shadow-amber-500/20"
                    : "border-base-300 hover:border-amber-300"
                }`}
                aria-label={`Show book image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${book.title} preview ${index + 1}`}
                  className="h-20 w-full rounded-xl object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="details-right lg:col-span-7">
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge badge-warning font-bold">
                {book.category || "Library book"}
              </span>
              <span
                className={`badge font-bold ${
                  isAvailable ? "badge-success" : "badge-error"
                }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              {book.title}
            </h1>
            <p className="mt-3 text-lg text-base-content/60">
              By {book.author || "Unknown author"}
            </p>

            <p className="mt-6 max-w-2xl leading-8 text-base-content/65">
              {book.description ||
                "This book is available through the BookCourier delivery system. Place an order and arrange library-to-home delivery from your dashboard."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-base-200 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-base-content/55">
                  <FiBookOpen className="text-amber-600" />
                  Courier fee
                </p>
                <p className="mt-2 text-2xl font-black text-amber-600">
                  ${Number(book.price || 0).toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl bg-base-200 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-base-content/55">
                  <FiMapPin className="text-amber-600" />
                  Library hub
                </p>
                <p className="mt-2 font-black">Dhaka Central Library</p>
              </div>
              <div className="rounded-2xl bg-base-200 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-base-content/55">
                  <FiTruck className="text-amber-600" />
                  Delivery
                </p>
                <p className="mt-2 font-black">Available in coverage zones</p>
              </div>
              <div className="rounded-2xl bg-base-200 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-base-content/55">
                  <FiStar className="text-amber-600" />
                  Reader rating
                </p>
                <p className="mt-2 font-black">
                  {rating ? `${rating.toFixed(1)} / 5` : "Not rated yet"}
                </p>
              </div>
            </div>

            {user ? (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!isAvailable}
                className="btn mt-8 border-none bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-600/20 transition hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600"
              >
                <FiCheckCircle />
                Order Now
              </button>
            ) : (
              <Link
                to="/login"
                className="btn mt-8 border-none bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-600/20 transition hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600"
              >
                Login to Order
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm lg:col-span-2">
          <span className="badge badge-warning font-bold">Overview</span>
          <h2 className="mt-4 text-3xl font-black">About this book</h2>
          <p className="mt-4 leading-8 text-base-content/65">
            {book.description ||
              `${book.title} by ${
                book.author || "this author"
              } is available for readers through BookCourier. Readers can request the book, share delivery details, and track the borrowing flow from the dashboard.`}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-200 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-base-content/55">
                <FiGrid className="text-amber-600" />
                Category
              </p>
              <p className="mt-2 font-black">{book.category || "General"}</p>
            </div>
            <div className="rounded-2xl bg-base-200 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-base-content/55">
                <FiClock className="text-amber-600" />
                Added
              </p>
              <p className="mt-2 font-black">{publishedDate}</p>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <span className="badge badge-outline font-bold">Information</span>
          <h2 className="mt-4 text-2xl font-black">Key specifications</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
              <span className="text-base-content/55">Author</span>
              <span className="font-bold text-right">{book.author || "Unknown"}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
              <span className="text-base-content/55">Availability</span>
              <span className="font-bold">{isAvailable ? "Available" : "Unavailable"}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
              <span className="text-base-content/55">Courier fee</span>
              <span className="font-bold">${Number(book.price || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-base-content/55">Gallery images</span>
              <span className="font-bold">{galleryImages.length}</span>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-6 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="badge badge-warning font-bold">Reviews</span>
            <h2 className="mt-4 text-3xl font-black">Reader feedback</h2>
          </div>
          <div className="rounded-2xl bg-base-200 px-5 py-3 text-right">
            <p className="text-2xl font-black text-amber-600">
              {rating ? rating.toFixed(1) : "0.0"}
            </p>
            <p className="text-sm text-base-content/55">
              {reviewCount ? `${reviewCount} reviews` : "No reviews yet"}
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-3xl leading-8 text-base-content/65">
          {reviewCount
            ? "Ratings are collected from reader borrowing experiences."
            : "This book has not received reader feedback yet. Reviews can be added later when the review feature is connected to the order history."}
        </p>
      </section>

      {relatedBooks.length > 0 && (
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="badge badge-warning font-bold">Related</span>
              <h2 className="mt-4 text-3xl font-black">More from this category</h2>
            </div>
            <Link to={`/books?category=${encodeURIComponent(book.category || "")}`} className="btn btn-outline">
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedBooks.map((item) => (
              <article
                key={item._id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="badge badge-warning w-fit font-bold">
                    {item.category || "Book"}
                  </span>
                  <h3 className="mt-3 line-clamp-2 text-lg font-black">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-base-content/60">
                    By {item.author || "Unknown author"}
                  </p>
                  <Link
                    to={`/books/${item._id}`}
                    className="btn btn-sm mt-auto border-none bg-amber-600 text-white hover:bg-amber-700"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-label="Close order modal"
            onClick={() => {
              if (!submitting) setIsModalOpen(false);
            }}
          />

          <div className="details-fade relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-base-300 pb-5">
              <div>
                <h3 className="text-2xl font-black">Place Your Order</h3>
                <p className="mt-2 text-sm text-base-content/60">
                  Confirm your contact details so the library courier can
                  prepare the delivery.
                </p>
              </div>
              <button
                type="button"
                disabled={submitting}
                onClick={() => setIsModalOpen(false)}
                className="btn btn-circle btn-sm"
                aria-label="Close order modal"
              >
                ✕
              </button>
            </div>

          <form onSubmit={handleOrder} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="order-name">
                  Name
                </label>
                <input
                  id="order-name"
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label" htmlFor="order-email">
                  Email
                </label>
                <input
                  id="order-email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="order-phone">
                Phone Number
              </label>
              <input
                id="order-phone"
                type="tel"
                name="phone"
                placeholder="e.g. +880 17XXXXXXXX"
                required
                pattern="[0-9+\\-\\s()]{7,20}"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label" htmlFor="order-address">
                Delivery Address
              </label>
              <textarea
                id="order-address"
                name="address"
                placeholder="Enter your full delivery address"
                required
                className="textarea textarea-bordered min-h-28 w-full"
              />
            </div>

            <button
              disabled={submitting}
              className="btn w-full border-none bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Place Order"
              )}
            </button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
