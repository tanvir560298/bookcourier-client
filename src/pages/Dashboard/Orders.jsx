import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    if (!user) return;

    user.getIdToken().then((token) => {
      fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setOrders(Array.isArray(data) ? data : []))
        .catch(() => toast.error("Failed to load orders"));
    });
  };


 useEffect(() => {
    loadOrders();
  }, [user]);

  const handleStatusChange = (id, status) => {
    fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Order status updated");
          loadOrders();
        }
      });
  };

  const handleCancel = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/cancel`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Order cancelled");
          loadOrders();
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">Orders</h2>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-2xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>User</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Cancel</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.bookTitle}</td>
                <td>{order.userEmail}</td>

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

                <td>
                  <span
                    className={`badge ${
                      order.status === "delivered"
                        ? "badge-success"
                        : order.status === "cancelled"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    value={order.status}
                    disabled={order.status === "cancelled"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="select select-bordered select-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                <td>
                  {order.status !== "cancelled" ? (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm bg-red-500 text-white border-none"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">Cancelled</span>
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

export default Orders;