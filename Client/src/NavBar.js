import SignOut from "./SignOut"


function NavBar( { user, setUser }){
    return (
        <div>
            <SignOut user={user} setUser={setUser} />
        </div>
    )


    
}
export default NavBar