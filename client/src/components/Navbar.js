import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
function Navbar() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  const {
    isAuthenticated,
    setisAuthenticated,
    setUserData,
    setToken,
    setIsloading,
  } = useContext(UserContext);
  const logoutfns = () => {
    localStorage.clear();
    setisAuthenticated(false);
    setUserData({});
    setToken(undefined);
    setIsloading(true);
    history.push("/");
  };
  const isNotAllow = () => {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </>
    );
  };
  const isAllow = () => {
    return (
      <>
        {/* <li className="nav-item">
          <button className="btn btn-link nav-link">{userData.email}</button>
        </li> */}

        <li className="nav-item">
          {/* <Link className="nav-link" to="/logout">
            logout
          </Link> */}
          <button className="btn btn-link nav-link" onClick={logoutfns}>
            Logout
          </button>
        </li>
      </>
    );
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isAuthenticated ? isAllow() : isNotAllow()}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// class Navbar extends Component {
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           {/* <a className="navbar-brand" href="#">
//             Navbar
//           </a> */}

//           <Link to="/">
//             <div className="navbar-brand">Notes App</div>
//           </Link>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav mr-auto">
//               <Link to="/register">
//                 <li className="nav-link nav-item"> Register</li>
//               </Link>
//               <Link to="/login">
//                 <li className="nav-item nav-link">Login</li>
//               </Link>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;
