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
    console.log(this.products);
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

const manager = new ProductManager("./products.json");

manager.getProducts();

const zapatilla = {
  title: "zapatilla",
  description: "No description",
  price: 150,
  thumbnail: "No image",
  code: "s123",
  stock: 10,
};

const zapatilla2 = {
  title: "zapatilla2",
  description: "No description",
  price: 200,
  thumbnail: "No image",
  code: "d023",
  stock: 8,
};

const zapatilla3 = {
  title: "zapatilla3",
  description: "No description",
  price: 300,
  thumbnail: "No image",
  code: "p423",
  stock: 5,
};


manager.addProduct(zapatilla);
manager.addProduct(zapatilla2);
manager.addProduct(zapatilla3);

manager.getProducts();

async function testeoBusqueda(id) {
  const found = await manager.getProductById(id);
  console.log(found);
}

testeoBusqueda(2);

const zapatillaActualizada = {
  id: 1,
  title: "zapatilla actualizada",
  description: "esta zapatilla esta actualizada",
  price: 150,
  thumbnail: "No image",
  code: "d123",
  stock: 10,
};

async function testeoActualizacion() {
  await manager.updateProduct(1, zapatillaActualizada);
}

testeoActualizacion();

manager.getProducts();

async function testeoDelete(id) {
  await manager.deleteProduct(id);
}

testeoDelete(3);

