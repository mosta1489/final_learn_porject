function checkAdmin(req, res, next) {
  if (req.session.isAdmin) next();
  else console.log("this user in not an admin");
}

exports.checkAdmin = checkAdmin;
