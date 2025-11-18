import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredGoogleBooks,
  setSelectedCategory,
} from "../features/booksSlice";
import { Button, Box } from "@mui/material";
import { useEffect } from "react";

const categories = [
  { name: "All", icon: "📚" },
  { name: "Fiction", icon: "✨" },
  { name: "Science", icon: "🔬" },
  { name: "Arts", icon: "🎨" },
  { name: "Business", icon: "💼" },
  { name: "Biography", icon: "👤" },
  { name: "Literary", icon: "📖" },
  { name: "Books", icon: "📕" },
  { name: "Others", icon: "🔖" },
];

export default function Categories() {
  const { selectedCategory, googleBooks, filteredGoogleBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilteredGoogleBooks());
  }, [googleBooks, selectedCategory, dispatch]);

  const handleSelectedCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Category Buttons */}
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleSelectedCategory(category.name)}
          className={`
            w-full px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 flex items-center gap-3
            ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
            }
          `}
        >
          <span className="text-xl">{category.icon}</span>
          <span>{category.name}</span>
          {selectedCategory === category.name && (
            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          )}
        </button>
      ))}

      {/* Results Count */}
      <div className="mt-6 pt-6 border-t border-amber-200">
        {filteredGoogleBooks.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p>No books found</p>
            <p className="text-xs mt-1">Try a different search</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">
              {filteredGoogleBooks.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {filteredGoogleBooks.length === 1 ? "book found" : "books found"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}