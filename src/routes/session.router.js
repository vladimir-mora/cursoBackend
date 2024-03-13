const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");
const { isValidPassword } = require("../utils/hashBcrypt.js");
const passport = require("passport");

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.redirect("/login");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "No se pudo iniciar sesion" });
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      rol: req.user.rol,
    };
    req.session.login = true;
    res.redirect("/products");
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("faillogin");
  res.render("faillogin");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/products");
  }
);
 

router.get("/current", (req, res) => {
  if (req.session.login && req.session.user) {
    res.send(req.session.user);
  } else {
    res.status(401).send({ status: "error", message: "No hay usuario" });
  }
})

module.exports = router;
