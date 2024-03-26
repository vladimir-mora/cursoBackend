const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: String,
      },
      quantity: { type: Number},
    },
  ],
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;
