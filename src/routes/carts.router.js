const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/dbCartManager.js");
const manager = new CartManager();

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
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
  let addProductCart = await manager.addCart();
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
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updateCart = await manager.addProductCartId(
      cartId,
      productId,
      quantity
    );
    res.json(updateCart.products);
    console.log("se agrego correctamente el producto en el carrito");
  } catch (error) {
    console.log("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "error interno del servidor" });
  }
});

module.exports = router;
