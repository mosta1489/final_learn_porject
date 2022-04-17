const productModel = require("../models/productModel");

function getAdmin(req, res, next) {
  res.render("admin");
}

function addProduct(req, res, next) {
  res.send(req.file);
  console.log(req.file);
  console.log(req.body);
  const newProduct = {
    image: "/images/" + req.file.filename,
    name: req.body.name,
    price: req.body.price,
  };
  productModel.addProduct(newProduct).catch((err) => {
    next(err);
  });
}

exports.getAdmin = getAdmin;
exports.addProduct = addProduct;
