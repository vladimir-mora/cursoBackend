const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/dbProductManager.js");
const manager = new ProductManager();

router.get("/api/products", manager.getProducts);

router.get("/api/:pid", manager.getProductById);

router.post("/api/", manager.addProduct);

router.put("/api/:pid", manager.updateProduct);

router.delete("/api/:pid", manager.deleteProduct);

router.get("/products", manager.getProductsViews);

module.exports = router;
