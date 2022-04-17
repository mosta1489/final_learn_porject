const router = require("express").Router();
const adminController = require("../controllers/adminController");
const checkadmin = require("./middelware/checkAdmin");
const multer = require("multer");

router.get("/", checkadmin.checkAdmin, adminController.getAdmin);

router.post(
  "/addProduct",
  checkadmin.checkAdmin,
  multer({
    storage: multer.diskStorage({
      destination: (res, file, cb) => {
        cb(null, "static/images");
      },
      filename: (res, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  adminController.addProduct
);

module.exports = router;
