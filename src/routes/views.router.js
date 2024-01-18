const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const manager = new ProductManager("./src/models/products.json");

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        res.status(500).json({ error: "Error del servidor"});
    }
});

module.exports = router;