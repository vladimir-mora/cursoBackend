const socket = io();

socket.on("products", (data) => {
  renderProducts(data);
});

const renderProducts = (products) => {
  const productsContainer = document.getElementById("container");
  productsContainer.innerHTML = "";

  products.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <h3 class="title">${producto.title}</h3>
            <img >${producto.thumbnail}</img>
            <p class="text">${producto.description}</p>
            <p class="text">category: ${producto.category}</p>
            <p class="text">price: $${producto.price}</p>
            <p class="text">code: ${producto.code}</p>
            <p class="text">stock: ${producto.stock}</p>
            <button class="btnRealTime">Delete Product</button>
            <p class="text">ID:${producto.id}</p>
        `;
    productsContainer.appendChild(card);

    card.querySelector("button").addEventListener("click", () => {
      productDelete(producto.id);
    });
  });
};

const productDelete = (id) => {
  socket.emit("productDelete", id);
};

document.getElementById("btnSend").addEventListener("click", () => {
  productAdd();
});

const productAdd = () => {
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: parseFloat(document.getElementById("stock").value),
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("productAdd", product);
};
