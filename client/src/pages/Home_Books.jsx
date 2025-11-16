import { useState, useEffect } from "react";

export default function Home_Books({ api_url }) {
  const [showAddBook, setShowAddBook] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);

  // Fetch books from backend
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

  // Add or update book
  const handleSubmit = async (formData) => {
    try {
      const method = editingBookId ? "PUT" : "POST";
      const endpoint = editingBookId
        ? `${api_url}/api/user_library/${editingBookId}`
        : `${api_url}/api/user_library`;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchBooks();
        setEditingBookId(null);
        setShowAddBook(false);
      } else {
        console.error("Error saving");
      }
    } catch (err) {
      console.error("Error submitting", err);
    }
  };

  // Delete book
  const handleDeleteBook = async (id) => {
    try {
      const res = await fetch(`${api_url}/api/user_library/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) fetchBooks();
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  // Edit button
  const handleEditBook = (book) => {
    setEditingBookId(book.id);
    setShowAddBook(true);
  };

  // Favorite
  const handleFavorite = async (id) => {
    try {
      const res = await fetch(`${api_url}/api/user_library/${id}/favorite`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) fetchBooks();
    } catch (err) {
      console.error("Error marking favorite", err);
    }
  };

  const recentlyAdded = books.slice(0, 6);

  return (
    <div className="min-h-screen text-center p-8"> 
      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-8">
          Create your personal reading universe
        </h1>

        <div className="mb-8"></div>

        <p className="text-lg mb-8 ">
          Add your books with title, author, genre, description, rating, and
          status. Never lose track of your favorite reads again! Keep track of
          what you are reading and what you've completed in your library.
        </p>

        
        <div className="mb-8"></div>

            {/* Buttons */}
      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => {
            setEditingBookId(null);
            setShowAddBook(true);
          }}
          className="bg-indigo-100 hover:bg-indigo-200 text-gray-800 font-medium py-3 px-8 rounded-xl shadow-sm transition"
        >
          Add a Book 📖
        </button>
      </div>


        <div className="mb-8"></div>

        {books.length === 0 ? (
          <p className="text-gray-600 text-lg">No books added yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white/80 border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-bold text-lg mb-1 text-gray-900">
                  {book.title}
                </h4>

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Author:</span>{" "}
                  {book.author}
                </p>

                {book.genre && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Genre:</span>{" "}
                    {book.genre}
                  </p>
                )}

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Rating:</span>{" "}
                  {"⭐".repeat(book.rating)}
                </p>

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Status:</span>{" "}
                  {book.reading_status}
                </p>

                {book.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {book.description.length > 100
                      ? book.description.slice(0, 100) + "..."
                      : book.description}
                  </p>
                )}

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Favorite:</span>{" "}
                  {book.favorite ? "❤️ Yes" : "🤍 No"}
                </p>

                <div className="flex justify-between mt-3 gap-3">
                  <button
                    onClick={() => handleEditBook(book)}
                    className="px-3 py-1 bg-blue-500 rounded-lg hover:bg-blue-600 text-sm text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-500 text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleFavorite(book.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
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

      <div className="mb-8"></div>


      {/* Add Book Model */}
      {showAddBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 px-4">
          <div className="bg-gray-50 border border-gray-200 p-10 rounded-3xl shadow-lg w-full max-w-2xl text-left">
            <h2 className="text-3xl font-semibold mb-6 text-gray-600">
              {editingBookId ? "Edit Book" : "Add a New Book"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target);

                handleSubmit({
                  title: data.get("title"),
                  author: data.get("author"),
                  genre: data.get("genre"),
                  rating: parseInt(data.get("rating")),
                  reading_status: data.get("reading_status"),
                  description: data.get("description"),
                });

                e.target.reset();
              }}
              className="space-y-5"
            >
              <input
                name="title"
                placeholder="Book Title"
                defaultValue={
                  editingBookId
                    ? books.find((b) => b.id === editingBookId)?.title
                    : ""
                }
                className="border border-gray-300 p-5 rounded-lg w-full focus:outline-indigo-400 text-lg"
                required
              />

              <input
                name="author"
                placeholder="Author"
                defaultValue={
                  editingBookId
                    ? books.find((b) => b.id === editingBookId)?.author
                    : ""
                }
                className="border border-gray-300 p-5 rounded-lg w-full focus:outline-indigo-400 text-lg"
                required
              />

              <input
                name="genre"
                placeholder="Genre"
                defaultValue={
                  editingBookId
                    ? books.find((b) => b.id === editingBookId)?.genre
                    : ""
                }
                className="border border-gray-300 p-5 rounded-lg w-full focus:outline-indigo-400 text-lg"
              />

              <select
                name="rating"
                defaultValue={
                  editingBookId
                    ? books.find((b) => b.id === editingBookId)?.rating
                    : ""
                }
                className="border border-gray-300 p-5 rounded-lg w-full focus:outline-indigo-400 text-lg"
                required
              >
                <option value="" disabled>
                  Rating (1–5)
                </option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <select
                name="reading_status"
                defaultValue={
                  editingBookId
                    ? books.find((b) => b.id === editingBookId)?.reading_status
                    : ""
                }
                className="border border-gray-300 p-5 rounded-lg w-full focus:outline-indigo-400 text-lg"
                required
              >
                <option value="" disabled>
                  Reading Status
                </option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
              </select>

              <textarea
                name="description"
                placeholder="Description"
                rows="6"
                defaultValue={
                  editingBookId
                    ? books.find((b) => b.id === editingBookId)?.description
                    : ""
                }
                className="border border-gray-300 p-5 rounded-lg w-full focus:outline-indigo-400 text-lg"
              ></textarea>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddBook(false)}
                  className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                  {editingBookId ? "Save Changes" : "Saved"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      

    
    </div>
  );
}
