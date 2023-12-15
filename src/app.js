const port = 8080;
const express = require("express");
const app = express();
const ProductManger = require("./productManager.js");
const manager = new ProductManger("./src/products.json");

app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("pagina de inicio");
});

app.get("/products",  (req, res) => {
  let respuesta = manager.getProducts();
  res.send(respuesta);
});
