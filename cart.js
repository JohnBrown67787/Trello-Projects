// -------------------------
// Config (CFA)
// -------------------------
const CONFIG = {
  currencySuffix: "CFA",
  taxRate: 0.18,        // 18% (example in your UI: 300,000 * 18% = 54,000)
  shippingFlat: 10000   // 10,000 CFA
};

// -------------------------
// Utilities (safe rounding)
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

// Format: 185 000 CFA (no decimals for CFA amounts in your UI)
function formatCFA(amount){
  const n = Math.round(amount); // CFA shown as whole numbers in your screenshot
  const parts = String(n).split("");
  let out = "";
  for (let i = 0; i < parts.length; i++){
    const fromEnd = parts.length - i;
    out += parts[i];
    if (fromEnd > 1 && fromEnd % 3 === 1) out += " ";
  }
  return `${out} ${CONFIG.currencySuffix}`;
}

// -------------------------
// Discount codes (examples)
// -------------------------
const DISCOUNTS = {
  "SAVE10": { code: "SAVE10", type: "PERCENT", value: 10 },
  "TAKE5000": { code: "TAKE5000", type: "FIXED", value: 5000 }
};

// -------------------------
// Cart state
// -------------------------
let cartItems = [];
let appliedDiscount = null; // {code,type,value}

// -------------------------
// Core pricing logic (BUG FIX)
// -------------------------
function calcSubtotal(items){
  return round2(items.reduce((sum, it) => sum + (it.unitPrice * it.quantity), 0));
}

// CRITICAL FIX: discount applies once to subtotal (NOT per-item loop)
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

  // Tax on discounted amount (Acceptance Criteria)
  const taxAmount = round2(discountedSubtotal * CONFIG.taxRate);

  // Shipping only if there are items
  const shippingAmount = round2(items.length ? CONFIG.shippingFlat : 0);

  const total = round2(discountedSubtotal + taxAmount + shippingAmount);

  return { subtotal, discountAmount, discountedSubtotal, taxAmount, shippingAmount, total };
}

// -------------------------
// Cart operations
// -------------------------
function addToCart(product, qty = 1){
  const idx = cartItems.findIndex(x => x.id === product.id);
  if(idx >= 0){
    cartItems[idx].quantity += qty;
  } else {
    cartItems.push({ ...product, quantity: qty });
  }
  render();
}

function removeFromCart(id){
  cartItems = cartItems.filter(x => x.id !== id);
  render();
}

function setQty(id, qty){
  const item = cartItems.find(x => x.id === id);
  if(!item) return;
  item.quantity = Math.max(1, qty);
  render();
}

function clearCart(){
  cartItems = [];
  appliedDiscount = null;
  document.getElementById("discountInput").value = "";
  hideDiscountError();
  render();
}

// -------------------------
// Discount operations
// -------------------------
function showDiscountError(msg){
  const el = document.getElementById("discountError");
  el.textContent = msg;
  el.style.display = "block";
}
function hideDiscountError(){
  const el = document.getElementById("discountError");
  el.style.display = "none";
  el.textContent = "";
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
  document.getElementById("cartCount").textContent = String(cartItems.length);
  document.getElementById("cartTitle").textContent = `Shopping Cart (${cartItems.length} items)`;

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

      const thumb = document.createElement("div");
      thumb.className = "thumb" + (it.thumbStyle === "light" ? " light" : "");
      thumb.textContent = it.thumbText || "Product";

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `
        <div class="title">${escapeHtml(it.name)}</div>
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
        <div class="price">${formatCFA(it.unitPrice)}</div>
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

  document.getElementById("subtotal").textContent = formatCFA(totals.subtotal);
  document.getElementById("shipping").textContent = formatCFA(totals.shippingAmount);
  document.getElementById("tax").textContent = formatCFA(totals.taxAmount);
  document.getElementById("total").textContent = formatCFA(totals.total);

  const discountRow = document.getElementById("discountRow");
  const discountApplied = document.getElementById("discountApplied");

  if(appliedDiscount){
    discountRow.style.display = "flex";
    document.getElementById("discountLabel").textContent = `Discount (${appliedDiscount.code})`;
    document.getElementById("discountAmount").textContent = "-" + formatCFA(totals.discountAmount);

    discountApplied.style.display = "flex";
    document.getElementById("discountAppliedText").textContent =
      `${appliedDiscount.code} applied • You saved ${formatCFA(totals.discountAmount)}`;
  } else {
    discountRow.style.display = "none";
    discountApplied.style.display = "none";
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.disabled = cartItems.length === 0;

  // This payload is what you should store and use for the order confirmation email
  checkoutBtn.onclick = () => {
    const payload = {
      items: cartItems.map(i => ({ id: i.id, name: i.name, qty: i.quantity, unitPrice: i.unitPrice })),
      discount: appliedDiscount,
      totals
    };
    alert(
      "Checkout payload (store these totals for order + email):\n\n" +
      JSON.stringify(payload, null, 2)
    );
  };
}

// -------------------------
// Wire up events on load
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("applyBtn").addEventListener("click", () => {
    applyCode(document.getElementById("discountInput").value);
  });

  document.getElementById("discountInput").addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      applyCode(e.target.value);
    }
  });

  document.getElementById("removeDiscountBtn").addEventListener("click", removeDiscount);

  // Demo actions (now in CFA)
  document.getElementById("demoAdd3").addEventListener("click", () => {
    addToCart({
      id: "p1",
      name: "Studio Wireless Pro",
      variant: "Matte Black | Over-Ear",
      unitPrice: 185000,
      thumbText: "Headphones",
      thumbStyle: "dark"
    }, 1);

    addToCart({
      id: "p2",
      name: "Chronos Minimalist",
      variant: "Silver | Leather Strap",
      unitPrice: 115000,
      thumbText: "Watch",
      thumbStyle: "light"
    }, 1);

    // Add a third item for testing 3+ items (use any CFA amount)
    addToCart({
      id: "p3",
      name: "Everyday Tote",
      variant: "Sand | Canvas",
      unitPrice: 0,
      thumbText: "Bag",
      thumbStyle: "light"
    }, 1);
  });

  document.getElementById("demoClear").addEventListener("click", clearCart);

  document.getElementById("demoApplySave10").addEventListener("click", () => {
    document.getElementById("discountInput").value = "SAVE10";
    applyCode("SAVE10");
  });

  render();
});