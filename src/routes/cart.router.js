const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cartManager.js");
const manager = new CartManager("./src/models/cart.json");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    const carts = await manager.getProductsCart();
    const cartsLimit = carts.slice(0, limit);
    res.send(cartsLimit);
  } else {
    const allCarts = await manager.getProductsCart();
    res.send(allCarts);
  }
});

router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await manager.getProductCartById(cid);
  if (cart) {
    res.send(cart);
  } else {
    res.send({
      error: "no existe ese product en el cart",
    });
  }
});

router.post("/", async (req, res) => {
  let addProductCart = await manager.addProductCart(req.body);
  if (addProductCart !== null) {
    res.send({
      message: "producto agregado al carrito correctamente",
      data: addProductCart,
    });
  } else {
    res.status(400).send({
      error: "error al agregar producto al carrito",
    });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updateCart = await manager.addProductCartId(
      cartId,
      productId,
      quantity
    );
    res.json(updateCart.products);
    console.log("se agrego correctamente el producto en el carrito")
  } catch (error) {
    console.log("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "error interno del servidor" });
  }
});

module.exports = router;
