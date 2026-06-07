const productsContainer =
  document.getElementById("products");

const cartPanel =
  document.getElementById("cartPanel");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const totalPrice =
  document.getElementById("totalPrice");

const closeCart =
  document.getElementById("closeCart");

const cartBtn =
  document.querySelector(".cart-btn");

const searchInput =
  document.getElementById("searchInput");

let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

let favorites =
  JSON.parse(localStorage.getItem("favorites"))
  || [];

const products = [

  {
    id: 1,
    title: "Laptop Gaming",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },

  {
    id: 2,
    title: "Auriculares Pro",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },

  {
    id: 3,
    title: "Smartphone Ultra",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },

  {
    id: 4,
    title: "Teclado RGB",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
  },

  {
    id: 5,
    title: "Monitor 4K",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc"
  },

  {
    id: 6,
    title: "Silla Gaming",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  }

];

function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

function saveFavorites() {

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

}

function renderProducts(filter = "") {

  productsContainer.innerHTML = "";

  const filteredProducts =
    products.filter(product =>
      product.title
        .toLowerCase()
        .includes(filter.toLowerCase())
    );

  filteredProducts.forEach(product => {

    const isFavorite =
      favorites.includes(product.id);

    const productCard =
      document.createElement("div");

    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img
        src="${product.image}"
        class="product-image"
      >

      <div class="product-info">

        <h2 class="product-title">
          ${product.title}
        </h2>

        <div class="product-price">
          ${product.price}€
        </div>

        <button class="product-btn">
          Añadir al carrito
        </button>

        <button class="favorite-btn">
          ${isFavorite ? "❤️ Favorito" : "🤍 Favorito"}
        </button>

      </div>
    `;

    const addBtn =
      productCard.querySelector(".product-btn");

    const favoriteBtn =
      productCard.querySelector(".favorite-btn");

    addBtn.addEventListener("click", () => {

      cart.push(product);

      saveCart();

      updateCart();

    });

    favoriteBtn.addEventListener("click", () => {

      if (favorites.includes(product.id)) {

        favorites =
          favorites.filter(
            id => id !== product.id
          );

      }
      else {

        favorites.push(product.id);

      }

      saveFavorites();

      renderProducts(searchInput.value);

    });

    productsContainer.appendChild(productCard);

  });

}

function updateCart() {

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    const cartItem =
      document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <h3>${item.title}</h3>

      <p>${item.price}€</p>

      <button class="remove-btn">
        Eliminar
      </button>
    `;

    const removeBtn =
      cartItem.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {

      cart.splice(index, 1);

      saveCart();

      updateCart();

    });

    cartItems.appendChild(cartItem);

  });

  cartCount.textContent =
    cart.length;

  totalPrice.textContent =
    `${total}€`;

}

searchInput.addEventListener("input", () => {

  renderProducts(searchInput.value);

});

cartBtn.addEventListener("click", () => {

  cartPanel.classList.add("open");

});

closeCart.addEventListener("click", () => {

  cartPanel.classList.remove("open");

});

renderProducts();

updateCart();