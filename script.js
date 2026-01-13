/**
 * Constants & Data
 */
const CATEGORIES = [
  { name: "All Products", icon: "layout-grid" },
  { name: "Electronics", icon: "smartphone" },
  { name: "Fashion", icon: "shirt" },
  { name: "Home & Living", icon: "home" },
  { name: "Accessories", icon: "package" },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Studio Wireless Headphones",
    price: 299.0,
    description: "Noise cancelling premium audio experience with 40h battery.",
    image: "src/images/headphones.jpg",
    isNew: true,
    category: "Electronics",
  },
  {
    id: "2",
    title: "Chronos Minimalist Watch",
    price: 185.0,
    description: "Precision engineered silver watch with leather strap.",
    image: "src/images/watch.jpg",
    category: "Accessories",
  },
  {
    id: "3",
    title: "Nomad Leather Backpack",
    price: 145.0,
    description: "Genuine full-grain leather for the modern traveler.",
    image: "src/images/backpack.jpg",
    category: "Fashion",
  },
  {
    id: "4",
    title: "Smart Hub Controller",
    price: 120.0,
    description: "Universal automation for your smart home devices.",
    image: "src/images/shub.jpg",
    category: "Electronics",
  },
  {
    id: "5",
    title: "Mechanical Tactile Keyboard",
    price: 155.0,
    description: "Hot-swappable tactile switches with RGB lighting.",
    image: "src/images/keyboard.jpg",
    category: "Electronics",
  },
  {
    id: "6",
    title: "Oak Aura Desk Lamp",
    price: 89.0,
    description: "Natural wood finish with adjustable warm light.",
    image: "src/images/lamp.jpg",
    category: "Home & Living",
  },
  {
    id: "7",
    title: "Sonic Buds Gen 2",
    price: 129.0,
    description: "Active noise cancellation with crystal clear voice calls.",
    image: "src/images/buds.jpg",
    category: "Electronics",
  },
  {
    id: "8",
    title: "Organic Cotton Tee",
    price: 35.0,
    description: "Sustainable fabric with relaxed, breathable fit.",
    image: "src/images/tee.jpg",
    category: "Fashion",
  },
];

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
                    <span class="card-price">Fr. ${product.price.toFixed(2)}</span>
                    <button class="card-cart-btn" onclick="const e=event; e.stopPropagation(); alert('Added to cart!');">
                        <i data-lucide="shopping-cart"></i>
                    </button>
                </div>
                <p class="card-desc">${product.description}</p>
                <button class="view-btn" onclick="alert('Product details coming soon!')">
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
  checkUserSession();
}

async function checkUserSession() {
  const userNameEl = document.getElementById("user-name");
  const userEmailEl = document.getElementById("user-email");
  const userAvatarEl = document.getElementById("user-avatar");
  const profileBtn = document.getElementById("user-profile-btn");

  const authButtons = document.getElementById("auth-buttons");

  if (!window.supabaseClient) {
    console.error("Supabase client not initialized");
    return;
  }

  try {
    const {
      data: { session },
    } = await window.supabaseClient.auth.getSession();

    if (session) {
      if (authButtons) authButtons.style.display = "none";
      if (profileBtn) profileBtn.style.display = "flex";

      const { user } = session;
      const fullName = user.user_metadata.full_name || "User";
      const email = user.email;

      if (userNameEl) userNameEl.textContent = fullName;
      if (userEmailEl) userEmailEl.textContent = email;
      
      // Update avatar if available in metadata, otherwise keep default
      if (user.user_metadata.avatar_url && userAvatarEl) {
        userAvatarEl.src = user.user_metadata.avatar_url;
      }

      const avatarInput = document.getElementById("avatar-input");
      if (avatarInput && userAvatarEl) {
        // Handle avatar click
        userAvatarEl.style.cursor = "pointer";
        userAvatarEl.onclick = (e) => {
          e.stopPropagation(); // Prevent button click
          avatarInput.click();
        };

        // Handle file selection
        avatarInput.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } =
              await window.supabaseClient.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data } = window.supabaseClient.storage
              .from("avatars")
              .getPublicUrl(filePath);

            const publicUrl = data.publicUrl;

            // Update User Metadata
            const { error: updateUserError } =
              await window.supabaseClient.auth.updateUser({
                data: { avatar_url: publicUrl },
              });

            if (updateUserError) throw updateUserError;

            // Update UI
            userAvatarEl.src = publicUrl;
            alert("Avatar updated successfully!");
          } catch (error) {
            console.error("Avatar upload error:", error);
            alert("Failed to upload avatar: " + error.message);
          }
        };
      }

      // Optional: Add click handler to log out or go to profile
      if (profileBtn) {
        profileBtn.onclick = () => {
          // Future: Go to profile or logout
          console.log("Profile clicked");
        };
      }
    } else {
      // No session
      if (authButtons) authButtons.style.display = "flex";
      if (profileBtn) profileBtn.style.display = "none";
    }
  } catch (err) {
    console.error("Error checking session:", err);
  }
}

// Start
init();
