const express = require("express");
const path = require("path");

const publicPath = path.join(__dirname, "../public");
const app = new express();

const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log("Server is up on PORT ", PORT);
});