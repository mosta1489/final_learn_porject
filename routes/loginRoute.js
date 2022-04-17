const loginController = require("../controllers/loginController");
const router = require("express").Router();
const middleware = require("./middelware/checkUser");

router.get("/", middleware.notLoggedIn, loginController.getLogin);
router.post("/signup", middleware.notLoggedIn, loginController.signup);
router.post("/signin", middleware.notLoggedIn, loginController.postLogin);
router.all("/logout", middleware.isLoggedIn, loginController.logout);

module.exports = router;
