import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleOrder = (e) => {
    e.preventDefault();

    const form = e.target;

    const order = {
      bookId: book._id,
      bookTitle: book.title,
      author: book.author,
      image: book.image,
      category: book.category,
      price: book.price || 0,

      userName: user?.displayName,
      userEmail: user?.email,

      phone: form.phone.value,
      address: form.address.value,
    };

    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Order placed successfully");
          document.getElementById("order_modal").close();
          form.reset();
        }
      });
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src={book.image}
            alt={book.title}
            className="w-full rounded-3xl shadow-2xl"
          />
        </div>

        <div>
          <div className="badge badge-warning text-black mb-4">
            {book.category}
          </div>

          <h2 className="text-5xl font-extrabold">{book.title}</h2>

          <p className="text-xl text-gray-500 mt-4">By {book.author}</p>

          <p className="mt-6 text-gray-500 leading-8">
            This book is available in our BookCourier delivery system. You can
            order this book and get library-to-home delivery easily.
          </p>

          <div className="mt-8 space-y-3">
            <p>
              <span className="font-bold">Availability:</span>{" "}
              {book.available ? "Available" : "Unavailable"}
            </p>

            <p>
              <span className="font-bold">Price:</span> ${book.price || 0}
            </p>

            <p>
              <span className="font-bold">Library:</span> Dhaka Central Library
            </p>

            <p>
              <span className="font-bold">Delivery:</span> Available
            </p>
          </div>

          <button
            onClick={() => document.getElementById("order_modal").showModal()}
            className="btn bg-amber-600 text-white border-none mt-8"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Order Modal */}
      <dialog id="order_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">Place Your Order</h3>

          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Address</label>
              <textarea
                name="address"
                placeholder="Enter your full address"
                required
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button className="btn bg-amber-600 text-white border-none w-full">
              Place Order
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;