const fs = require("fs").promises;

class ProductManager {
  static id = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(object) {
    let { title, description, price, thumbnail, code, stock } = object;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log("El código tiene que ser único, se está repitiendo");
    }

    const newProduct = {
      id: ++ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);

    await this.guardarArchivo(this.products);
  }

  getProducts() {
    return this.products;
  }

  async getProductById(id) {
    try {
      const arrayProducts = await this.leerArchivo();
      const buscado = arrayProducts.find((item) => item.id === id);

      if (!buscado) {
        console.log("Product not found");
      } else {
        console.log("Product found");
        return buscado;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async leerArchivo() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const arrayProducts = JSON.parse(response);
      return arrayProducts;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async guardarArchivo(array) {
    try {
      await fs.writeFile(this.path, JSON.stringify(array, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const arrayProducts = await this.leerArchivo();
      const index = arrayProducts.findIndex((item) => item.id === id);
      if (index !== -1) {
        arrayProducts.splice(index, 1, updatedProduct);
        await this.guardarArchivo(arrayProducts);
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.leerArchivo();
      const index = arrayProducts.findIndex((item) => item.id === id);
      if (index !== -1) {
        arrayProducts.splice(index, 1);
        await this.guardarArchivo(arrayProducts);
        console.log("Product deleted");
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log("Error al borrar el producto", error);
    }
  }
}

module.exports = ProductManager;
