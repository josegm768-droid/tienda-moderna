const productsContainer = document.getElementById("products");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");
const closeCart = document.getElementById("closeCart");
const cartBtn = document.querySelector(".cart-btn");
const searchInput = document.getElementById("searchInput");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const products = [
  { id: 1, title: "Laptop Gaming", price: 1299, category: "tech", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853" },
  { id: 2, title: "Auriculares Pro", price: 199, category: "audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { id: 3, title: "Smartphone Ultra", price: 999, category: "tech", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { id: 4, title: "Teclado RGB", price: 149, category: "gaming", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae" },
  { id: 5, title: "Monitor 4K", price: 499, category: "tech", image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc" },
  { id: 6, title: "Silla Gaming", price: 349, category: "gaming", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" }
];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// 🛒 ADD TO CART (con cantidades)
function addToCart(product) {

  const existing = cart.find(item => item.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart();
  updateCart();
}

// ➕➖ cambiar cantidad
function changeQty(index, delta) {

  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

function updateCart() {

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    total += item.product.price * item.quantity;
    count += item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <h3>${item.product.title}</h3>
      <p>${item.product.price}€</p>

      <div style="display:flex;gap:10px;align-items:center;margin-top:10px;">
        <button class="qty-minus">➖</button>
        <span>${item.quantity}</span>
        <button class="qty-plus">➕</button>
      </div>
    `;

    div.querySelector(".qty-minus").onclick = () => changeQty(index, -1);
    div.querySelector(".qty-plus").onclick = () => changeQty(index, 1);

    cartItems.appendChild(div);
  });

  cartCount.textContent = count;
  totalPrice.textContent = total.toFixed(2) + "€";
}

function renderProducts(filter = "") {

  productsContainer.innerHTML = "";

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(product => {

    const isFav = favorites.includes(product.id);

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" class="product-image">

      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <div class="product-price">${product.price}€</div>

        <button class="product-btn">Añadir al carrito</button>

        <button class="favorite-btn">
          ${isFav ? "❤️ Favorito" : "🤍 Favorito"}
        </button>
      </div>

    card.querySelector(".product-btn").onclick = () => addToCart(product);

    card.querySelector(".favorite-btn").onclick = () => {

      if (favorites.includes(product.id)) {
        favorites = favorites.filter(id => id !== product.id);
      } else {
        favorites.push(product.id);
      }

      saveFavorites();
      renderProducts(searchInput.value);
    };

    productsContainer.appendChild(card);
  });
}

// 🔎 search
searchInput.addEventListener("input", () => {
  renderProducts(searchInput.value);
});

// 🛒 open/close cart
cartBtn.onclick = () => cartPanel.classList.add("open");
closeCart.onclick = () => cartPanel.classList.remove("open");

renderProducts();
updateCart();

function recomendarIA() {

  const recomendaciones = [
    "🔥 Te recomiendo el Laptop Gaming si quieres potencia",
    "🎧 Los Auriculares Pro son los más vendidos",
    "📱 El Smartphone Ultra es la mejor relación calidad/precio",
    "🖥️ El Monitor 4K es ideal para productividad",
    "🎮 El teclado RGB combina perfecto con la silla gaming"
  ];

  return recomendaciones[
    Math.floor(Math.random() * recomendaciones.length)
  ];
}

aiAdvice.innerText = "🤖 " + recomendarIA();


const buyBtn = document.getElementById("buyBtn");
const aiAdvice = document.getElementById("aiAdvice");

buyBtn.addEventListener("click", () => {

  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "🛒 *Nuevo Pedido Web*:%0A%0A";

  let total = 0;

  cart.forEach(item => {

    mensaje += `• ${item.product.title} x${item.quantity} = ${item.product.price * item.quantity}€%0A`;

    total += item.product.price * item.quantity;
  });

  mensaje += `%0A💰 Total: ${total}€`;

  // 🔥 TU NÚMERO AQUÍ (formato internacional)
  const telefono = "34662545231";

  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  window.open(url, "_blank");

});