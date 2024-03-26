const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const mongoose = require("mongoose");

class CartService {
  async getDetails(id) {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        console.log("El carrito no existe");
        return null;
      }
      const productsDetails = [];
      for (const item of cart.products) {
        const product = await ProductModel.findById(item.product);

        if (!product) {
          console.log("El producto no existe");
          continue;
        }
        const productDetails = {
          title: product.title,
          price: product.price,
          category: product.category,
          thumbnail: product.thumbnail,
          quantity: item.quantity,
        };
        productsDetails.push(productDetails);
      }
      return productsDetails;
    } catch (error) {
      console.log("Error al traer los detalles", error);
    }
  }

  async getCarts() {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (error) {
      console.log("Error al traer los carts", error);
    }
  }

  async addCart() {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      console.log("Error al agregar el cart", error);
    }
  }
  async getCartById(cid) {
    try {
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        console.log("El valor de cid no es un ObjectId válido");
        return null;
      }

      const cart = await CartModel.findById(cid).populate({
        path: "products",
        populate: { path: "product", model: "products" },
      });
      return cart;
    } catch (error) {
      console.log("Error al traer el carrito", error);
    }
  }
  async addProductCartId(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      const product = cart.products.find((i) => i.product.toString() === pid);
      if (product) {
        product.quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }
      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al agregar el producto al carrito", error);
    }
  }

  async updateCart(cid, newProduct) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cid,
        { products: newProduct },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log("Error al actualizar el carrito", error);
    }
  }

  async updateProductCartId(cid, pid, quantity) {
    const cart = await CartModel.findById(cid);
    const product = cart.products.find((i) => i.product.toString() === pid);
    product.quantity = quantity;
    await cart.save();
    return cart;
  }
  async deleteProductCartId(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      const productIndex = cart.products.findIndex(
        (i) => i.product.toString() === pid
      );
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        console.log("producto eliminado del carrito");
        return cart;
      } else {
        console.log("producto no encontrado en el carrito");
      }
    } catch (error) {
      console.log("Error al borrar el producto del carrito", error);
    }
  }

  async clearCart(cid) {
    try {
      const cart = await CartModel.findById(cid);
      cart.products.splice(0, cart.products.length);
      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al vaciar el carrito", error);
    }
  }
}

module.exports = CartService;
