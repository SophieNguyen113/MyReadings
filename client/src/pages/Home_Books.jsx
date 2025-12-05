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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 pt-24 pb-12">
      <div className="container mx-auto px-6 text-center"> 
        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold mb-8 text-amber-900">
            Create your personal reading universe
          </h1>

          <div className="mb-8"></div>

          <p className="text-lg mb-8 text-amber-900/80">
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
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium py-3 px-8 rounded-xl shadow-sm transition border border-amber-200"
          >
            Add a Book 📖
          </button>
        </div>


          <div className="mb-8"></div>

          {books.length === 0 ? (
            <p className="text-amber-800 text-lg">No books added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-amber-100 p-6 text-left"
                >
                  <h4 className="font-bold text-lg mb-2 text-amber-900">
                    {book.title}
                  </h4>

                  <p className="text-amber-900/80 mb-1">
                    <span className="font-medium">Author:</span>{" "}
                    {book.author}
                  </p>

                  {book.genre && (
                    <p className="text-amber-900/80 mb-1">
                      <span className="font-medium">Genre:</span>{" "}
                      {book.genre}
                    </p>
                  )}

                  <p className="text-amber-900/80 mb-1">
                    <span className="font-medium">Rating:</span>{" "}
                    {"⭐".repeat(book.rating)}
                  </p>

                  <p className="text-amber-900/80 mb-2">
                    <span className="font-medium">Status:</span>{" "}
                    {book.reading_status}
                  </p>

                  {book.description && (
                    <p className="text-amber-900/70 text-sm mt-2">
                      {book.description.length > 100
                        ? book.description.slice(0, 100) + "..."
                        : book.description}
                    </p>
                  )}

                  <p className="text-amber-900/80 mb-3">
                    <span className="font-medium">Favorite:</span>{" "}
                    {book.favorite ? "❤️ Yes" : "🤍 No"}
                  </p>

                  <div className="flex justify-between mt-4 gap-3">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="px-3 py-1 bg-amber-500 rounded-lg hover:bg-amber-600 text-sm text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleFavorite(book.id)}
                      className={`px-3 py-1 rounded-lg text-sm transition ${
                        book.favorite
                          ? "bg-amber-700 hover:bg-amber-800 text-white"
                          : "bg-amber-400 hover:bg-amber-500 text-white"
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
            <div className="bg-white border border-amber-100 p-10 rounded-3xl shadow-lg w-full max-w-2xl text-left">
              <h2 className="text-3xl font-semibold mb-6 text-amber-900">
                {editingBookId ? "Edit Book" : ""}
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
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-amber-900">Title</label>
                  <input
                    name="title"
                    placeholder="e.g., The Pragmatic Programmer"
                    defaultValue={
                      editingBookId
                        ? books.find((b) => b.id === editingBookId)?.title
                        : ""
                    }
                    className="bg-white text-amber-900 placeholder:text-amber-400 border border-amber-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-amber-900">Author</label>
                  <input
                    name="author"
                    placeholder="e.g., Andrew Hunt"
                    defaultValue={
                      editingBookId
                        ? books.find((b) => b.id === editingBookId)?.author
                        : ""
                    }
                    className="bg-white text-amber-900 placeholder:text-amber-400 border border-amber-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-amber-900">Genre</label>
                  <input
                    name="genre"
                    placeholder="e.g., Non-fiction, Fantasy"
                    defaultValue={
                      editingBookId
                        ? books.find((b) => b.id === editingBookId)?.genre
                        : ""
                    }
                    className="bg-white text-amber-900 placeholder:text-amber-400 border border-amber-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-amber-900">Rating</label>
                  <select
                    name="rating"
                    defaultValue={
                      editingBookId
                        ? books.find((b) => b.id === editingBookId)?.rating
                        : ""
                    }
                    className="bg-white text-amber-900 border border-amber-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition appearance-none"
                    required
                  >
                    <option value="" disabled className="text-amber-400">
                      Rating (1–5)
                    </option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="text-amber-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-amber-900">Reading Status</label>
                  <select
                    name="reading_status"
                    defaultValue={
                      editingBookId
                        ? books.find((b) => b.id === editingBookId)?.reading_status
                        : ""
                    }
                    className="bg-white text-amber-900 border border-amber-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition appearance-none"
                    required
                  >
                    <option value="" disabled className="text-amber-400">
                      Reading Status
                    </option>
                    <option value="Reading" className="text-amber-900">Reading</option>
                    <option value="Completed" className="text-amber-900">Completed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-amber-900">Description</label>
                  <textarea
                    name="description"
                    placeholder="Add a brief description..."
                    rows="6"
                    defaultValue={
                      editingBookId
                        ? books.find((b) => b.id === editingBookId)?.description
                        : ""
                    }
                    className="bg-white text-amber-900 placeholder:text-amber-400 border border-amber-200 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBook(false)}
                    className="px-6 py-3 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 border border-amber-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                  >
                    {editingBookId ? "Save Changes" : "Saved"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
