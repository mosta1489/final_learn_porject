const productsModel = require("../models/productModel");

// get home data from database

exports.getHome = (req, res, next) => {
  console.log(req.session.userId);
  let productsPromis;
  const categories = req.query.category;
  if (categories !== "all") {
    productsPromis = productsModel.getProductByCategory(categories);
  } else {
    productsPromis = productsModel.getAllProduct();
  }

  productsPromis
    .then((products) => {
      res.render("index", {
        products: products,
        isUser: req.session.userId,
        isAdmin: req.session.userName,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
