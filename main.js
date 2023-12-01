class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((i) => i.code === code)) {
      console.log("el codigo tiene que ser unico, se esta repitiendo");
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
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const product = this.products.find((i) => i.id === id);

    if (!product) {
      console.log("Not found product");
    } else {
      console.log("Product found", product);
    }
    return product;
  }
}

const manager = new ProductManager();

manager.getProducts();

manager.addProduct(
  "zapatilla",
  "sin descripcion",
  150,
  "sin imagen",
  "z123",
  10
);

manager.addProduct(
  "zapatilla2",
  "sin descripcion",
  100,
  "sin imagen",
  "z124",
  12
);

manager.getProducts();

manager.getProductById(2);
manager.getProductById(1000);
