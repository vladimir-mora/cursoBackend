const ProductModel = require("../../dao/models/product.model");

class ProductManager {
  async addProduct(object) {
    try {
      const {
        title,
        description,
        price,
        status,
        category,
        code,
        stock,
        thumbnail,
      } = object;

      if (
        !title ||
        !description ||
        !price ||
        !status ||
        !category ||
        !code ||
        !stock
      ) {
        console.log("Todos los campos son obligatorios");
        return null;
      }

      const productExisting = await ProductModel.findOne({ code: code });

      if (productExisting) {
        console.log("El código del producto ya existe");
        return;
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        status: true,
        category,
        thumbnail,
        code,
        stock,
      });

      await newProduct.save();
    } catch (error) {
      console.log("Error al agregar el producto", error);
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.log("Error al obtener los Productos", error);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product found");
        return product;
      }
    } catch (error) {
      console.log("Error al obtener el Producto por ID", error);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const productUpdated = await ProductModel.findByIdAndUpdate(
        id,
        updatedProduct
      );

      if (!productUpdated) {
        console.log("Product not found");
        return null;
      } else {
        console.log("Product updated");
        return productUpdated;
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const productDelete = await ProductModel.findByIdAndDelete(id);
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
