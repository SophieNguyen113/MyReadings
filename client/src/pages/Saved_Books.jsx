import { useState, useEffect } from "react";
import SavedBooks from "../components/SavedBooks";

export default function Saved_Books({ api_url }) {
  const [savedBooks, setSavedBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const res = await fetch(`${api_url}/api/books`, {
          credentials: "include",
        });
        const data = await res.json();

        setSavedBooks(data.books);
        let formattedBooks;
        if (!data.books || data.books.length === 0) {
          formattedBooks = ["None"];
        }
  
        formattedBooks = data.books.map((book) => {
          const title = book.title || "Unknown Title";
          const author = book.author || "Unknown Author";
          return `${title} (${author})`;
        });

        setBooks(formattedBooks);
      } catch (error) {
        console.error("Failed to fetch saved books:", error);
      }
    };

    fetchSavedBooks();
  }, [api_url]);

  return (
    <div>
      <h1>Saved Books</h1>
      <SavedBooks savedBooks={savedBooks} api_url={api_url} />
    </div>
  );
}
