(() => {
  const form = document.getElementById("productForm");
  const price = document.getElementById("price");
  const fileInput = document.getElementById("productImage");
  const dropzone = document.getElementById("dropzone");
  const dropzoneInner = document.getElementById("dropzoneInner");
  const preview = document.getElementById("preview");
  const previewImg = document.getElementById("previewImg");
  const fileNameEl = document.getElementById("fileName");
  const removeBtn = document.getElementById("removeImage");
  const uploadError = document.getElementById("uploadError");
  const uploadStatus = document.getElementById("uploadStatus");
  const cancelBtn = document.getElementById("cancelBtn");

  const ALLOWED = new Set([
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/svg+xml",
    "image/webp"
  ]);

  function setError(message) {
    if (!message) {
      uploadError.hidden = true;
      uploadError.textContent = "";
      return;
    }
    uploadError.hidden = false;
    uploadError.textContent = message;
  }

  function clearPreview() {
    preview.hidden = true;
    previewImg.removeAttribute("src");
    fileNameEl.textContent = "—";
    dropzoneInner.style.display = "";
    uploadStatus.textContent = "No file selected";
    setError("");
    fileInput.value = "";
  }

  function showPreview(file) {
    setError("");

    const url = URL.createObjectURL(file);
    previewImg.onload = () => URL.revokeObjectURL(url); // avoid memory leaks

    previewImg.src = url;
    fileNameEl.textContent = file.name;
    preview.hidden = false;
    dropzoneInner.style.display = "none";
    uploadStatus.textContent = "1 file selected";
  }

  async function handleFile(file) {
    if (!file) return;

    // Allow any dimensions. Only block non-images.
    // Some browsers may provide empty type for uncommon images, so also check extension lightly.
    const looksLikeImage =
      (file.type && file.type.startsWith("image/")) ||
      /\.(png|jpe?g|gif|svg|webp|bmp|tiff?)$/i.test(file.name);

    if (!looksLikeImage) {
      clearPreview();
      setError("Please upload an image file (PNG, JPG, GIF, SVG, WEBP, etc.).");
      return;
    }

    // If the browser provides a specific type, optionally restrict it to known-safe types:
    if (file.type && !ALLOWED.has(file.type) && !file.type.startsWith("image/")) {
      clearPreview();
      setError("Unsupported file type. Please upload an image file.");
      return;
    }

    showPreview(file);
  }

  // Dropzone interactions
  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("is-dragover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("is-dragover");
  });

  dropzone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropzone.classList.remove("is-dragover");
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    await handleFile(file);
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    await handleFile(file);
  });

  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearPreview();
  });

  // Price input: digits + one dot, format to 2dp on blur
  price.addEventListener("input", () => {
    const raw = price.value;
    const cleaned = raw.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
    if (cleaned !== raw) price.value = cleaned;
  });

  price.addEventListener("blur", () => {
    const v = price.value.trim();
    if (!v) return;
    const num = Number(v);
    if (!Number.isFinite(num)) return;
    price.value = num.toFixed(2);
  });

  cancelBtn.addEventListener("click", () => {
    form.reset();
    clearPreview();
    setError("");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.productName.value.trim();
    const desc = form.description.value.trim();

    if (!name || !desc) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Saving...";

    window.setTimeout(() => {
      btn.disabled = false;
      btn.textContent = old;
      alert("Product saved (demo). Hook this to your backend/API.");
    }, 650);
  });

  clearPreview();
})();