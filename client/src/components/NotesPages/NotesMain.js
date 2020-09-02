import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import shortid from "shortid";
import UserContext from "../../context/UserContext";
import NoteShow from "./NoteShow";
// import ErrorNotice from "../ErrorNotice";
function NotesMain(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notesobj, setNotesobj] = useState([]);
  // const [err, setErr] = useState(undefined);
  const { token, userData, isloading } = useContext(UserContext);

  const handledatacb = (p) => {
    const { datacallback } = props;
    datacallback(p);
  };
  useEffect(() => {
    if (isloading === true) {
      console.log("isloading is true");
      console.log(userData.id);
    } else {
      console.log("now isloading is false");
      console.log(userData.id);
      Axios.get(`http://localhost:8080/notes/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setNotesobj(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isloading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title);
    // console.log(desc);
    const entry = {
      id: shortid.generate(),
      title: title,
      description: desc,
    };
    Axios.post("http://localhost:8080/notes/add", entry, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // setNotesobj(res.data);
        // console.log(res);
        // setErr2(res.data.msg.msgBody);
        // setErr(res.data.msg.msgBody);
        handledatacb(res.data.msg.msgBody);
        Axios.get(`http://localhost:8080/notes/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          setNotesobj(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setTitle("");
    setDesc("");
  };

  const handledatacallback = (idi) => {
    Axios.delete(`http://localhost:8080/notes/delete/${idi}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // setErr(res.data.msg.msgBody);
        handledatacb(res.data.msg.msgBody);
        setNotesobj(notesobj.filter((ele) => ele._id !== idi));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* {err ? (
        <ErrorNotice message={err} clear={() => setErr(undefined)} />
      ) : null} */}
      <h1>Your personal Notes diary</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            className="form-control"
            id="desc"
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
      <div className="row m-auto">
        {notesobj.length ? (
          notesobj.map((ele, index) => {
            return (
              <NoteShow
                key={ele.id}
                index={index}
                notid={ele._id}
                notestitle={ele.title}
                notesdesc={ele.description}
                datacallback={handledatacallback}
              />
            );
          })
        ) : (
          <h1 className="text-danger">Nothing to show please add notes</h1>
        )}
      </div>
    </div>
  );
}

export default NotesMain;
