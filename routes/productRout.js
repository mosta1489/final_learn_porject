const router = require("express").Router();
const productController = require("../controllers/productController");
router.get("/:id", productController.getProduct);

module.exports = router;
