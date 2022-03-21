const route = require("express").Router();
const homeController = require("../controllers/homeController");
route.get("/", homeController.getHome);

module.exports = route;
