import SignOut from "./SignOut";

function NavBar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Music Quiz</div>
      <div className="navbar-menu">
        <SignOut user={user} setUser={setUser} />
      </div>
    </nav>
  );
}

export default NavBar;