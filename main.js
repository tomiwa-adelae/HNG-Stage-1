console.log("main.js is connected!");

// Display current time
const updateTime = () => {
  const timeElement = document.getElementById("timeDisplay");
  if (!timeElement) return; // Prevents errors if not on a page with the time display
  const now = new Date();

  const formatted = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  timeElement.textContent = formatted;
};

updateTime();
setInterval(updateTime, 1000);

// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// ====== FORM VALIDATION ======

const form = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const successMessage = document.getElementById("successMessage");

// Validation functions
function validateName() {
  const nameError = document.getElementById("nameError");
  if (fullName.value.trim() === "") {
    showError(fullName, nameError, "Please enter your full name");
    return false;
  }
  hideError(fullName, nameError);
  return true;
}

function validateEmail() {
  const emailError = document.getElementById("emailError");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value.trim() === "") {
    showError(email, emailError, "Please enter your email address");
    return false;
  }

  if (!emailPattern.test(email.value.trim())) {
    showError(email, emailError, "Please enter a valid email address (e.g., name@example.com)");
    return false;
  }

  hideError(email, emailError);
  return true;
}

function validateSubject() {
  const subjectError = document.getElementById("subjectError");
  if (subject.value.trim() === "") {
    showError(subject, subjectError, "Please enter a subject");
    return false;
  }
  hideError(subject, subjectError);
  return true;
}

function validateMessage() {
  const messageError = document.getElementById("messageError");
  if (message.value.trim() === "") {
    showError(message, messageError, "Please enter a message");
    return false;
  }

  if (message.value.trim().length < 10) {
    showError(message, messageError, "Message must be at least 10 characters long");
    return false;
  }

  hideError(message, messageError);
  return true;
}

function showError(input, errorElement, errorMessage) {
  input.classList.add("error");
  input.classList.remove("success");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("show");
}

function hideError(input, errorElement) {
  input.classList.remove("error");
  input.classList.add("success");
  errorElement.classList.remove("show");
}

// Real-time validation
fullName?.addEventListener("blur", validateName);
email?.addEventListener("blur", validateEmail);
subject?.addEventListener("blur", validateSubject);
message?.addEventListener("blur", validateMessage);

fullName?.addEventListener("input", function () {
  if (this.classList.contains("error") || this.classList.contains("success")) validateName();
});

email?.addEventListener("input", function () {
  if (this.classList.contains("error") || this.classList.contains("success")) validateEmail();
});

subject?.addEventListener("input", function () {
  if (this.classList.contains("error") || this.classList.contains("success")) validateSubject();
});

message?.addEventListener("input", function () {
  if (this.classList.contains("error") || this.classList.contains("success")) validateMessage();
});

// Form submission
form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    successMessage.classList.add("show");
    form.reset();

    [fullName, email, subject, message].forEach((field) => {
      field.classList.remove("success", "error");
    });

    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);
  } else {
    if (!isNameValid) fullName.focus();
    else if (!isEmailValid) email.focus();
    else if (!isSubjectValid) subject.focus();
    else if (!isMessageValid) message.focus();
  }
});
