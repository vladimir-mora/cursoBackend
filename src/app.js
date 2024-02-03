const express = require("express");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
require("./database.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const messageModel = require("./dao/models/message.model.js");
const io = new socket.Server(httpServer);

io.on("connection", (socket) => {
  console.log("el cliente se conecto");

  socket.on("message", async (data) => {
    await messageModel.create(data);

    const messages = await messageModel.find();
    io.sockets.emit("messageLogs", messages);
  })
});
