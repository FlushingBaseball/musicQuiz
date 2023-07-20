import { useEffect, useState } from "react";
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
// import Login from "./Login";
import MusicPlayer from "./MusicPlayer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    fetch("/check_session").then((r)=>{
      if (r.ok){
        r.json().then((user)=> setUser(user));
      }
    });
  }, []);

// if(!user) return <Login onLogin={setUser} />

  return (
    <div className="App">
        <NavBar user={user} setUser={setUser}/>
        <main>
          <SignIn setUser={setUser} />
          <SignUp setUser={setUser} />
        {/* ///<Login setUser={setUser}/> */}
        <MusicPlayer />

        </main>
    </div>
  );
}

export default App;
