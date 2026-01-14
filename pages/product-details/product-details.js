/**
 * Product Details Page Logic
 */

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Elements
const productContainer = document.getElementById('product-container');
const bcCategory = document.getElementById('bc-category');
const bcTitle = document.getElementById('bc-title');
const tabContent = document.getElementById('tab-content');
const tabBtns = document.querySelectorAll('.tab-btn');

function init() {
    if (!productId) {
        productContainer.innerHTML = '<p class="error">Product not found.</p>';
        return;
    }

    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        productContainer.innerHTML = '<p class="error">Product not found.</p>';
        return;
    }

    renderProduct(product);
    initTabs(product);
    lucide.createIcons();
}

function getCorrectImagePath(path) {
    // Current location: pages/product-details/
    // Image path in data: src/images/...
    // Target: ../../src/images/...
    if (path.startsWith('src/')) {
        return '../../' + path;
    }
    return path;
}

function renderProduct(product) {
    // Breadcrumbs
    bcCategory.textContent = product.category;
    bcTitle.textContent = product.title;

    const imagePath = getCorrectImagePath(product.image);

    // Setup HTML
    const html = `
        <div class="product-gallery">
            <div class="main-image-wrapper">
                <img src="${imagePath}" alt="${product.title}" class="main-image" id="main-image">
            </div>
            <div class="thumbnail-list">
                <div class="thumbnail active" onclick="updateImage('${imagePath}')">
                    <img src="${imagePath}" alt="${product.title}">
                </div>
                <!-- Mock thumbnails since we only have one image per product in data -->
                <div class="thumbnail" onclick="updateImage('${imagePath}')">
                    <img src="${imagePath}" alt="${product.title}" style="filter: grayscale(1);">
                </div>
                <div class="thumbnail" onclick="updateImage('${imagePath}')">
                    <img src="${imagePath}" alt="${product.title}" style="filter: sepia(0.5);">
                </div>
            </div>
        </div>

        <div class="product-info">
            ${product.isNew ? '<span class="new-badge-lg">New Arrival</span>' : ''}
            
            <h1 class="product-title-lg">${product.title}</h1>
            
            <div class="product-price-lg">
                <span>Fr. ${product.price.toFixed(2)}</span>
                <span class="original-price">Fr. ${(product.price * 1.2).toFixed(2)}</span>
            </div>

            <p class="short-desc">
                ${product.shortDescription}
            </p>

            <div class="selector-group">
                <label class="selector-label">Select Color</label>
                <div class="color-options">
                    <div class="color-option selected" style="background-color: #000;"></div>
                    <div class="color-option" style="background-color: #9ca3af;"></div>
                    <div class="color-option" style="background-color: #1e3a8a;"></div>
                </div>
            </div>

            <div class="actions-row">
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="updateQty(-1)">-</button>
                    <input type="text" value="1" class="qty-input" id="qty-input" readonly>
                    <button class="qty-btn" onclick="updateQty(1)">+</button>
                </div>
                <button class="add-to-cart-lg" onclick="alert('Added to cart!')">
                    <i data-lucide="shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="wishlist-btn-lg">
                    <i data-lucide="heart"></i>
                </button>
            </div>

            <div class="trust-badges">
                <div class="trust-item">
                    <i data-lucide="truck"></i>
                    Free Express Shipping
                </div>
                <div class="trust-item">
                    <i data-lucide="shield-check"></i>
                    2 Year Warranty
                </div>
            </div>
        </div>
    `;

    productContainer.innerHTML = html;
}

function initTabs(product) {
    // Description Tab
    const descContent = document.createElement('div');
    descContent.className = 'tab-pane active';
    descContent.id = 'desc';
    // Split description into paragraphs
    const paragraphs = product.description.split('\n\n').map(p => `<p style="margin-bottom: 1em;">${p}</p>`).join('');
    descContent.innerHTML = `<h3>Deep Dive into Audio Excellence</h3>${paragraphs}`;

    // Specs Tab
    const specsContent = document.createElement('div');
    specsContent.className = 'tab-pane';
    specsContent.id = 'specs';
    
    let specsHtml = '<ul class="specs-list">';
    if (product.features) {
        product.features.forEach(feat => {
            specsHtml += `
                <li>
                    <strong>Feature</strong>
                    <span>${feat}</span>
                </li>`;
        });
    } else {
        specsHtml += '<li>No specifications available.</li>';
    }
    specsHtml += '</ul>';
    specsContent.innerHTML = specsHtml;

    // Reviews Tab
    const reviewsContent = document.createElement('div');
    reviewsContent.className = 'tab-pane';
    reviewsContent.id = 'reviews';
    reviewsContent.innerHTML = `<p><strong>${product.reviews || 0} Reviews</strong></p><p>Rating: ${product.rating || 'N/A'}/5</p><p>Review content placement...</p>`;

    tabContent.appendChild(descContent);
    tabContent.appendChild(specsContent);
    tabContent.appendChild(reviewsContent);

    // Update count in header
    document.getElementById('review-count').textContent = product.reviews || 0;

    // Event Listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

            // Add active class
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Helpers
window.updateQty = function (change) {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value);
    val += change;
    if (val < 1) val = 1;
    input.value = val;
};

window.updateImage = function (src) {
    document.getElementById('main-image').src = src;
    // Update active highlight logic here if needed
};


init();
