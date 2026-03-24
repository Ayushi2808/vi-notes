import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);

  if (!userId) {
    return showLogin ? (
      <Login setUserId={setUserId} setShowLogin={setShowLogin} />
    ) : (
      <Register setShowLogin={setShowLogin} />
    );
  }

  return <Home />;
}

export default App;
