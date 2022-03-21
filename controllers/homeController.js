const productsModel = require("../models/productModel");

// get home data from database

exports.getHome = (req, res, next) => {
  productsModel.getAllProduct().then((products) => {
    res.render("index", {
      products: products,
    });
  });
};
