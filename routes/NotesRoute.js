const express = require("express");
const notesRouter = express.Router();
const requireLogin = require("../middleware/requireLogin");
const user = require("../models/User");
const note = require("../models/NotesModel");

// notesRouter.get("/notes", (req, res) => {
//   //   notes.find().then((userData) => {
//   //     console.log(userData);
//   //   });
//   res.json({ msg: "ok boy" });
// });
notesRouter.get("/notes/:id", requireLogin, (req, res) => {
  const entry = req.params.id;
  note
    .find({ createdby: entry })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(200).json({
        msg: { msgBody: "error occured while fetching data", msgError: true },
      });
    });
});

notesRouter.post("/notes/add", requireLogin, (req, res) => {
  const { id, title, description } = req.body;
  //   const uservalue = req.user;
  if (!title || !description) {
    res
      .status(200)
      .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  } else {
    // console.log(req.user)
    req.user.password = undefined;
    const notestemp = new note({
      id: id,
      title: title,
      description: description,
      createdby: req.user,
    });
    notestemp
      .save()
      .then((savedNote) => {
        // res.status(200).json({ msg: savedNote });
        res.status(200).json({
          msg: { msgBody: "your note added succeffully", msgError: false },
        });
      })
      .catch((err) => {
        res.status(200).json({
          msg: {
            msgBody: "notes can not be added please try again",
            msgError: true,
          },
        });
      });
  }
});

notesRouter.delete("/notes/delete/:id", requireLogin, (req, res) => {
  const entry = req.params.id;
  note
    .findByIdAndDelete(entry)
    .then((deletedNote) => {
      // res.status(200).json({ msg: deletedNote });
      res.status(200).json({
        msg: { msgBody: "your note deleted succeffully", msgError: false },
      });
    })
    .catch(() => {
      res.status(200).json({
        msg: { msgBody: "error occured while deleting", msgError: true },
      });
    });
});

module.exports = notesRouter;
//   console.log(req.user);
// res.json({ msg: "ok boy i like that" });
// const usertemp = new user(req.body);
// usertemp.save().then(saved=>{
//     console.log("values saved")
// })
