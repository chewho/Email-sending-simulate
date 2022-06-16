// VARIABLES
const sendBtn = document.getElementById("sendBtn");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const sendEmailForm = document.getElementById("email-form");

// EVENT LISTENERS
eventListeners();

function eventListeners() {
  // App Init
  document.addEventListener("DOMContentLoaded", appInit);

  // Validate the form
  email.addEventListener("blur", validateField);
  subject.addEventListener("blur", validateField);
  message.addEventListener("blur", validateField);

  // Send email and reset button
  sendEmailForm.addEventListener("submit", sendEmail);
  resetBtn.addEventListener("click", resetForm);
}

// FUNCTIONS
// App Initialization
function appInit() {
  // Disable the send button on load
  sendBtn.disabled = true;
}

function sendEmail(e) {
  e.preventDefault();

  // Show the spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "block";

  // Show email send image
  const sendEmailImg = document.createElement("img");
  sendEmailImg.src = "img/mail.gif";
  sendEmailImg.style.display = "block";

  // Hide spinner then show send email image
  setTimeout(function () {
    // Hide spinner
    spinner.style.display = "none";

    // Show email send image
    document.querySelector("#loaders").appendChild(sendEmailImg);

    // Hide email send image
    setTimeout(function () {
      sendEmailForm.reset();
      sendEmailImg.remove();
    }, 3000);
  }, 2000);
}

// Validate the fields
function validateField() {
  let errors;
  // Validate the length of the field
  validateLength(this);
  // Validate the email
  if (this.type === "email") {
    validateEmail(this);
  }

  // Both will return errors, then check if there're any errors
  errors = document.querySelectorAll(".error");
  // Check that the inputs are not empty
  if (email.value !== "" && subject.value !== "" && message.value !== "") {
    if (errors.length === 0) {
      // The button should be enabled
      sendBtn.disabled = false;
    }
  }
}

// Validate the length of the field
function validateLength(field) {
  if (field.value.length > 0) {
    field.style.borderBottomColor = "green";
    field.classList.remove("error");
  } else {
    field.style.borderBottomColor = "red";
    field.classList.add("error");
  }
}

// Validate email (checks for @ in the value)
function validateEmail(field) {
  let emailText = field.value;
  // Check if the emailText contains the @ sign
  if (emailText.indexOf("@") !== -1) {
    field.style.borderBottomColor = "green";
    field.classList.remove("error");
  } else {
    field.style.borderBottomColor = "red";
    field.classList.add("error");
  }
}

// Reset the form
function resetForm() {
  sendEmailForm.reset();
}
