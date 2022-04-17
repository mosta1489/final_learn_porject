const express = require("express");
const app = express();
const path = require("path");
const homeRout = require("./routes/homeRout");
const productRout = require("./routes/productRout");
const loginRout = require("./routes/loginRoute");
const cartRoute = require("./routes/cartRoute");
const adminRoute = require("./routes/adminRoute");

const session = require("express-session");
const sessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const port = process.env.PORT || 3000;
const DB_URL = "mongodb://localhost:27017/arabProject";
const store = new sessionStore({
  uri: DB_URL,
  collection: "sessions",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: false,
    resave: true,
    store: store,
  })
);

app.use(flash());

app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", homeRout);
app.use("/product", productRout);
app.use("/login", loginRout);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);
app.use((error, req, res, next) => {
  res.render("error");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is runnin on http://localhost:${port}`);
});
