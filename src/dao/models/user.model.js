const moongoose = require("mongoose");
const userSchema = moongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});
const userModel = moongoose.model("user", userSchema);
module.exports = userModel;
