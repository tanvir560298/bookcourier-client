import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadBooks = () => {
    setError("");

    fetch(`${import.meta.env.VITE_API_URL}/admin/books`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load books");
        }

        return data;
      })
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => {
        setBooks([]);
        setError(err.message || "Failed to load books");
        toast.error(err.message || "Failed to load books");
      });
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

  const handleEditBook = (event) => {
    event.preventDefault();

    if (!editingBook?._id) return;

    const form = event.target;
    const primaryImage = form.image.value.trim();
    const extraImages = form.images.value
      .split(/\r?\n/)
      .map((image) => image.trim())
      .filter(Boolean);

    const updatedBook = {
      title: form.title.value.trim(),
      image: primaryImage,
      images: [...new Set([primaryImage, ...extraImages])],
      author: form.author.value.trim(),
      category: form.category.value.trim(),
      price: Number(form.price.value),
      status: form.status.value,
      available: form.available.value === "true",
      description: form.description.value.trim(),
    };

    if (updatedBook.price < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    setSaving(true);

    fetch(`${import.meta.env.VITE_API_URL}/books/${editingBook._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update book");
        return data;
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Book updated successfully");
          setEditingBook(null);
          loadBooks();
        }
      })
      .catch((error) => toast.error(error.message || "Failed to update book"))
      .finally(() => setSaving(false));
  };

  return (
    <div>
      <div className="mb-8">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Admin catalog
        </span>
        <h2 className="mt-3 text-4xl font-black">Manage Books</h2>
        <p className="mt-2 text-base-content/60">
          Edit, publish, unpublish, or remove catalog entries.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-error/20 bg-error/10 p-4 text-sm text-error">
          {error}
        </div>
      )}

      <div className="w-full overflow-x-auto">
  <table className="table table-xs md:table-md bg-base-100 rounded-2xl min-w-[820px] border border-base-300">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Book</th>
              <th>Author</th>
              <th>Status</th>
              <th>Edit</th>
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
                  <button
                    onClick={() => setEditingBook(book)}
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </button>
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

      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-label="Close edit modal"
            onClick={() => {
              if (!saving) setEditingBook(null);
            }}
          />

          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-base-300 pb-4">
              <div>
                <h3 className="text-2xl font-black">Edit Book</h3>
                <p className="mt-1 text-sm text-base-content/60">
                  Update catalog information and availability.
                </p>
              </div>
              <button
                disabled={saving}
                onClick={() => setEditingBook(null)}
                className="btn btn-circle btn-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditBook} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="title"
                  defaultValue={editingBook.title || ""}
                  placeholder="Book title"
                  required
                  className="input input-bordered w-full"
                />
                <input
                  name="image"
                  type="url"
                  defaultValue={editingBook.image || ""}
                  placeholder="Image URL"
                  required
                  className="input input-bordered w-full"
                />
                <input
                  name="author"
                  defaultValue={editingBook.author || ""}
                  placeholder="Author"
                  required
                  className="input input-bordered w-full"
                />
                <input
                  name="category"
                  defaultValue={editingBook.category || ""}
                  placeholder="Category"
                  required
                  className="input input-bordered w-full"
                />
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={editingBook.price || 0}
                  placeholder="Courier fee"
                  required
                  className="input input-bordered w-full"
                />
                <select
                  name="status"
                  defaultValue={editingBook.status || "published"}
                  className="select select-bordered w-full"
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
                <select
                  name="available"
                  defaultValue={editingBook.available === false ? "false" : "true"}
                  className="select select-bordered w-full md:col-span-2"
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </div>

              <textarea
                name="description"
                defaultValue={editingBook.description || ""}
                placeholder="Book description"
                className="textarea textarea-bordered min-h-28 w-full"
              />

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">
                    Gallery images
                  </span>
                  <span className="label-text-alt text-base-content/50">
                    One URL per line
                  </span>
                </div>
                <textarea
                  name="images"
                  defaultValue={(editingBook.images?.length
                    ? editingBook.images
                    : [editingBook.image]
                  )
                    .filter(Boolean)
                    .join("\n")}
                  placeholder="https://example.com/book-detail-image.jpg"
                  className="textarea textarea-bordered min-h-28 w-full"
                />
              </label>

              <button
                disabled={saving}
                className="btn w-full border-none bg-amber-600 text-white hover:bg-amber-700"
              >
                {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
