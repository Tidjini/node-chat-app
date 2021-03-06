const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const { generateMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const app = new express();

//this is called evry time we use app.listent() (Behind the scene in express)
//this make us use socket io
const server = http.createServer(app);
const io = socketIO(server);

// register an event listner ; socket of each user (client side)
io.on("connection", socket => {
  console.log("new user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Wellcome to the chat app")
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joind the app")
  );
  socket.on("createMessage", email => {
    console.log("create message...", email);

    //to emit to evry one
    // io.emit("newMessage", {
    //   from: email.from,
    //   text: email.text,
    //   createdAt: new Date().getTime()
    // });
    // NOTE: broadcast message to all socket except this socket
    socket.broadcast.emit(
      "newMessage",
      generateMessage(email.from, email.text)
    );
  });
  // socket.emit("newMessage", {
  //   text: "this is an email",
  //   from: "you@yours.com"
  // });

  socket.on("disconnect", () => {
    console.log("closing...");
  });
});

const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log("Server is up on PORT ", PORT);
});
