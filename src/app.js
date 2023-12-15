const PORT = 8080;
const express = require("express");
const app = express();
const ProductManger = require("./productManager.js");
const manager = new ProductManger("./src/products.json");
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("pagina de inicio");
});

app.get("/products", async (req, res) => {
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

app.get("/products/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const product = await manager.getProductById(id);
  if (product) {
    res.send(product);
  } else {
    res.send({
      error: "producto inexistente",
    });
  }
});
