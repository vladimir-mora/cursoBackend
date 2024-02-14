const btn = document.querySelector(".producrsContainer");

async function addToCart(pid) {
  await fetch(`/api/cart/65c0eb40601b817f2fd7a94e/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("producto agregado al carrito correctamente");
}
