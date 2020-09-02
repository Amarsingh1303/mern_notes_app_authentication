const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const { MONGOURI } = require("./keys");
const userRouter = require("./routes/UserRoute");
const notesRouter = require("./routes/NotesRoute");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
//q0csA4CeqKZPtjQ7

// console.log(process.env.user);
// console.log(process.env.user2);
// console.log(process.env.JWT_SECRET);
app.use(cors());
app.use(express.json());
// mongodb+srv://Amarsingh:q0csA4CeqKZPtjQ7@cluster0.g7mxl.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongoose.connect(process.env.MONGODB_URI || MONGOURI, {
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongo db connected with mern_notes_app_authorization");
});

mongoose.connection.on("error", () => {
  console.log("error occured while connection to database");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(userRouter);
app.use(notesRouter);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
