//open the connection to server via socket io and keep it open
var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
  socket.emit("createMessage", {
    text: "this is new email created by the client",
    from: "you@yours.com"
  });
});
socket.on("disconnect", function() {
  console.log("disconnect to server");
});

socket.on("newMessage", function(email) {
  console.log("New Email commes", email);
});
