import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoogleBooks } from "../features/booksSlice";
import GoogleBook from "./GoogleBook";

export default function GoogleBooks({api_url}) {
  const [errorMsg, setErrorMsg] = useState("");

  const { googleBooks, filteredGoogleBooks, selectedCategory, searchQuery } =
    useSelector((state) => state.books);

  const apiKey = import.meta.env.VITE_API_KEY;
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40&key=${apiKey}`;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoogleBooks = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch google books data");
        }
        const data = await res.json();
        dispatch(setGoogleBooks(data.items));
      } catch (err) {
        setErrorMsg(err.message);
      }
    };

    fetchGoogleBooks();
  }, [searchQuery]);

  if (errorMsg) return <h3>{errorMsg}</h3>;

  return (
    <ul className="grid grid-cols-4 gap-2">
      {(selectedCategory ? filteredGoogleBooks : googleBooks).map((book) => (
        <li key={book.id} style={{listStyle: 'None'}}>
          <GoogleBook book={book} api_url={api_url}/>
        </li>
      ))}
    </ul>
  );
}
