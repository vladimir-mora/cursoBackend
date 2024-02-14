const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/dbProductManager.js");
const productManager = new ProductManager();
const CartManager = require("../dao/db/dbCartManager.js");
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
  const carts = await cartManager.getCarts();
const cartsString = carts.map( cart => ({
  ...cart.toObject(),
  _id: cart._id.toString()
}));
  res.render("carts", { carts: cartsString });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const productDetails = await cartManager.getDetails(cid);
    res.render("cart", { products: productDetails, cid });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
