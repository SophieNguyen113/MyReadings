import { useState, useEffect } from "react";

export default function GoogleBook({ book, api_url }) {
  const [saveBook, setSaveBook] = useState(false);
  const [saving, setSaving] = useState(false);
  const [languageName, setLanguageName] = useState("");
  const languageCode = book?.volumeInfo?.language;

  useEffect(() => {
    const fetchLanguageName = async () => {
      try {
        const response = await fetch(`${api_url}/languages/${languageCode}`);
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

    if (languageCode) {
      fetchLanguageName();
    }
  }, [languageCode, api_url]);

  const toggleSaveBook = async () => {
    setSaving(true);
    const { id } = book;
    const {
      title,
      imageLinks,
      description,
      pageCount,
      language,
      authors,
      categories
    } = book?.volumeInfo;
    
    const favoriteBookObj = {
      id,
      title,
      image: imageLinks?.thumbnail || "",
      description,
      pageCount,
      language,
      authors: authors?.join(", ") || "Unknown",
      categories: categories?.join(", ") || "Uncategorized",
    };
    
    try {
      const res = await fetch(`${api_url}/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteBookObj),
        credentials: "include",
      });
      
      if (res.ok) {
        setSaveBook(true);
      }
    } catch (error) {
      console.error("Error saving book:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 h-full flex flex-col">
      
      {/* Book Cover */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex items-center justify-center h-64">
        <img
          src={book?.volumeInfo?.imageLinks?.thumbnail || "/placeholder.png"}
          alt={book?.volumeInfo?.title || "Book Cover"}
          className="max-h-full max-w-full object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        {book?.volumeInfo?.categories && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full shadow-md">
            {book.volumeInfo.categories[0]}
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Title */}
        <h3 className="font-bold text-lg text-amber-900 mb-2 line-clamp-2 leading-tight">
          {book?.volumeInfo?.title || "Unknown Title"}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          {book?.volumeInfo?.authors?.join(", ") || "Unknown Author"}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          {/* Published Date */}
          {book?.volumeInfo?.publishedDate && (
            <div className="flex items-center text-gray-600">
              <svg className="w-3.5 h-3.5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span className="truncate">{book.volumeInfo.publishedDate}</span>
            </div>
          )}

          {/* Page Count */}
          {book?.volumeInfo?.pageCount && (
            <div className="flex items-center text-gray-600">
              <svg className="w-3.5 h-3.5 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              <span>{book.volumeInfo.pageCount} pages</span>
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
          {book?.volumeInfo?.description || "No description available for this book."}
        </p>

        {/* Save Button */}
        <button
          onClick={toggleSaveBook}
          disabled={saveBook || saving}
          className={`
            w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${
              saveBook
                ? "bg-green-100 text-green-700 border-2 border-green-300 cursor-default"
                : saving
                ? "bg-gray-100 text-gray-500 cursor-wait"
                : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            }
          `}
        >
          {saving ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Saving...</span>
            </>
          ) : saveBook ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Saved to Library</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
              <span>Save to Library</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}