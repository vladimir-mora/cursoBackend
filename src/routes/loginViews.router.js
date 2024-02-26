const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.session.login) {
    return res.redirect("/products");
  }
  res.render("login");
});

router.get("/register", (req, res) => {
  if (req.session.login) {
    return res.redirect("/login");
  }
  res.render("register");
});


module.exports = router;