const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "credenciales incorrectas" });
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      rol: req.user.rol,
    };
    req.session.login = true;
    res.redirect("/login");
  }
);

router.get("/failregister", (req, res) => {
  res.render({ error: "Error en el registro" });
});

module.exports = router;
