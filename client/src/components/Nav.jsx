import { NavLink } from 'react-router-dom';

export default function Nav({ user, api_url }) {
  const AUTH_URL = `${api_url}/auth/logout`;

  const logout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(AUTH_URL, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
      const json = await response.json();
      console.log(json);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="flex-1 flex justify-center">
      <ul className="flex items-center gap-2 list-none">
        {user && user.id && (
          <>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-800'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/search" 
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-800'
                  }`
                }
              >
                Search
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/saved_books" 
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-800'
                  }`
                }
              >
                📚 My Books
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/chatbot" 
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-800'
                  }`
                }
              >
                💬 Chat
              </NavLink>
            </li>
            <li className="ml-2">
              <a
                href="/"
                onClick={logout}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}