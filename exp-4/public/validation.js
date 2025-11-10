// Get form and inputs
const form = document.getElementById("registrationForm");
const fullname = document.getElementById("fullname");
const password = document.getElementById("password");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const registerBtn = document.getElementById("registerBtn");

const sexRadios = document.querySelectorAll('input[name="sex"]');
const dobDay = document.querySelector('select[name="dob-day"]');
const dobMonth = document.querySelector('select[name="dob-month"]');
const dobYear = document.querySelector('select[name="dob-year"]');
const languageCheckboxes = document.querySelectorAll('input[name="languages"]');

// Error spans
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

// Regex
const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

function validateName() {
  const name = fullname.value.trim();
  if (!nameRegex.test(name) || name.length < 6) {
    nameError.textContent =
      "Name must contain only letters and be at least 6 characters.";
    fullname.classList.add("invalid");
    fullname.classList.remove("valid");
    return false;
  }
  nameError.textContent = "";
  fullname.classList.add("valid");
  fullname.classList.remove("invalid");
  return true;
}

function validatePassword() {
  if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    password.classList.add("invalid");
    password.classList.remove("valid");
    return false;
  }
  passwordError.textContent = "";
  password.classList.add("valid");
  password.classList.remove("invalid");
  return true;
}

function validateEmail() {
  if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Enter a valid email (example: name@domain.com).";
    email.classList.add("invalid");
    email.classList.remove("valid");
    return false;
  }
  emailError.textContent = "";
  email.classList.add("valid");
  email.classList.remove("invalid");
  return true;
}

function validatePhone() {
  if (!phoneRegex.test(phone.value.trim())) {
    phoneError.textContent = "Phone number must be exactly 10 digits.";
    phone.classList.add("invalid");
    phone.classList.remove("valid");
    return false;
  }
  phoneError.textContent = "";
  phone.classList.add("valid");
  phone.classList.remove("invalid");
  return true;
}

function validateSex() {
  return Array.from(sexRadios).some((radio) => radio.checked);
}

function validateDOB() {
  return dobDay.value !== "" && dobMonth.value !== "" && dobYear.value !== "";
}

function validateAddress() {
  return address.value.trim().length > 0;
}

function validateLanguages() {
  return Array.from(languageCheckboxes).some((checkbox) => checkbox.checked);
}

function checkFormValidity() {
  const allFilled =
    fullname.value.trim() !== "" &&
    password.value.trim() !== "" &&
    email.value.trim() !== "" &&
    phone.value.trim() !== "" &&
    address.value.trim() !== "" &&
    validateSex() &&
    validateDOB() &&
    validateLanguages();

  const allValid =
    validateName() && validatePassword() && validateEmail() && validatePhone();

  const formValid = allFilled && allValid;

  registerBtn.disabled = !formValid;
  registerBtn.classList.toggle("disabled", !formValid);

  return formValid;
}

fullname.addEventListener("input", () => {
  validateName();
  checkFormValidity();
});
password.addEventListener("input", () => {
  validatePassword();
  checkFormValidity();
});
email.addEventListener("input", () => {
  validateEmail();
  checkFormValidity();
});
phone.addEventListener("input", () => {
  validatePhone();
  checkFormValidity();
});
address.addEventListener("input", checkFormValidity);
sexRadios.forEach((radio) =>
  radio.addEventListener("change", checkFormValidity)
);
dobDay.addEventListener("change", checkFormValidity);
dobMonth.addEventListener("change", checkFormValidity);
dobYear.addEventListener("change", checkFormValidity);
languageCheckboxes.forEach((cb) =>
  cb.addEventListener("change", checkFormValidity)
);

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    fullname: document.getElementById("fullname").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    sex: form.sex.value,
    dob: `${form["dob-year"].value}-${form["dob-month"].value}-${form["dob-day"].value}`,
    languages: Array.from(
      form.querySelectorAll("input[name='languages']:checked")
    ).map((cb) => cb.value),
    address: document.getElementById("address").value,
  };

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Registration successful! Redirecting to login...");
      window.location.href = "login.html";
    } else {
      alert("Error: " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  }
});
