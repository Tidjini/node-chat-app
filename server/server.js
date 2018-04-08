const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const app = new express();

//this is called evry time we use app.listent() (Behind the scene in express)
//this make us use socket io
const server = http.createServer(app);
const io = socketIO(server);

// register an event listner ; socket of each user (client side)
io.on("connection", socket => {
  console.log("new user connected");

  socket.on("createMessage", email => {
    console.log("create message...", email);
  });
  socket.emit("newMessage", {
    text: "this is an email",
    from: "you@yours.com",
    createdAt: new Date()
  });

  socket.on("disconnect", () => {
    console.log("closing...");
  });
});

const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log("Server is up on PORT ", PORT);
});
