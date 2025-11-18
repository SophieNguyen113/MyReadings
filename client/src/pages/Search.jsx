import Categories from "../components/Categories";
import GoogleBooks from "../components/GoogleBooks";
import Searchbar from "../components/Searchbar";

export default function Search({api_url}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Search Bar */}
        <div className="mb-8">
          <Searchbar>Search for books by title, author, or keyword...</Searchbar>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-8">
          
          {/* Left Sidebar - Filters/Categories */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
                </svg>
                Filter by Category
              </h2>
              <Categories />
            </div>
          </aside>

          {/* Right Side - Book Results */}
          <main className="flex-1">
            <GoogleBooks api_url={api_url}/>
          </main>

        </div>
      </div>
    </div>
  );
}