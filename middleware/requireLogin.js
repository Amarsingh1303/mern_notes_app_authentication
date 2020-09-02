const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../keys");
const user = require("../models/User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ msg: "required header" });
  } else {
    ////we have to replace the the authorization header
    const token = authorization.replace("Bearer ", "");
    ////we can also say the payload to decoded
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        res.status(401).json({ msg: "invalid token" });
      } else {
        const { token_gen_id } = payload;
        user.findById(token_gen_id).then((savedUser) => {
          req.user = savedUser;
          next();
          //   console.log(req.user);
        });
      }
    });
    // next();
  }
};
