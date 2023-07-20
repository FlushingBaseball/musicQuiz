function User( {username, streak}) {
return (
    <div>
        <h1>{username}</h1>
        <h3>Streak: {streak}</h3>
    </div>
)
}

export default User;