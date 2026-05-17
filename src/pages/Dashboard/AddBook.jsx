import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const AddBook = () => {
  const { user } = useAuth();

  const handleAddBook = (e) => {
    e.preventDefault();

    const form = e.target;

    const book = {
      title: form.title.value,
      image: form.image.value,
      author: form.author.value,
      category: form.category.value,
      price: Number(form.price.value),
      status: form.status.value,
      available: true,
      librarianEmail: user?.email,
      librarianName: user?.displayName,
      createdAt: new Date(),
    };

    fetch(`${import.meta.env.VITE_API_URL}/books`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Book added successfully");
          form.reset();
        }
      });
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-extrabold mb-8">Add Book</h2>

      <form
        onSubmit={handleAddBook}
        className="bg-base-200 p-8 rounded-3xl shadow-xl space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Book name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="image"
          placeholder="Book image URL"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="author"
          placeholder="Author name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          className="input input-bordered w-full"
        />

        <select
          name="status"
          required
          className="select select-bordered w-full"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <button className="btn bg-amber-600 text-white border-none w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;