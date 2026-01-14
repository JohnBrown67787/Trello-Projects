// -------------------------
// Config
// -------------------------
const CONFIG = {
  taxRate: 0.18,        // 18%
  shippingFlat: 10000   // 10,000 CFA
};

// -------------------------
// Utilities
// -------------------------
function round2(n){
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
function clamp(n, min, max){
  return Math.min(Math.max(n, min), max);
}
function normalizeCode(code){
  return (code || "").trim().toUpperCase();
}
function escapeHtml(str){
  return String(str || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// -------------------------
// Discount codes
// -------------------------
const DISCOUNTS = {
  "SAVE10": { code: "SAVE10", type: "PERCENT", value: 10 },
  "TAKE5000": { code: "TAKE5000", type: "FIXED", value: 5000 }
};

// -------------------------
// Cart state
// -------------------------
// Use CartUtils to get initial state
let cartItems = CartUtils.getCart();
let appliedDiscount = null; 

// -------------------------
// Core pricing logic
// -------------------------
function calcSubtotal(items){
    // Items structure: { id, title, price, image, quantity }
    // Note: CartUtils stores 'price' (number), not 'unitPrice' (legacy name)
    // We will support both 'price' and 'unitPrice' for backward compatibility if needed, 
    // but preferred is 'price'.
  return round2(items.reduce((sum, it) => sum + ((it.price || it.unitPrice || 0) * it.quantity), 0));
}

function calcDiscountAmount(subtotal, discount){
  if(!discount) return 0;

  let amount = 0;
  if(discount.type === "PERCENT"){
    amount = subtotal * (discount.value / 100);
  } else {
    amount = discount.value;
  }

  amount = round2(amount);
  return clamp(amount, 0, subtotal);
}

function calculateTotals(items, discount){
  const subtotal = calcSubtotal(items);
  const discountAmount = calcDiscountAmount(subtotal, discount);
  const discountedSubtotal = round2(subtotal - discountAmount);
  // Tax on discounted amount
  const taxAmount = round2(discountedSubtotal * CONFIG.taxRate);
  // Shipping only if there are items
  const shippingAmount = round2(items.length ? CONFIG.shippingFlat : 0);
  const total = round2(discountedSubtotal + taxAmount + shippingAmount);

  return { subtotal, discountAmount, discountedSubtotal, taxAmount, shippingAmount, total };
}

// -------------------------
// Cart operations
// -------------------------
function setQty(id, qty){
  const idx = cartItems.findIndex(x => x.id === id);
  if(idx === -1) return;
  
  if (qty < 1) {
    // Optional: could confirm removal here, but usually 0 means fail or remove
    qty = 1; 
  }
  
  cartItems[idx].quantity = qty;
  CartUtils.saveCart(cartItems); // Persist
  render();
}

function removeFromCart(id){
  cartItems = cartItems.filter(x => x.id !== id);
  CartUtils.saveCart(cartItems); // Persist
  render();
}

function clearCart(){
  cartItems = [];
  appliedDiscount = null;
  document.getElementById("discountInput").value = "";
  hideDiscountError();
  CartUtils.saveCart(cartItems); // Persist
  render();
}

// -------------------------
// Discount operations
// -------------------------
function showDiscountError(msg){
  const el = document.getElementById("discountError");
  if(el) {
      el.textContent = msg;
      el.style.display = "block";
  }
}
function hideDiscountError(){
  const el = document.getElementById("discountError");
  if(el) {
    el.style.display = "none";
    el.textContent = "";
  }
}

function applyCode(codeRaw){
  const code = normalizeCode(codeRaw);

  if(!code){
    appliedDiscount = null;
    hideDiscountError();
    render();
    return;
  }

  const d = DISCOUNTS[code];
  if(!d){
    appliedDiscount = null;
    showDiscountError("Invalid discount code.");
    render();
    return;
  }

  hideDiscountError();
  appliedDiscount = d;
  render();
}

function removeDiscount(){
  appliedDiscount = null;
  document.getElementById("discountInput").value = "";
  hideDiscountError();
  render();
}

// -------------------------
// Render
// -------------------------
function render(){
  // Update header count via Utils
  CartUtils.updateCartCountUserInterface();
  cartItems = CartUtils.getCart(); // Ensure specific sync if needed, though we mutate local ref

  document.getElementById("cartTitle").textContent = `Shopping Cart (${CartUtils.getCartCount()} items)`;

  const card = document.getElementById("itemsCard");
  card.innerHTML = "";

  if(cartItems.length === 0){
    const empty = document.createElement("div");
    empty.style.padding = "20px";
    empty.style.color = "#64748b";
    empty.style.fontWeight = "700";
    empty.textContent = "Your cart is empty. Use the demo buttons to add items.";
    card.appendChild(empty);
  } else {
    cartItems.forEach((it) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      
      const priceVal = it.price || it.unitPrice || 0;

      const thumb = document.createElement("div");
      // Fallback logic for demo compatibility or clean styling
      thumb.className = "thumb";
      if(it.image) {
          thumb.innerHTML = `<img src="${it.image.startsWith('src/') ? '../../'+it.image : it.image}" style="width:100%; height:100%; object-fit:cover;">`;
      } else {
          thumb.textContent = "Product";
      }

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `
        <div class="title">${escapeHtml(it.title || it.name)}</div>
        <div class="variant">${escapeHtml(it.variant || "")}</div>
        <div class="qty">
          <button class="qtybtn" aria-label="Decrease">−</button>
          <div class="qtyval">${it.quantity}</div>
          <button class="qtybtn" aria-label="Increase">+</button>
        </div>
      `;

      const right = document.createElement("div");
      right.className = "right-meta";
      right.innerHTML = `
        <div class="price">${CartUtils.formatCurrency(priceVal)}</div>
        <button class="remove" aria-label="Remove">🗑 Remove</button>
      `;

      const qtyBtns = meta.querySelectorAll(".qtybtn");
      qtyBtns[0].addEventListener("click", () => setQty(it.id, it.quantity - 1));
      qtyBtns[1].addEventListener("click", () => setQty(it.id, it.quantity + 1));

      right.querySelector(".remove").addEventListener("click", () => removeFromCart(it.id));

      row.appendChild(thumb);
      row.appendChild(meta);
      row.appendChild(right);
      card.appendChild(row);
    });
  }

  const totals = calculateTotals(cartItems, appliedDiscount);

  document.getElementById("subtotal").textContent = CartUtils.formatCurrency(totals.subtotal);
  document.getElementById("shipping").textContent = CartUtils.formatCurrency(totals.shippingAmount);
  document.getElementById("tax").textContent = CartUtils.formatCurrency(totals.taxAmount);
  document.getElementById("total").textContent = CartUtils.formatCurrency(totals.total);

  const discountRow = document.getElementById("discountRow");
  const discountApplied = document.getElementById("discountApplied");

  if(appliedDiscount){
    discountRow.style.display = "flex";
    document.getElementById("discountLabel").textContent = `Discount (${appliedDiscount.code})`;
    document.getElementById("discountAmount").textContent = "-" + CartUtils.formatCurrency(totals.discountAmount);

    discountApplied.style.display = "flex";
    document.getElementById("discountAppliedText").textContent =
      `${appliedDiscount.code} applied • You saved ${CartUtils.formatCurrency(totals.discountAmount)}`;
  } else {
    discountRow.style.display = "none";
    discountApplied.style.display = "none";
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.disabled = cartItems.length === 0;

  checkoutBtn.onclick = () => {
    const payload = {
      items: cartItems,
      discount: appliedDiscount,
      totals
    };
    alert(
      "Checkout payload (store these totals for order + email):\n\n" +
      JSON.stringify(payload, null, 2)
    );
    window.location.href = '../checkout/checkout.html';
  };
}

// -------------------------
// Wire up events on load
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Sync logic
  CartUtils.updateCartCountUserInterface();
  
  document.getElementById("applyBtn").addEventListener("click", () => {
    applyCode(document.getElementById("discountInput").value);
  });

  document.getElementById("discountInput").addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      applyCode(e.target.value);
    }
  });

  document.getElementById("removeDiscountBtn").addEventListener("click", removeDiscount);

  // Demo actions
  // Updated to use CartUtils for adding
  document.getElementById("demoAdd3").addEventListener("click", () => {
    // Mock products formatted for CartUtils
    // CartUtils expects { id, title, price, image }
    CartUtils.addToCart({
      id: "p1",
      title: "Studio Wireless Pro",
      price: 185000,
      image: "src/images/headphones.jpg"
    }, 1);

    CartUtils.addToCart({
      id: "p2",
      title: "Chronos Minimalist",
      price: 115000,
      image: "src/images/watch.jpg"
    }, 1);

    CartUtils.addToCart({
      id: "p3",
      title: "Everyday Tote",
      price: 20000,
      image: "src/images/bag.jpg" // placeholder
    }, 1);
    
    // Refresh local state from Utils
    render();
  });

  document.getElementById("demoClear").addEventListener("click", clearCart);

  document.getElementById("demoApplySave10").addEventListener("click", () => {
    document.getElementById("discountInput").value = "SAVE10";
    applyCode("SAVE10");
  });

  render();
});