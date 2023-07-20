


function SignOut( { setUser }) {

    function handleClick() { 
        setUser(null)
        
    }
    
    return (
        <div>
            <button onClick={handleClick}>Sign Out</button>
        </div>
    )

}



export default SignOut;