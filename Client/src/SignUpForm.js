function SignUpForm() {
    return (
        <div className="container">
        <form className="sign-up-form" >
          <h2>Sign up</h2>
          <input
            type="text"
            name="username"
            placeholder="Create your username..."
          />
          <input
              type="text"
              name="password"
              placeholder="Create your password..."
            />
        </form>
        </div>
            );
}

export default SignUpForm;