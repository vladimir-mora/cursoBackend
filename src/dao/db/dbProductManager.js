const ProductModel = require("../../dao/models/product.model");

const url = "https://localhost:8080/api/products/?";

class ProductManager {
  async getProducts(query, limit, page, sort) {
    try {
      let param = {};
      if (sort) {
        param = {
          limit: parseInt(limit),
          page: parseInt(page),
          sort: { price: sort },
          lean: true,
        };
      } else {
        param = {
          limit: parseInt(limit),
          page: parseInt(page),
          lean: true,
        };
      }
      const q = {};
      if (query) {
        const i = query.indexOf(":");
        const f = query.length;
        const key = query.substring(0, i);
        const value = query.substring(i + 1, f);
        q[key] = value;
      }
      const result = await ProductModel.paginate(q, param);
      if (result.hasNextPage) {
        result.nexLink = `${url}${query ? "query=" + query + "&" : ""}${
          "limit=" + limit
        }${"&page=" + (+page + 1)}${sort ? "&sort=" + sort : ""}`;
      }
      if (result.hasPrevPage) {
        result.prevLink = `${url}${query ? "query=" + query + "&" : ""}${
          "limit=" + limit
        }${"&page=" + (+page - 1)}${sort ? "&sort=" + sort : ""}`;
      }
      return {
        status: "success",
        payload: result.docs,
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        prevLink: result.prevLink,
        nextLink: result.nexLink,
      };
    } catch (error) {
      console.log("Error al obtener los Productos", error);
    }
  }
  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      console.log("Error al obtener el Producto por ID", error);
    }
  }
  async addProduct(product) {
    try {
      const product = await ProductModel.create(product);
      return product;
    } catch (error) {
      console.log("Error al agregar el producto", error);
    }
  }

  async updateProduct(pid, updatedProduct) {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        pid,
        updatedProduct,
        { new: true }
      );

      if (!productUpdated) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product updated");
        return product;
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(pid) {
    try {
      const productDelete = await ProductModel.findByIdAndDelete(pid);
      if (!productDelete) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product deleted");
        return productDelete;
      }
    } catch (error) {
      console.log("Error al borrar el Producto", error);
    }
  }
}

module.exports = ProductManager;
