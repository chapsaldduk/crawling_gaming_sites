// server.js
import express from "express";
import maria from "./mariadb.js";
maria.connect(); // db connect
const app = express();

const port = 8080;

app.listen(port, function () {
  console.log("listening on 8080");
});

app.get("/", function (req, res) {
  res.send("hello server");
  console.log(`localhost:${port}`);
});

app.get("/game", async function (req, res) {
  maria.query("select * from main", function (err, rows, fields) {
    if (!err) {
      console.log("success");
      res.send(rows);
    } else {
      console.log("connect error");
    }
  });
});
