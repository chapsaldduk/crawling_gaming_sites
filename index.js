// server.js
import express from "express";
const app = express();

const port = 8080;

app.listen(port, function () {
  console.log("listening on 8080");
});

app.get("/", function (req, res) {
  res.send("hello server");
  console.log(`localhost:${port}`);
});
