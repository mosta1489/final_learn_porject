const cartModel = require("../models/cartModel");

function addItem(req, res, next) {
  const newItem = {
    name: req.body.name,
    ProductId: req.body.id,
    image: req.session.image,
    price: req.body.price,
    amount: req.body.amount,
    userId: req.session.userId,
  };
  console.log(newItem);
  cartModel
    .addNewItem(newItem)
    .then((message) => {
      res.redirect("/cart");
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
      res.redirect(req.body.currentPath);
    });
}

function getCart(req, res, next) {
  const userId = req.session.userId;
  cartModel.geItems(userId).then((items) => {
    res.render("cart", {
      items: items,
      isUser: req.session.userId,
      isAdmin: req.session.userName,
    });
  });
}

exports.addItem = addItem;
exports.getCart = getCart;
