const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello World");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is now listening at port 3000");
});
