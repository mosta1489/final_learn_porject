const { redirect } = require("express/lib/response");
const userModel = require("../models/userModel");
const router = require("express").Router();

function getLogin(req, res) {
  res.render("login", {
    error: req.flash("error")[0],
    success: req.flash("success")[0],
  });
}
function signup(req, res) {
  userModel
    .saveUser(req.body.username, req.body.password, req.body.name)
    .then((resolvedData) => {
      req.flash("success", resolvedData);
      res.redirect("/login");
    })
    .catch((error) => {
      req.flash("error", error);
      res.redirect("/login");
    });
}
function postLogin(req, res) {
  userModel
    .postLogin(req.body.username, req.body.password)
    .then((userInDB) => {
      req.session.userId = userInDB._id;
      req.session.isAdmin = userInDB.isAdmin;
      res.redirect("/");
    })
    .catch((error) => {
      req.flash("error", error);
      res.redirect("/login");
    });
}
function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
}

exports.getLogin = getLogin;
exports.signup = signup;
exports.postLogin = postLogin;
exports.logout = logout;
