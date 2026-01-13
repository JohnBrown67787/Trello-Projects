let selectedMethod = "mtn";

function setMethod(method){
  selectedMethod = method;
  document.querySelectorAll(".pay-option").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.method === method);
  });
}

function renderSummary(){
  const state = ShopModernCart.getState();
  const totals = ShopModernCart.calculateTotals(state.items, state.discount);
  const cfg = ShopModernCart.getConfig();

  // Items
  const wrap = document.getElementById("summaryItems");
  wrap.innerHTML = "";

  if(state.items.length === 0){
    wrap.innerHTML = `<div style="color:#64748b;font-weight:800;padding:10px 0;">No items in cart.</div>`;
  } else {
    state.items.forEach(it => {
      const div = document.createElement("div");
      div.className = "sum-item";

      const thumb = document.createElement("div");
      thumb.className = "sum-thumb" + (it.thumbStyle === "light" ? " light" : "");
      thumb.textContent = it.thumbText || "Product";

      const info = document.createElement("div");
      info.innerHTML = `
        <div class="sum-name">${escapeHtml(it.name)}</div>
        <div class="sum-meta">${escapeHtml(it.variant || "")} • Qty: ${it.quantity}</div>
        <div class="sum-price">${ShopModernCart.formatCFA(it.unitPrice)}</div>
      `;

      div.appendChild(thumb);
      div.appendChild(info);
      wrap.appendChild(div);
    });
  }

  // Lines
  document.getElementById("sumSubtotal").textContent = ShopModernCart.formatCFA(totals.subtotal);
  document.getElementById("sumTax").textContent = ShopModernCart.formatCFA(totals.taxAmount);

  const shippingEl = document.getElementById("sumShipping");
  if(totals.shippingAmount === 0){
    shippingEl.textContent = "Free";
    shippingEl.classList.add("free");
  } else {
    shippingEl.textContent = ShopModernCart.formatCFA(totals.shippingAmount);
    shippingEl.classList.remove("free");
  }

  // Discount
  const discLine = document.getElementById("sumDiscountLine");
  if(state.discount){
    discLine.style.display = "flex";
    document.getElementById("sumDiscountLabel").textContent = `Discount (${state.discount.code})`;
    document.getElementById("sumDiscount").textContent = "-" + ShopModernCart.formatCFA(totals.discountAmount);
  } else {
    discLine.style.display = "none";
  }

  document.getElementById("sumTotal").textContent = ShopModernCart.formatCFA(totals.total);
}

function escapeHtml(str){
  return String(str || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function showCheckoutError(msg){
  const el = document.getElementById("checkoutError");
  el.textContent = msg;
  el.style.display = "block";
}
function hideCheckoutError(){
  const el = document.getElementById("checkoutError");
  el.style.display = "none";
  el.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Payment method buttons
  document.querySelectorAll(".pay-option").forEach(btn => {
    btn.addEventListener("click", () => setMethod(btn.dataset.method));
  });

  // Complete purchase
  document.getElementById("completePurchaseBtn").addEventListener("click", () => {
    hideCheckoutError();

    const state = ShopModernCart.getState();
    if(state.items.length === 0){
      showCheckoutError("Your cart is empty. Please add items before checkout.");
      return;
    }

    const order = {
      shipping: {
        fullName: document.getElementById("fullName").value.trim(),
        street: document.getElementById("street").value.trim(),
        city: document.getElementById("city").value.trim(),
        zip: document.getElementById("zip").value.trim()
      },
      paymentMethod: selectedMethod,
      items: state.items,
      discount: state.discount,
      totals: ShopModernCart.getTotals(),
      createdAt: new Date().toISOString()
    };

    // In a real app: send `order` to backend + generate email from `order.totals` stored on server
    alert("Order created (use this for confirmation + email totals):\n\n" + JSON.stringify(order, null, 2));
  });

  renderSummary();
});