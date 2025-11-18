import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoogleBooks } from "../features/booksSlice";
import GoogleBook from "./GoogleBook";

export default function GoogleBooks({api_url}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { googleBooks, filteredGoogleBooks, selectedCategory, searchQuery } =
    useSelector((state) => state.books);

  const apiKey = import.meta.env.VITE_API_KEY;
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40&key=${apiKey}`;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoogleBooks = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch google books data");
        }
        const data = await res.json();
        dispatch(setGoogleBooks(data.items || []));
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchGoogleBooks();
    }
  }, [searchQuery]);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Searching for books...</p>
      </div>
    );
  }

  // Error State
  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="w-20 h-20 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600">{errorMsg}</p>
      </div>
    );
  }

  // Empty State (no search yet)
  if (!searchQuery || googleBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="w-24 h-24 text-amber-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 className="text-2xl font-bold text-amber-900 mb-2">Start Your Book Search</h3>
        <p className="text-gray-600">Enter a title, author, or keyword to discover amazing books</p>
      </div>
    );
  }

  const booksToDisplay = selectedCategory ? filteredGoogleBooks : googleBooks;

  return (
    <div>
      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">
          {selectedCategory && selectedCategory !== "All" ? `${selectedCategory} Books` : "Search Results"}
        </h2>
        <div className="text-sm text-gray-600">
          Showing {booksToDisplay.length} {booksToDisplay.length === 1 ? "result" : "results"}
        </div>
      </div>

      {/* Books Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksToDisplay.map((book) => (
          <li key={book.id} className="list-none">
            <GoogleBook book={book} api_url={api_url}/>
          </li>
        ))}
      </ul>
    </div>
  );
}