import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BorrowedBooks = () => {
  const { user, token, handleAuthError } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const loadOrders = useCallback(() => {
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
          handleAuthError(err.message);
          setOrders([]);
          setError(err.message || "Failed to load orders");
          toast.error(err.message || "Failed to load orders");
        })
        .finally(() => setLoading(false));
    });
  }, [handleAuthError, user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCancel = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/cancel`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to cancel order");
        return data;
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Order cancelled successfully");
          loadOrders();
        }
      })
      .catch((error) => {
        handleAuthError(error.message);
        toast.error(error.message || "Failed to cancel order");
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
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentInfo),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to pay order");
        return data;
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Payment successful");
          loadOrders();
        }
      })
      .catch((error) => {
        handleAuthError(error.message);
        toast.error(error.message || "Failed to pay order");
      });
  };

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders
      .filter((order) => {
        const matchesSearch =
          !normalizedSearch ||
          [order.bookTitle, order.status, order.paymentStatus]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch));
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "amount-high") return Number(b.price || 0) - Number(a.price || 0);
        if (sortBy === "amount-low") return Number(a.price || 0) - Number(b.price || 0);
        return new Date(b.orderDate || b._id).getTime() - new Date(a.orderDate || a._id).getTime();
      });
  }, [orders, search, sortBy, statusFilter]);

  const totalPages = Math.max(Math.ceil(filteredOrders.length / pageSize), 1);
  const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, statusFilter]);

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

      <div className="mb-5 grid gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Filter by book, status, payment"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="input input-bordered w-full md:col-span-2"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="select select-bordered w-full"
        >
          <option value="all">All status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="select select-bordered w-full"
        >
          <option value="newest">Newest first</option>
          <option value="amount-high">Amount high-low</option>
          <option value="amount-low">Amount low-high</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-2xl min-w-[820px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{(page - 1) * pageSize + index + 1}</td>
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

                <td>
                  {order.bookId ? (
                    <Link to={`/books/${order.bookId}`} className="btn btn-sm btn-outline">
                      View
                    </Link>
                  ) : (
                    <span className="text-sm text-base-content/50">N/A</span>
                  )}
                </td>

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

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-base-content/60">
          Showing {paginatedOrders.length} of {filteredOrders.length} orders
        </p>
        <div className="join">
          <button
            className="btn join-item btn-sm"
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(value - 1, 1))}
          >
            Prev
          </button>
          <button className="btn join-item btn-sm">Page {page} / {totalPages}</button>
          <button
            className="btn join-item btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooks;
