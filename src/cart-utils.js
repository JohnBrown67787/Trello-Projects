/**
 * Cart Utilities
 * Should be included after data.js
 */
const CartUtils = {
    // LocalStorage Key
    STORAGE_KEY: 'shopmodern_cart',
    
    // Formatting: 125000 -> "125 000 CFA"
    formatCurrency(amount) {
        // Use fr-FR locale for space separator, typical for CFA
        return new Intl.NumberFormat('fr-FR').format(amount) + ' CFA';
    },

    getCart() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load cart", e);
            return [];
        }
    },

    saveCart(cartItems) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartItems));
        // Dispatch event for UI updates
        window.dispatchEvent(new Event('cart-updated'));
    },

    /**
     * @param {Object} product - Full product object from MOCK_PRODUCTS
     * @param {number} quantity - Quantity to add (default 1)
     */
    addToCart(product, quantity = 1) {
        let cart = this.getCart();
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            // Store only necessary fields to save space, plus current price
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart(cart);
        
        // Visual feedback (Toast or Alert - Placeholder for now)
        // We will replace the native alert with a custom toast in the future, 
        // but for now we'll just log or let the UI handle it.
    },

    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },
    
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    /**
     * Updates all elements with class 'badge' or id 'cartCount' 
     */
    updateCartCountUserInterface() {
        const count = this.getCartCount();
        
        // Update header badge (desktop/mobile)
        const badges = document.querySelectorAll('.badge');
        badges.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });

        // Update specific ID if exists (like in cart page)
        const idBadge = document.getElementById('cartCount');
        if (idBadge) {
            idBadge.textContent = count;
            idBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// Listen for updates globally to refresh counters
window.addEventListener('cart-updated', () => {
    CartUtils.updateCartCountUserInterface();
});

// Initial check on load
document.addEventListener('DOMContentLoaded', () => {
    CartUtils.updateCartCountUserInterface();
});
