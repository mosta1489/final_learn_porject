const express = require("express");
const app = express();
const path = require("path");
const homeRout = require("./routes/homeRout");
port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "images")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", homeRout);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is runnin on http://localhost:${port}`);
});
