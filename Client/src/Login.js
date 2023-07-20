import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login({ showLogin, setShowLogin, setUser }) {
  return (
    <div className="login-container">
      {showLogin ? (
        <div className="login-form">
          <SignIn setUser={setUser} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </div>
      ) : (
        <div className="login-form">
          <SignUp setUser={setUser} />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;