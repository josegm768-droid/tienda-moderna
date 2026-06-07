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

let cart = [];

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

function renderProducts() {

  productsContainer.innerHTML = "";

  products.forEach(product => {

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

      </div>
    `;

    const addBtn =
      productCard.querySelector(".product-btn");

    addBtn.addEventListener("click", () => {

      cart.push(product);

      updateCart();

    });

    productsContainer.appendChild(productCard);

  });

}

function updateCart() {

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price;

    const cartItem =
      document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.price}€</p>
    `;

    cartItems.appendChild(cartItem);

  });

  cartCount.textContent = cart.length;

  totalPrice.textContent =
    `${total}€`;

}

cartBtn.addEventListener("click", () => {

  cartPanel.classList.add("open");

});

closeCart.addEventListener("click", () => {

  cartPanel.classList.remove("open");

});

renderProducts();