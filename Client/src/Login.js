import LoginForm from "./LoginForm";
import { useState } from "react";
import SignUpForm from "./SignUpForm";


function Login( {setUser} ) {

    const [showLogin, setShowLogin] = useState(true);

    return (
<div>
    {showLogin ? (
        <div>
          <LoginForm setUser={setUser}/>
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
          </div>
      ) : (
        <div>
          <SignUpForm setUser={setUser} />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </div>
      )}
      </div>
    )

}

export default Login;