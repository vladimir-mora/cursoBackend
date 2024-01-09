const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const manager = new ProductManager("./src/models/products.json");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    const products = await manager.getProducts();
    const productLimit = products.slice(0, limit);
    res.send(productLimit);
  } else {
    const allProducts = await manager.getProducts();
    res.send(allProducts);
  }
});

router.get("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const product = await manager.getProductById(pid);
  if (product) {
    res.send(product);
  } else {
    res.send({
      error: "producto inexistente",
    });
  }
});

router.post("/", async (req, res) => {
  let addProduct = await manager.addProduct(req.body);
  if (addProduct !== null) {
    res.send({
      message: "El producto se agrego correctamente",
      data: addProduct,
    });
  } else {
    res.status(400).send({
      error: "error al agregar el producto, datos incompletos",
    });
  }
});

router.put("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const update = req.body;
  let productUpdate = await manager.updateProduct(pid, update);
  if (productUpdate !== null) {
    res.send({
      message: "Producto actualizado correctamente",
      data: productUpdate,
    });
  } else {
    res.status(404).send({
      error:
        "error al actualizar, el producto no existe o los datos estan incompletos",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
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
