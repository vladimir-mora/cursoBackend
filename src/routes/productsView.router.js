const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/dbProductManager.js");
const productManager = new ProductManager();
const CartManager = require("../dao/db/dbCartManager.js");
const cartManager = new CartManager();

const url = "http://localhost:8080/products/?";

router.get("/", async (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }
  const { query, limit = 3, page = 1, sort } = req.query;
  const response = await productManager.getProducts(query, limit, page, sort);
  let {
    payload,
    hasNextPage,
    hasPrevPage,
    nextLink,
    prevLink,
    page: resPage,
    totalPages,
  } = response;

  if (hasNextPage) {
    nextLink = `${url}${query ? "query=" + query + "&" : ""}${
      "limit=" + limit
    }${"&page=" + (+page + 1)}${sort ? "&sort=" + sort : ""}`;
  }

  if (hasPrevPage)
    prevLink = `${url}${query ? "query=" + query + "&" : ""}${
      "limit=" + limit
    }${"&page=" + (+page - 1)}${sort ? "&sort=" + sort : ""}`;

  if (resPage > totalPages) {
    resPage.render("products", {
      payload: false,
    });
  } else {
    res.render("products", {
      user: req.session.user,
      payload,
      hasNextPage,
      hasPrevPage,
      nextLink,
      prevLink,
      resPage,
      totalPages,
    });
  }
});

module.exports = router;
