import SignIn from "./SignIn";
import SignUp from "./SignUp";


function Login( {showLogin, setShowLogin, setUser}) {
    return (
        <div>
        {showLogin ? (
            <div>
          <SignIn setUser={setUser} />
          <p>
          Don't have an account? &nbsp;
          <button onClick={() => setShowLogin(false)}>Sign Up</button>
        </p>
        </div>
          ) : (
            <div>
          <SignUp setUser={setUser} />
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