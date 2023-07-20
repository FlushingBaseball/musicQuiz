import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import PlaylistCollection from "./PlaylistCollection";
import Login from "./Login";
import HomePage from "./HomePage";
import Quiz from "./Quiz";
import User from "./User";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) {
    return (
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setUser={setUser}
      />
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/playlists">Playlists</Link>
          <Link to="/me">Me</Link>
        </nav>
        <NavBar user={user} setUser={setUser} />
        <main>
          <Routes>
          <Route
              path="/"
              element={
                <HomePage
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                  setUser={setUser}
                />
              }
            />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/me" element={<User user={user} />} />
            <Route path="/playlists" element={<PlaylistCollection />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

