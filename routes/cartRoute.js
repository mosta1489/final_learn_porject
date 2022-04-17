const router = require("express").Router();
const cartController = require("../controllers/cartController");
const middleware = require("./middelware/checkUser");

router.get("/", middleware.isLoggedIn, cartController.getCart);
router.post("/", middleware.isLoggedIn, cartController.addItem);

module.exports = router;
