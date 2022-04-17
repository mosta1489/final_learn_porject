const { default: mongoose } = require("mongoose");
const productsModel = require("../models/productModel");

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  product = productsModel
    .getProductById(id)
    .then((product) => {
      res.render("product", {
        product: product,
        isUser: req.session.userId,
        isAdmin: req.session.userName,
      });
    })
    .catch((err) => {
      res.redirect("/");
    });
};
