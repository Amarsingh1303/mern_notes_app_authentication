const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../keys");
const user = require("../models/User");
const requireLogin = require("../middleware/requireLogin");

userRouter.get("/protected", requireLogin, (req, res) => {
  // console.log("this is protected");
  // console.log(req);
  // console.log(req.user.email);
  res.json({ msg: "ok you are welcome" });
});

userRouter.post("/signup", (req, res) => {
  const { user_name, email, password } = req.body;
  if (!user_name || !email || !password) {
    res
      .status(200)
      .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  }
  user.findOne({ user_name: user_name }).then((savedUser) => {
    if (savedUser) {
      res
        .status(200)
        .json({ msg: { msgBody: "Username already exist", msgError: true } });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hasedPass) => {
          const usertemp = new user({
            user_name: user_name,
            email: email,
            password: hasedPass,
          });
          usertemp
            .save()
            .then(() => {
              res.status(200).json({
                msg: { msgBody: "succeffuly registered", msgError: false },
              });
            })
            .catch(() => {
              res.status(200).json({
                msg: {
                  msgBody: "error occured while registering ",
                  msgError: true,
                },
              });
            });
        })
        .catch((err) => {
          res.status(200).json({
            msg: { msgBody: "password can not be hashed ", msgError: true },
          });
        });
    }
  });
});

userRouter.post("/login", (req, res) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    res
      .status(200)
      .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  } else {
    user
      .findOne({ user_name: user_name })
      .then((savedUser) => {
        // console.log(savedUser);
        if (!savedUser) {
          res
            .status(200)
            .json({ msg: { msgBody: "user not found", msgError: true } });
        } else {
          bcrypt.compare(password, savedUser.password).then((doMatch) => {
            // console.log(doMatch); gives us true
            if (doMatch) {
              const token = jwt.sign(
                { token_gen_id: savedUser._id },
                process.env.JWT_SECRET
              );
              res.status(200).json({
                token: token,
                msg: {
                  msgBody: "succeffully registered please wait",
                  msgError: false,
                },
              });
            } else {
              res
                .status(200)
                .json({ msg: { msgBody: "invalid password", msgError: true } });
            }
          });
        }
      })
      .catch(() => {
        res.status(200).json({
          msg: { msgBody: "invalid username or password", msgError: true },
        });
      });
  }
});

userRouter.post("/istokenvalid", (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(200).json(false);
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(200).json(false);
      } else {
        const { token_gen_id } = payload;
        user
          .findById(token_gen_id)
          .then(() => {
            return res.status(200).json(true);
          })
          .catch(() => {
            return res.status(200).json(false);
          });
      }
    });
  }
});

userRouter.get("/", requireLogin, (req, res) => {
  // console.log(req.user._id);
  user
    .findById(req.user._id)
    .then((result) => {
      res.status(200).json({
        id: result._id,
        name: result.user_name,
        email: result.email,
      });
    })
    .catch((err) => {
      res.status(200).json({ msgError: "error occured " });
    });
});

module.exports = userRouter;

// else {

//   const usertemp = new user({
//     user_name: user_name,
//     email: email,
//     password: password,
//   });
//   usertemp
//     .save()
//     .then(() => {
//       res.status(200).json({ msg: "succeffully registered" });
//     })
//     .catch(() => {
//       res
//         .status(200)
//         .json({ msg: "error occured while registestering user" });
//     });
// }
