const CartService = require("../services/cartService");
const cartService = new CartService();
class cartManager {
  async getDetails(req, res) {
    try {
      const { cid } = req.params;
      const productDetails = await cartService.getDetails(cid);
      res.render("cart", { products: productDetails, cid });
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await cartService.getCarts();
      const cartsString = carts.map((cart) => ({
        ...cart.toObject(),
        _id: cart._id.toString(),
      }));
      res.render("carts", { carts: cartsString });
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async addCart(req, res) {
    try {
      const newCart = await cartService.addCart();
      res.json({ message: "Carrito agregado correctamente", data: newCart });
    } catch (error) {
      console.log("Error al agregar el carrito", error);
    }
  }

  async getCartById(req,res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
      res.json({ message: `Productos del carrito ${cid}`, data: cart });
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async addProductCartId(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProductCartId(cid, pid);
      res.json({ message: "Producto agregado correctamente", data: cart });
    } catch (error) {
      console.log("Error al agregar el producto al carrito", error);
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const products = req.body;
      const cart = await cartService.updateCart(cid, products);
      res.json({ message: "carrito actualizado correctamente", data: cart });
    } catch (error) {
      console.log("Error al actualizar el carrito", error);
    }
  }

  async updateProductCartId(req, res) {
    try {
      const { cid, pid } = req.params;
      const quantity = req.body.quantity;
      const cart = await cartService.updateProductCartId(cid, pid, quantity);
      res.json({
        message: `el producto ${pid} del carrito ${cid} se actualizo correctamente `,
        data: cart,
      });
    } catch (error) {
      console.log("Error al actualizar el producto del carrito", error);
    }
  }

  async deleteProductCartId(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProductCartId(cid, pid);
      res.json({
        message: `el producto ${pid} del carrito ${cid} se elimino correctamente`,
        data: cart,
      });
    } catch (error) {
      console.log("Error al borrar el producto del carrito", error);
    }
  }

  async clearCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.clearCart(cid);
      res.json({ message: "carrito vaciado correctamente", data: cart });
    } catch (error) {
      console.log("Error al borrar el carrito", error);
    }
  }
}

module.exports = cartManager;
