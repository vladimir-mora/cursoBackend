const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/dbCartManager.js");
const cartController = new CartManager();

router.get("/api/:cid", cartController.getCartById);
router.post("/api/", cartController.addCart);
router.post("/api/:cid/product/:pid", cartController.addProductCartId);
router.put("/api/:cid", cartController.updateCart);
router.put("/api/:cid/product/:pid", cartController.updateProductCartId);
router.delete("/api/:cid", cartController.clearCart);
router.delete("/api/:cid/product/:pid", cartController.deleteProductCartId);
router.get("/cart", cartController.getCarts);
router.get("/cart/:cid", cartController.getDetails);

module.exports = router;
