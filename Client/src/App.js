import { useEffect, useState } from "react";
import { Route, BrowserRouter,Link , Routes } from "react-router-dom";
import NavBar from "./NavBar";
import MusicPlayer from "./MusicPlayer";
import PlaylistCollection from "./PlaylistCollection";
import Login from "./Login";
import HomePage from "./HomePage";


function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(()=>{
    fetch("/check_session").then((r)=>{
      if (r.ok){
        r.json().then((user)=> setUser(user));
      }
    });
  }, []);
  

  
    
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
      <Link to="/" >Home</Link>
      <Link to="/playlists">Playlists</Link>
      <Link to="/login">Login</Link>

      </nav>
        <NavBar user={user} setUser={setUser}/>
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login showLogin={showLogin} setShowLogin={setShowLogin} setUser={setUser}/>} />
          <Route path="/playlists" element={<PlaylistCollection />} />
        </Routes>
        <MusicPlayer />
        </main>
        </BrowserRouter>
    </div>
  );
}


export default App;
