const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/dbProductManager.js");
const manager = new ProductManager();

// router.get("/", async (req, res) => {
//   const allProducts = await manager.getProducts();
//   res.render("home", {
//     title: "desafioComplementario",
//     products: allProducts,
//   });
// });

// router.get("/realtimeproducts", async (req, res) => {
//   try {
//     res.render("realtimeproducts");
//   } catch (error) {
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });

router.get("/chat", async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
