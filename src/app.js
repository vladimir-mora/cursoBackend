const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const cartViewsRouter = require("./routes/cartView.router.js");
const productsViewsRouter = require("./routes/productsView.router.js");
const exphbs = require("express-handlebars");
require("./database.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.get("/", (req, res) => {
  res.render("home");
})


app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/products", productsViewsRouter);
app.use("/cart", cartViewsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
