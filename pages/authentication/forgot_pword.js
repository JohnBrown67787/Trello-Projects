document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resetForm");
  const emailInput = document.getElementById("email");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Helper functions for error handling
  const showError = (message) => {
    const formGroup = emailInput.closest(".form-group");
    let errorEl = formGroup.querySelector(".error-message");

    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.className = "error-message";
      formGroup.appendChild(errorEl);
    }

    errorEl.textContent = message;
    emailInput.classList.add("input-error");
  };

  const clearError = () => {
    const formGroup = emailInput.closest(".form-group");
    const errorEl = formGroup.querySelector(".error-message");
    if (errorEl) {
      errorEl.remove();
    }
    emailInput.classList.remove("input-error");
  };

  // Clear error on input
  emailInput.addEventListener("input", clearError);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showError("Please enter your email address.");
      return;
    }

    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Checking...";

    try {
      // Check if email exists in public profiles
      const { data: profiles, error: checkError } = await window.supabaseClient
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // PGRST116 is "Row not found" - correct for us
        // Any other error is a real issue
        throw checkError;
      }

      if (!profiles) {
        // Email not found in profiles table
        showError("Email does not exist.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
        return;
      }

      // Email exists, proceed to send reset link
      submitBtn.innerText = "Sending...";

      const redirectUrl = window.location.origin + "/login/change_pword.html";

      const { data, error } =
        await window.supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo: redirectUrl,
        });

      if (error) {
        throw error;
      }

      alert("Password reset link sent! Check your email.");
      emailInput.value = "";
      clearError();
    } catch (error) {
      console.error("Error sending reset mail:", error);
      showError(error.message || "An error occurred. Please try again.");
    } finally {
      if (submitBtn.innerText !== "Checking...") {
        // Only reset if we didn't return early
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });
});
