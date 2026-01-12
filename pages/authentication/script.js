/**
 * Shared Validation Logic for Login and Sign Up Pages
 * This script handles client-side validation for form inputs.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Select forms by ID
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Common Validation Functions

  const validateEmail = (email) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const showError = (input, message) => {
    const formGroup = input.parentElement; // The .form-input-container or direct parent
    // If wrapper is used for password, we might need to go up one more level or handle it specifically
    // But for our CSS structure, we'll target the input directly for border and add message after

    input.classList.add("input-error");

    // Check if error message already exists
    let error = formGroup.querySelector(".error-message");
    if (!error) {
      error = document.createElement("div");
      error.className = "error-message";
      // Insert after the input container or input
      if (
        formGroup.classList.contains("form-input-container") ||
        formGroup.classList.contains("password-wrapper")
      ) {
        formGroup.parentElement.appendChild(error);
      } else {
        formGroup.appendChild(error);
      }
    }
    error.innerText = message;
  };

  const clearError = (input) => {
    input.classList.remove("input-error");
    const formGroup = input.parentElement;
    let parent = formGroup;
    if (
      formGroup.classList.contains("form-input-container") ||
      formGroup.classList.contains("password-wrapper")
    ) {
      parent = formGroup.parentElement;
    }
    const error = parent.querySelector(".error-message");
    if (error) {
      error.remove();
    }
  };

  // Form Submit Handlers

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      let isValid = true;
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      // Validate Email
      if (!validateEmail(emailInput.value)) {
        e.preventDefault();
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Password
      if (passwordInput.value.trim() === "") {
        e.preventDefault();
        showError(passwordInput, "Password is required.");
        isValid = false;
      } else {
        clearError(passwordInput);
      }

      if (isValid) {
        // For demo purposes, we usually just let it submit or show an alert
        // e.preventDefault(); // Uncomment to stop redirection if no backend
        // alert('Login Validated!');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      let isValid = true;
      const nameInput = document.getElementById("fullname");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      // Validate Name
      if (nameInput.value.trim() === "") {
        e.preventDefault();
        showError(nameInput, "Full Name is required.");
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      if (!validateEmail(emailInput.value)) {
        e.preventDefault();
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Password (min length 6)
      if (passwordInput.value.length < 6) {
        e.preventDefault();
        showError(passwordInput, "Password must be at least 6 characters.");
        isValid = false;
      } else {
        clearError(passwordInput);
      }

      if (isValid) {
        // e.preventDefault();
        // alert('Sign Up Validated!');
      }
    });
  }

  // Toggle Password Visibility Logic
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.previousElementSibling;
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      // Toggle icon structure if we were doing complex icon swapping,
      // but for now simple toggle functionality is enough.
    });
  });
});
