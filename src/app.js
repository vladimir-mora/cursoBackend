const express = require("express");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("pagina de inicio");
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
});
