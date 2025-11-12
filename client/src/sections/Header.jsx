import Nav from "../components/Nav";
import UserAvatar from "../components/UserAvatar";

export default function Header({user, api_url}) {
  const AUTH_URL_LOGIN = `${api_url}/auth/github`;
  
  return (
    <header className="header flex justify-between items-center px-8 py-4 w-full bg-white border-b-2 border-amber-100 shadow-md">      
      {/* Logo Section - LEFT */}
      <div className="flex items-center space-x-3">
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <rect x="8" y="6" width="28" height="36" rx="2" fill="#7C2D12" />
          <rect x="12" y="6" width="28" height="36" rx="2" fill="#9A3412" />
          <path d="M16 10 L16 38" stroke="#D97706" strokeWidth="2" />
          <rect x="20" y="16" width="16" height="2" rx="1" fill="#FEF3C7" />
          <rect x="20" y="22" width="14" height="2" rx="1" fill="#FEF3C7" />
          <rect x="20" y="28" width="12" height="2" rx="1" fill="#FEF3C7" />
        </svg>
        <div className="flex flex-col">
          <h1 className="text-amber-900 text-2xl font-bold leading-tight">MyReadings</h1>
          <span className="text-amber-600 text-xs font-medium">Your Literary Journey</span>
        </div>
      </div>

      {/* Navigation - CENTER */}
      <Nav user={user} api_url={api_url}/>
      
      {/* Login Button or Avatar - RIGHT */}
      {user && user.id ? (
        <UserAvatar user={user} />
      ) : (
        <a
          href={AUTH_URL_LOGIN}
          className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Login with GitHub</span>
        </a>
      )}
    </header>
  );
}

