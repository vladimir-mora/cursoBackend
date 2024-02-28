const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/session.router.js");
const viewsRouter = require("./routes/loginViews.router.js");
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const cartViewsRouter = require("./routes/cartView.router.js");
const productsViewsRouter = require("./routes/productsView.router.js");
const exphbs = require("express-handlebars");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");

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
app.use(cookieParser());
app.use(
  session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://vladimirgonza321:pirulin1@cluster0.arjsd3i.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 100,
    }),
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("login");
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/products", productsViewsRouter);
app.use("/cart", cartViewsRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
