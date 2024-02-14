const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/dbCartManager.js");
const cartManager = new CartManager();
const ProductManager = require("../dao/db/dbProductManager.js");
const productManager = new ProductManager();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.json({ message: `Productos del carrito ${cid}`,data: cart });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.json({message: "Carrito agregado correctamente", data: newCart });
  } catch (error) {
    console.log("Error al agregar el carrito", error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductCartId(cid, pid);
    res.json({message: "Producto agregado correctamente", data: cart });
  } catch (error) {
    console.log("Error al agregar el producto al carrito", error);
  }
});

router.put("/:cid", async (req, res) => {
  try {
   const { cid } = req.params;
   const products = req.body;
   const cart = await cartManager.updateCart(cid, products);
    res.json({message: "carrito actualizado correctamente" ,data: cart });
  } catch (error) {
    console.log("Error al actualizar el carrito", error);
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const  quantity  = req.body.quantity;
    const cart = await cartManager.updateProductCartId(cid, pid, quantity);
    res.json({message:  `el producto ${pid} del carrito ${cid} se actualizo correctamente ` ,data: cart });
  } catch (error) {
    console.log("Error al actualizar el producto del carrito", error);
  }
})

router.delete("/:cid", async (req, res) => {
  try {
    const{ cid } = req.params;
    const cart = await cartManager.clearCart(cid);
    res.json({message: "carrito vaciado correctamente" , data: cart });
  } catch (error) {
    console.log("Error al borrar el carrito", error);
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.deleteProductCartId(cid, pid);
    res.json({message: `el producto ${pid} del carrito ${cid} se elimino correctamente` , data: cart });
  } catch (error) {
    console.log("Error al borrar el producto del carrito", error);
  }
});

module.exports = router;
