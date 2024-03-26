const ProductService = require("../services/productService.js");
const manager = new ProductService();
const url = "http://localhost:8080/products/?";

class ProductManager {
  async getProducts(req, res) {
    try {
      const { query, limit = 2, page = 1, sort } = req.query;
      const products = await manager.getProducts(query, limit, page, sort);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async getProductById(req, res) {
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
  }

  async addProduct(req, res) {
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
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    const product = req.body;
    const update = await manager.updateProduct(pid, product);
    res.json({
      message: "producto actualizado correctamente",
      data: update,
    });
  }

  async deleteProduct(req, res) {
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
  }

  async getProductsViews(req, res) {
    if (!req.session.login) {
      return res.redirect("/login");
    }
    const { query, limit = 3, page = 1, sort } = req.query;
    const response = await manager.getProducts(query, limit, page, sort);
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
  }
}

module.exports = ProductManager;
