const fs = require("fs").promises;

class CartManager {
  static id = 0;

  constructor(path) {
    this.productsCart = [];
    this.path = path;
  }

  async leerArchivo() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const arrayProductsCart = JSON.parse(response);
      return arrayProductsCart;
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

  async addProductCart() {
    const productCartExisting = await this.leerArchivo();

    if (productCartExisting) {
      this.productsCart = productCartExisting;
      let maxId = CartManager.id;
      for (const product of this.productsCart) {
        if (product.id > maxId) {
          maxId = product.id;
        }
      }
      const newCart = { id: ++maxId, products: [] };
      const cartsConcat = [...this.productsCart, newCart];
      await this.guardarArchivo(cartsConcat);
      console.log("el product se agrego correctamente");
    } else {
      this.productsCart = [];
      console.log("error al agregar producto");
      return null;
    }
  }

  async getProductsCart() {
    const response = await fs.readFile(this.path, "utf-8");
    const responseJSON = JSON.parse(response);
    return responseJSON;
  }

  async getProductCartById(id) {
    try {
      const arrayProductsCart = await this.leerArchivo();
      const buscado = arrayProductsCart.find((item) => item.id === id);

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

  async addProductCartId(cartId, productId, quantity = 1) {
    const arrayProductsCart = await this.leerArchivo();
    const carrito = arrayProductsCart.find((item) => item.id === cartId);

    if (!carrito) {
      console.log("Carrito no encontrado");
      return null;
    }

    const existingProduct = carrito.products.find(
      (p) => p.product === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      carrito.products.push({ product: productId, quantity });
    }

    const cartIndex = arrayProductsCart.findIndex((item) => item.id === cartId);
    arrayProductsCart[cartIndex] = carrito;

    await this.guardarArchivo(arrayProductsCart);
    return carrito;
  }
}

module.exports = CartManager;
