document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("updatePasswordForm");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitBtn = form.querySelector('button[type="submit"]');
  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");

  // Helper: Show Error
  const showError = (input, message) => {
    const formGroup = input.closest(".form-group");
    let errorEl = formGroup.querySelector(".error-message");
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.className = "error-message";
      formGroup.appendChild(errorEl);
    }
    errorEl.textContent = message;
    input.classList.add("input-error");
  };

  const clearError = (input) => {
    const formGroup = input.closest(".form-group");
    const errorEl = formGroup.querySelector(".error-message");
    if (errorEl) errorEl.remove();
    input.classList.remove("input-error");
  };

  // Clear errors on input
  [newPasswordInput, confirmPasswordInput].forEach((inp) => {
    inp.addEventListener("input", () => clearError(inp));
  });

  // Toggle Password Visibility
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        // Optional: Change icon (currently generic eye, could be eye-slash)
        btn.style.color = "var(--primary-color)";
      } else {
        input.type = "password";
        btn.style.color = ""; // reset
      }
    });
  });

  // Password Strength Logic
  newPasswordInput.addEventListener("input", () => {
    const val = newPasswordInput.value;
    let strength = 0;
    let message = "";
    let color = "";

    if (val.length >= 8) strength += 1;
    if (val.match(/[0-9]/)) strength += 1;
    if (val.match(/[!@#$%^&*]/)) strength += 1;

    if (val.length === 0) {
      strength = 0;
      message = "";
    } else if (val.length < 6) {
      message = "Too Short";
      color = "var(--red-500)";
      strengthBar.style.width = "20%";
    } else if (strength === 1) {
      message = "Weak";
      color = "var(--red-500)";
      strengthBar.style.width = "33%";
    } else if (strength === 2) {
      message = "Medium";
      color = "var(--yellow-500)";
      strengthBar.style.width = "66%";
    } else if (strength >= 3) {
      message = "Strong";
      color = "var(--green-500)";
      strengthBar.style.width = "100%";
    }

    strengthText.textContent = message;
    strengthText.style.color = color;
    strengthBar.style.backgroundColor = color;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous generic alerts handled via specific inline errors now
    [newPasswordInput, confirmPasswordInput].forEach(clearError);

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validation Benchmarks
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*]/.test(newPassword);

    let isValid = true;

    if (newPassword.length < 8) {
      showError(newPasswordInput, "Password must be at least 8 characters.");
      isValid = false;
    } else if (!hasNumber) {
      showError(newPasswordInput, "Password must contain at least one number.");
      isValid = false;
    } else if (!hasSpecial) {
      showError(
        newPasswordInput,
        "Password must contain at least one special character (!@#$%^&*)."
      );
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      showError(confirmPasswordInput, "Passwords do not match.");
      isValid = false;
    }

    if (!isValid) return;

    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Updating...";

    try {
      const { data, error } = await window.supabaseClient.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      // Success Benchmark: Show UI message
      form.innerHTML = `
                <div class="success-message">
                    Password updated successfully.
                </div>
                <p style="text-align: center; font-size: 0.875rem; color: var(--gray-500);">
                    Redirecting to login...
                </p>
            `;

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      // Show global error above btn or alert
      alert("Error: " + error.message);
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  });
});
