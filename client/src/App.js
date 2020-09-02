import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import Landing from "./components/Landing";
import UserContext from "./context/UserContext";
import Axios from "axios";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9nZW5faWQiOiI1ZjI2YzU2NWM5NGE5NTIyNDBjYWZjMjciLCJpYXQiOjE1OTYzNzc1Njl9.PEQL-91ki47O0Z_ktuk9CV10_3KbDgfJLzXd-ztW9H0
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9nZW5faWQiOiI1ZjMxMmQyNDBhZTU1MTJhMDQ4NTFlZTMiLCJpYXQiOjE1OTcwNTgzODd9.9EuhhTaiIUhQgHeuyb4XQAxqIQER4s1hMZ2EiWEWWz4
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [token, setToken] = useState(undefined);
  const [userData, setUserData] = useState({});
  const [isloading, setIsloading] = useState(true);
  // const history = useHistory();

  useEffect(() => {
    const check = () => {
      let token = localStorage.getItem("access_token");
      if (token == null) {
        localStorage.setItem("access_token", "");
        token = "";
        // console.log("token was null");
      }
      Axios.post("http://localhost:8080/istokenvalid", token, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          // console.log(res);
          setisAuthenticated(res.data);
          // console.log(res.data); true or false
          // console.log(isAuthenticated);
        })
        .catch((err) => {
          console.log(err);
        });
      Axios.get("http://localhost:8080/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          // console.log(res);
          setToken(token);
          setUserData(res.data);
          setIsloading(false);
          // history.push("/start");
          // console.log(userData);
          // console.log(userData);
        })
        .catch((err) => {
          // console.log(err);
        });
      // console.log(isAuthenticated);
    };
    check();
  }, []);
  return (
    <div>
      <Router>
        <UserContext.Provider
          value={{
            isAuthenticated,
            setisAuthenticated,
            userData,
            setUserData,
            token,
            setToken,
            isloading,
            setIsloading,
          }}
        >
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <Route path="/start" component={Landing} /> */}
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
