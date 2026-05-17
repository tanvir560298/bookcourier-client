import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => res.json())
      .then((data) =>
        setBooks(data.filter((book) => book.librarianEmail === user?.email))
      );
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">My Books</h2>

      {books.length === 0 ? (
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