import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load your books");
        }

        return data;
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setBooks(list.filter((book) => book.librarianEmail === user?.email));
      })
      .catch((err) => {
        setBooks([]);
        setError(err.message || "Failed to load your books");
        toast.error(err.message || "Failed to load your books");
      });
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">My Books</h2>

      {error ? (
        <div className="rounded-2xl border border-error/20 bg-error/10 p-5 text-error">
          {error}
        </div>
      ) : books.length === 0 ? (
        <p className="text-gray-500">You have not added any books yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table bg-base-200 rounded-2xl">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Book Name</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-xl"
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>
                    <span className="badge badge-warning">
                      {book.status || "published"}
                    </span>
                  </td>
                  <td>${book.price || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
