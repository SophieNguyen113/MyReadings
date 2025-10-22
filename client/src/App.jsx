import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";

import "./App.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Home_Books from "./pages/Home_Books";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Saved_Books from "./pages/Saved_Books";
import Chatbot from "./pages/Chatbot";

function App() {
  const [user, setUser] = useState(null);
  const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.user);
    };

    getUser();
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element: user && user.id ? <Home_Books api_url={API_URL} /> : <Homepage api_url={API_URL} />,
    },
    {
      path: "/search",
      element:
        user && user.id ? (
          <Search api_url={API_URL} />
        ) : (
          <Homepage api_url={API_URL} />
        ),
    },
    {
      path: "/saved_books",
      element:
        user && user.id ? (
          <Saved_Books api_url={API_URL} />
        ) : (
          <Homepage api_url={API_URL} />
        ),
    },
    {
      path: "/chatbot",
      element:
        user && user.id ? (
          <Chatbot api_url={API_URL} />
        ) : (
          <Homepage api_url={API_URL} />
        ),
    },
  ]);

  return (
    <div className="prose lg:prose-lg max-w-[1440px] m-auto w-full h-full min-h-screen scroll-smooth">
      <Header user={user} api_url={API_URL} />
      <div className="mt-[120px]">{element}</div>
      <Footer />
    </div>
  );
}

export default App;
