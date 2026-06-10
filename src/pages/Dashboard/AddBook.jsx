import { useState } from "react";
import toast from "react-hot-toast";
import { FiBookOpen, FiDollarSign, FiImage, FiPenTool, FiPlus } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const AddBook = () => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleAddBook = (event) => {
    event.preventDefault();

    const form = event.target;
    const price = Number(form.price.value);

    if (price < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    const primaryImage = form.image.value.trim();
    const extraImages = form.images.value
      .split(/\r?\n/)
      .map((image) => image.trim())
      .filter(Boolean);

    const book = {
      title: form.title.value.trim(),
      image: primaryImage,
      images: [...new Set([primaryImage, ...extraImages])],
      author: form.author.value.trim(),
      category: form.category.value.trim(),
      price,
      status: form.status.value,
      available: true,
      librarianEmail: user?.email,
      librarianName: user?.displayName,
      createdAt: new Date(),
    };

    setSubmitting(true);

    fetch(`${import.meta.env.VITE_API_URL}/books`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to add book");
        }

        return data;
      })
      .then((data) => {
        if (data.insertedId) {
          toast.success("Book added successfully");
          form.reset();
        }
      })
      .catch((err) => toast.error(err.message || "Failed to add book"))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Librarian tool
        </span>
        <h1 className="mt-3 text-4xl font-black">Add Book</h1>
        <p className="mt-2 text-base-content/60">
          Create a new catalog item for readers to discover and request.
        </p>
      </div>

      <form
        onSubmit={handleAddBook}
        className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="input input-bordered flex items-center gap-2">
            <FiBookOpen className="text-base-content/40" />
            <input
              type="text"
              name="title"
              placeholder="Book title"
              required
              className="grow"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <FiImage className="text-base-content/40" />
            <input
              type="url"
              name="image"
              placeholder="Book image URL"
              required
              className="grow"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <FiPenTool className="text-base-content/40" />
            <input
              type="text"
              name="author"
              placeholder="Author name"
              required
              className="grow"
            />
          </label>

          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            className="input input-bordered w-full"
          />

          <label className="input input-bordered flex items-center gap-2">
            <FiDollarSign className="text-base-content/40" />
            <input
              type="number"
              name="price"
              placeholder="Courier fee"
              min="0"
              step="0.01"
              required
              className="grow"
            />
          </label>

          <select name="status" required className="select select-bordered w-full">
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <label className="form-control mt-4">
          <div className="label">
            <span className="label-text font-semibold">
              Gallery images
            </span>
            <span className="label-text-alt text-base-content/50">
              Optional, one URL per line
            </span>
          </div>
          <textarea
            name="images"
            placeholder="https://example.com/book-cover-side.jpg"
            className="textarea textarea-bordered min-h-28 w-full"
          />
        </label>

        <button
          disabled={submitting}
          className="btn mt-6 w-full border-none bg-amber-600 text-white hover:bg-amber-700"
        >
          {submitting ? <span className="loading loading-spinner loading-sm" /> : <FiPlus />}
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
