/**
 * Constants & Data
 */
// Data is now loaded from src/data.js
// Access CATEGORIES and MOCK_PRODUCTS directly

/**
 * State
 */
let state = {
  activeCategory: "All Products",
  sortBy: "Newest Arrivals",
  priceRange: 750,
};

/**
 * Elements
 */
const categoryListEl = document.getElementById("category-list");
const productGridEl = document.getElementById("product-grid");
const sortSelectEl = document.getElementById("sort-select");
const priceRangeInput = document.getElementById("price-range");
const priceValueDisplay = document.getElementById("price-value");

/**
 * Core Logic
 */

function getFilteredAndSortedProducts() {
  // Filter
  let filtered = MOCK_PRODUCTS;
  if (state.activeCategory !== "All Products") {
    filtered = filtered.filter((p) => p.category === state.activeCategory);
  }

  // Sort
  const sorted = [...filtered];
  switch (state.sortBy) {
    case "Price: Low to High":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "Price: High to Low":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "Popularity":
      // Mock popularity sort (just reverse id for demo)
      sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      break;
    case "Newest Arrivals":
    default:
      // Default order (by ID)
      sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      break;
  }
  return sorted;
}

/**
 * Rendering
 */

function renderCategories() {
  categoryListEl.innerHTML = "";

  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `category-btn ${
      state.activeCategory === cat.name ? "active" : ""
    }`;
    btn.onclick = () => {
      state.activeCategory = cat.name;
      renderCategories(); // Re-render to update active class
      renderProducts();
    };

    const icon = document.createElement("i");
    icon.className = "category-icon";
    icon.setAttribute("data-lucide", cat.icon);

    // Note: Lucide icons need to be refreshed

    btn.appendChild(icon);
    btn.append(cat.name);
    categoryListEl.appendChild(btn);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderProducts() {
  const products = getFilteredAndSortedProducts();
  productGridEl.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const isNewBadge = product.isNew ? `<div class="new-badge">New</div>` : "";

    card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${product.image}" alt="${
      product.title
    }" class="card-image">
                ${isNewBadge}
                <button class="card-heart-btn">
                    <i data-lucide="heart"></i>
                </button>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${product.title}</h3>
                </div>
                <div class="card-price-row">
                    <span class="card-price">${CartUtils.formatCurrency(product.price)}</span>
                    <button class="card-cart-btn" onclick="addToCartHandler('${product.id}')">
                        <i data-lucide="shopping-cart"></i>
                    </button>
                </div>
                <p class="card-desc">${product.shortDescription || product.description}</p>
                 <button class="view-btn" onclick="window.location.href='pages/product-details/product-details.html?id=${product.id}'">
                    <i data-lucide="eye"></i>
                    View Details
                </button>
            </div>
        `;

    productGridEl.appendChild(card);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Handler helper to avoid inline object passing issues
function addToCartHandler(productId) {
    const event = window.event;
    if(event) event.stopPropagation();
    
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (product) {
        CartUtils.addToCart(product);
        alert('Added to cart!'); // Temporary feedback
    }
}

/**
 * Event Listeners
 */

sortSelectEl.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  renderProducts();
});

priceRangeInput.addEventListener("input", (e) => {
  state.priceRange = e.target.value;
  priceValueDisplay.textContent = `Fr. ${state.priceRange}`;
});

/**
 * Initialization
 */
function init() {
  renderCategories();
  renderProducts();
  // checkUserSession(); // Removed: Handled by src/auth-utils.js
}


// Start
init();
