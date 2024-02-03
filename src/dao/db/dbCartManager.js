const CartModel = require("../../dao/models/cart.model");

class CartManager {
  async addCart() {
    try {
      const newCart = new CartModel({
        products: [],
      });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log("Error al agregar el cart", error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        console.log("Cart not found");
        return null;
      } else {
        console.log("Cart found");
        return cart;
      }
    } catch (error) {
      console.log("Error al traer el carrito", error);
    }
  }

  async addProductCartId(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCartById(cartId);
      const existingProduct = carrito.products.find(
        (i) => i.product.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }
      carrito.markModified("products");
      carrito.save();
      return carrito;
    } catch (error) {
      console.log("Error al agregar el producto al carrito", error);
    }
  }
}

module.exports = CartManager;
