const express = require("express");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewsRouter = require("./routes/views.router.js");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const ProductManager = require("./controllers/productManager.js");
const manager = new ProductManager("./src/models/products.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.get("/", async (req, res) => {
  const allProducts = await manager.getProducts();
  res.render("home", {
    title: "desafio4",
    products: allProducts,
  });
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
const io = socket(server);

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  socket.emit("products", await manager.getProducts());

  socket.on("productDelete", async (id) => {
    await manager.deleteProduct(id);
    io.sockets.emit("products", await manager.getProducts());
  });

  socket.on("productAdd", async (product) => {
    await manager.addProduct(product);
    io.sockets.emit("products", await manager.getProducts());
  });
});

