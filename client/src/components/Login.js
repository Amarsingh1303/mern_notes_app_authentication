import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";

// {
//   "user_name":"amardon123",
//   "password":"amar1234"
// }

function Login() {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(undefined);
  const {
    setisAuthenticated,
    setUserData,
    setToken,
    setIsloading,
  } = useContext(UserContext);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user_name);
    // console.log(password);
    const entry = {
      user_name: user_name,
      password: password,
    };
    Axios.post("http://localhost:8080/login", entry)
      .then((res) => {
        // console.log(res);
        if (res.data.msg.msgError === true) {
          setErr(res.data.msg.msgBody);
          localStorage.setItem("access_token", "invalid");
          // history.push("/");
        } else {
          setisAuthenticated(true);
          setToken(res.data.token);
          Axios.get("http://localhost:8080/", {
            headers: {
              Authorization: res.data.token,
            },
          }).then((res) => {
            setUserData(res.data);
            setIsloading(false);
            // console.log(res.data);
          });

          localStorage.setItem("access_token", res.data.token);
          // setIsloading(false);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

export default Login;
