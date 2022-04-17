const route = require("express").Router();
const homeController = require("../controllers/homeController");
const middleware = require("./middelware/checkUser");

route.get("/", homeController.getHome);
route.post("/", (req, res, next) => {
  res.render("index");
});
module.exports = route;
