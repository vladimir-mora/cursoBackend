const bycrpt = require("bcrypt");

const createHash = (password) =>
  bycrpt.hashSync(password, bycrpt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bycrpt.compareSync(password, user.password);

module.exports = { createHash, isValidPassword };
