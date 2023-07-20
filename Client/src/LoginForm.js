
// import { useState } from "react";
// function LoginForm(){
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     fetch("/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     }).then((r) => {
//       setIsLoading(false);
//       if (r.ok) {
//         r.json().then((user) => onLogin(user));
//       } else {
//         r.json().then((err) => setErrors(err.errors));
//       }
//     });
//   }


//     return (
//         <div className="container">
//            <form onSubmit={handleSubmit} className="sign-in-form" >
//           <h2>Sign In</h2>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username..."
//           />
//           <input
//               type="password"
//               name="password"
//               placeholder="Enter your password..."
//             />
//            </form>
//         </div>
//             );
// }

// export default LoginForm;