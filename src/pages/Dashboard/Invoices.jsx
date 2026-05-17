import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const Invoices = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, [user?.email]);

  if (payments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4">No Invoices Found</h2>
          <p className="text-gray-500">
            You have not made any payments yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">Invoices</h2>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-2xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Payment ID</th>
              <th>Book</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.bookTitle}</td>
                <td>${payment.amount || 0}</td>
                <td>
                  {payment.paymentDate
                    ? new Date(payment.paymentDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;