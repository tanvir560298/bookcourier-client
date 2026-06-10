import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = () => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    user.getIdToken().then((token) => {
      fetch(`${import.meta.env.VITE_API_URL}/orders?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Failed to load orders");
          }

          return data;
        })
        .then((data) => setOrders(Array.isArray(data) ? data : []))
        .catch((err) => {
          setOrders([]);
          setError(err.message || "Failed to load orders");
          toast.error(err.message || "Failed to load orders");
        })
        .finally(() => setLoading(false));
    });
  };

  useEffect(() => {
    loadOrders();
  }, [user?.email]);

  const handleCancel = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/cancel`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Order cancelled successfully");
          loadOrders();
        }
      });
  };

  const handlePayment = (order) => {
    const paymentInfo = {
      orderId: order._id,
      bookTitle: order.bookTitle,
      amount: order.price || 0,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    fetch(`${import.meta.env.VITE_API_URL}/orders/${order._id}/pay`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Payment successful");
          loadOrders();
        }
      });
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-4xl font-extrabold mb-8">My Orders</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-extrabold mb-4">Orders Unavailable</h2>
          <p className="text-gray-500">{error}</p>
          <button onClick={loadOrders} className="btn mt-6 bg-amber-600 text-white">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4">No Orders Found</h2>
          <p className="text-gray-500">You have not ordered any books yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-2xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.bookTitle}</td>
                <td>
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span
                    className={`badge ${
                      order.status === "cancelled"
                        ? "badge-error"
                        : order.status === "delivered"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td>${order.price || 0}</td>

                <td className="flex gap-2">
                  {order.status === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-sm bg-red-500 text-white border-none"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handlePayment(order)}
                          className="btn btn-sm bg-amber-600 text-white border-none"
                        >
                          Pay Now
                        </button>
                      </>
                    )}

                  {(order.status === "cancelled" ||
                    order.paymentStatus === "paid" ||
                    order.status === "shipped" ||
                    order.status === "delivered") && (
                    <span className="text-gray-500 text-sm">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowedBooks;
