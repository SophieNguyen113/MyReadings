import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedBook({ savedBook, api_url }) {
  const { id, title, image, language, description, pagecount, authors, categories } =
    savedBook;

  const [languageName, setLanguageName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [removing, setRemoving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguageName = async () => {
      try {
        const response = await fetch(`${api_url}/languages/${language}`);
        if (!response.ok) {
          throw new Error(`Error fetching language: ${response.statusText}`);
        }
        const data = await response.json();
        setLanguageName(data.name);
      } catch (error) {
        console.error("Failed to fetch language name:", error);
        setLanguageName("Unknown");
      }
    };

    if (language) {
      fetchLanguageName();
    }
  }, [language, api_url]);

  // Fetch existing rating
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(`${api_url}/api/books/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch rating");
        const data = await res.json();
        // Assuming the backend stores rating in a field called 'rating' or 'pagesread'
        // You may need to adjust this based on your backend structure
        setRating(data.rating || 0);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchRating();
  }, [id, api_url]);

  // Update rating on backend
  const handleRatingClick = async (newRating) => {
    setRating(newRating);
    
    try {
      const res = await fetch(`${api_url}/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ rating: newRating }),
      });

      if (!res.ok) {
        throw new Error("Failed to update rating");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const removeSavedBook = async () => {
    setRemoving(true);
    try {
      const res = await fetch(`${api_url}/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        navigate(0);
      } else {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      setRemoving(false);
    }
  };

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 h-full flex flex-col">
      
      {/* Book Cover */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex items-center justify-center h-64">
        <img
          src={image || "/placeholder.png"}
          alt={title || "Book Cover"}
          className="max-h-full max-w-full object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        {categories && categories.length > 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full shadow-md">
            {categories[0]}
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Title */}
        <h3 className="font-bold text-lg text-amber-900 mb-2 line-clamp-2 leading-tight">
          {title || "Unknown Title"}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          {authors || "Unknown Author"}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          {/* Page Count */}
          {pagecount && (
            <div className="flex items-center text-gray-600">
              <svg className="w-3.5 h-3.5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              <span>{pagecount} pages</span>
            </div>
          )}

          {/* Language */}
          {languageName && (
            <div className="flex items-center text-gray-600">
              <svg className="w-3.5 h-3.5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd"/>
              </svg>
              <span className="truncate">{languageName}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3 flex-1">
          {description || "No description available for this book."}
        </p>

        {/* 5-Star Rating System */}
        <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-gray-600 mb-2 font-medium">Rate this book:</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`w-8 h-8 transition-colors duration-200 ${
                    star <= (hoveredRating || rating)
                      ? "text-amber-500"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-xs text-amber-700 mt-2">
              You rated this book {rating} {rating === 1 ? "star" : "stars"}
            </p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={removeSavedBook}
          disabled={removing}
          className={`
            w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${
              removing
                ? "bg-gray-100 text-gray-500 cursor-wait"
                : "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            }
          `}
        >
          {removing ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Removing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              <span>Remove from Library</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
