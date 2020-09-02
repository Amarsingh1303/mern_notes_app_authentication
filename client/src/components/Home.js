import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import NotesMain from "./NotesPages/NotesMain";
import ErrorNotice from "./ErrorNotice";
function Home() {
  const [err, setErr] = useState(undefined);
  const { isAuthenticated, userData } = useContext(UserContext);
  const handledatacallback = (val) => {
    setErr(val);
  };
  return (
    <div className="container">
      {isAuthenticated ? (
        <>
          {err ? (
            <ErrorNotice
              message={err}
              clear={() => setErr(undefined)}
              datacallback={() => handledatacallback}
            />
          ) : null}
          <h1>hello from Landing</h1>
          <h2>{userData.email}</h2>
          <NotesMain datacallback={handledatacallback} />
          {/* {isloading ? <h1>please wait........</h1> : <NotesMain />} */}
        </>
      ) : (
        <h1>welcome do login to use notes app</h1>
      )}
    </div>
  );
}

export default Home;
