import SavedBook from "./SavedBook";

export default function SavedBooks({savedBooks, api_url}) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {savedBooks?.map((savedBook) => (
        <li key={savedBook.id} className="list-none">
          <SavedBook savedBook={savedBook} api_url={api_url} />
        </li>
      ))}
    </ul>
  );
}