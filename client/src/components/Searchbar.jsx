import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/booksSlice";
import { useState } from "react";

export default function Searchbar({ children }) {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-full px-6 py-4 pr-14 text-lg text-gray-800 bg-white border-2 border-amber-200 rounded-xl shadow-md focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200"
          placeholder={children}
          value={search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      
      {/* Search Tips */}
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600">
          💡 Try searching for "fiction", "science", or your favorite author
        </p>
      </div>
    </form>
  );
}