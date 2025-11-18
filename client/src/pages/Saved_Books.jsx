import { useState, useEffect } from "react";
import SavedBooks from "../components/SavedBooks";

export default function Saved_Books({ api_url }) {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const res = await fetch(`${api_url}/api/books`, {
          credentials: "include",
        });
        const data = await res.json();
        setSavedBooks(data.books || []);
      } catch (error) {
        console.error("Failed to fetch saved books:", error);
        setSavedBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, [api_url]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-amber-900 mb-3">My Saved Books</h1>
          <p className="text-xl text-gray-600">Your personal reading collection</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your books...</p>
          </div>
        ) : savedBooks.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="w-24 h-24 text-amber-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">No Saved Books Yet</h3>
            <p className="text-gray-600 mb-6">Start building your library by searching and saving books!</p>
            <a 
              href="/search"
              className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Browse Books
            </a>
          </div>
        ) : (
          /* Books Grid */
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {savedBooks.length} {savedBooks.length === 1 ? "book" : "books"} in your library
              </p>
            </div>
            <SavedBooks savedBooks={savedBooks} api_url={api_url} />
          </>
        )}
      </div>
    </div>
  );
}