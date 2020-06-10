require("dotenv").config();
// Use for socket.io
const http = require("http");
const socketio = require("socket.io");

//File upload
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Create an express variables
const express = require("express");
const { join } = require("path");
const app = express();

// Create a socket server http using app
const server = http.createServer(app);
const io = socketio(server);

// Telling app to use file in public folder ?
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Telling app to use route in folder routes
app.use(require("./routes"));

// Start to listening
io.on("connection", (socket) => {
  // On new user, broardcast to everyone that is online
  socket.on("newUserSignUp", (message) => {
    //Broadcast when a new user signup
    socket.broadcast.emit("newUserSignUp", message);
  });

  // On new update, letting all the users that is friend know so we can re-render their list items
  socket.on("Update", (message) => {
    io.emit("Update", message);
  });

  // Sending message back and forth using user id
  socket.on("message", ({ userId, message }) => {
    socket.emit(userId, message);
  });

  // On when disconnect
  socket.on("disconnect", () => {
    io.emit("userleft", "User has left!");
  });
});
// Create a PORT variable equal to whatever port that existed in the enviroment or 3000
const PORT = process.env.PORT || 3000;
// Create connection (instead of using app.listen, we now can use server.listen and we still can get the same result)
require("./connection")
  .sync({force:false})
  .then(() => server.listen(PORT, () => console.log("http://localhost:3000")))
  .catch((err) => console.error(err));
