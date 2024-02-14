const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/dbProductManager.js");
const manager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { query, limit = 2, page = 1, sort } = req.query;
    const products = await manager.getProducts(query, limit, page, sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params.pid;
  try {
    const product = await manager.getProductById(pid);
    if (product) {
      res.json(product);
    } else {
      res.send({
        error: "producto inexistente",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await manager.addProduct(product);
    res.json({
      message: "producto agregado correctamente",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = req.body;
  const update = await manager.updateProduct(pid, product);
  res.json({
    message: "producto actualizado correctamente",
    data: update,
  });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  let productDelete = await manager.deleteProduct(pid);
  if (productDelete !== null) {
    res.send({
      message: "producto eliminado correctamente",
      data: productDelete,
    });
  } else {
    res.status(404).send({
      error: "error al borrar, producto no encontrado",
    });
  }
});

module.exports = router;
