import { useState, useEffect } from "react";

export default function Home_Books({ api_url }) {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    rating: "",
    reading_status: "",
  });
  const [editingBookId, setEditingBookId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${api_url}/api/user_library`, {
        credentials: "include",
      });
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingBookId ? "PUT" : "POST";
      const endpoint = editingBookId
        ? `${api_url}/api/user_library/${editingBookId}`
        : `${api_url}/api/user_library`;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        fetchBooks();
        setForm({
          title: "",
          author: "",
          genre: "",
          description: "",
          rating: "",
          reading_status: "",
        });
        setEditingBookId(null);
      } else {
        console.error(data.error || "Error submitting form");
      }
    } catch (err) {
      console.error("Error submitting book", err);
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditingBookId(book.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${api_url}/api/user_library/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        fetchBooks();
      } else {
        console.error(data.error || "Error deleting");
      }
    } catch (err) {
      console.error("Error deleting book", err);
    }
  };

  const handleFavorite = async (bookId) => {
    try {
      const res = await fetch(`${api_url}/api/user_library/${bookId}/favorite`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        fetchBooks();
      } else {
        console.error(data.error || "Error marking as favorite");
      }
    } catch (err) {
      console.error("Error marking book as favorite", err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editingBookId ? "Edit Book" : "Add a Book"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-gray-100 p-4 rounded shadow">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="reading_status"
            value={form.reading_status}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Status</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingBookId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Your Library</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-md p-4 space-y-2">
              <div className="text-left space-y-1">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p><span className="font-semibold text-gray-500">Author:</span> {book.author}</p>
                <p><span className="font-semibold text-gray-500">Genre:</span> {book.genre}</p>
                <p><span className="font-semibold text-gray-500">Rating:</span> {book.rating}</p>
                <p><span className="font-semibold text-gray-500">Description:</span> {book.description || "No description."}</p>
                <p><span className="font-semibold text-gray-500">Status:</span> {book.reading_status}</p>
                <p><span className="font-semibold text-gray-500">Favorite:</span> {book.favorite ? "Yes" : "No"}</p>
              </div>

              <div className="flex justify-between mt-3 space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
                <button
                onClick={() => handleFavorite(book.id)}
                className={`flex-1 px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  book.favorite
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
                >
                  {book.favorite ? "❤️ Saved" : "🤍 Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
