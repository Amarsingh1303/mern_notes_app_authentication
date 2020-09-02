import React, { useState } from "react";
import Axios from "axios";
// import { useHistory } from "react-router-dom";
// import UserContext from "../context/UserContext";
import ErrorNotice from "./ErrorNotice";
function Register() {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(undefined);
  // const history = useHistory();
  // const {
  //   setisAuthenticated,
  //   userData,
  //   setUserData,
  //   token,
  //   setToken,
  // } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user_name);
    // console.log(email);
    // console.log(password);
    const entry = {
      user_name: user_name,
      email: email,
      password: password,
    };
    // const entry2 = {
    //   user_name: user_name,
    //   password: password,
    // };
    Axios.post("http://localhost:8080/signup", entry)
      .then((res) => {
        setErr(res.data.msg.msgBody);
        // if (res.data.msg.msgError == true) {
        //   setErr(res.data.msg.msgBody);
        //   // history.push("/login");
        // }
      })
      .catch((err) => {
        console.log(err);
      });
    setEmail("");
    setPassword("");
    setUser_name("");
  };
  return (
    <div className="container">
      {err ? (
        <ErrorNotice message={err} clear={() => setErr(undefined)} />
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_name">UserName</label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            placeholder="Enter UserName"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;

// const handleSubmit = (e) => {
//   e.preventDefault();
//   // console.log(user_name);
//   // console.log(email);
//   // console.log(password);
//   const entry = {
//     user_name: user_name,
//     email: email,
//     password: password,
//   };
//   const entry2 = {
//     user_name: user_name,
//     password: password,
//   };
//   Axios.post("http://localhost:8080/signup", entry)
//     .then((res) => {
//       // console.log(res);
//       if (res.data.msg.msgError == true) {
//         history.push("/");
//       } else {
//         Axios.post("http://localhost:8080/login", entry2)
//           .then((res) => {
//             setisAuthenticated(true);
//             setToken(res.data.token);

//             Axios.get("http://localhost:8080/", {
//               headers: {
//                 Authorization: res.data.token,
//               },
//             })
//               .then((res) => {
//                 setUserData(res.data);
//               })
//               .catch((err) => {
//                 console.log(err);
//               });
//               localStorage.setItem("access_token", res.data.token);
//                history.push("/")
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
