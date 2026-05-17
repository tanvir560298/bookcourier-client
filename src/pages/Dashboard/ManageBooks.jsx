import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  const loadBooks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleStatusChange = (id, status) => {
    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Book ${status} successfully`);
          loadBooks();
        }
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) return;

    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Book deleted successfully");
          loadBooks();
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8">Manage Books</h2>

      <div className="w-full overflow-x-auto">
  <table className="table table-xs md:table-md bg-base-200 rounded-2xl min-w-[700px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book</th>
              <th>Author</th>
              <th>Status</th>
              <th>Publish/Unpublish</th>
              <th>Delete</th>
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
                    className="w-14 h-16 object-cover rounded-xl"
                  />
                </td>

                <td>{book.title}</td>
                <td>{book.author}</td>

                <td>
                  <span className="badge badge-warning">
                    {book.status || "published"}
                  </span>
                </td>

                <td>
                  {(book.status || "published") === "published" ? (
                    <button
                      onClick={() =>
                        handleStatusChange(book._id, "unpublished")
                      }
                      className="btn btn-sm btn-warning"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(book._id, "published")}
                      className="btn btn-sm bg-green-600 text-white border-none"
                    >
                      Publish
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-sm bg-red-500 text-white border-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;