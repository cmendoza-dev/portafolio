const menu = document.querySelector(".menu-links");
const menuIcon = document.querySelector(".hamburger-icon");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

function toggleMenu() {
  if (!menu || !menuIcon) {
    return;
  }

  menu.classList.toggle("open");
  menuIcon.classList.toggle("open");
}

function showFormFeedback(event) {
  event.preventDefault();
  formFeedback?.classList.remove("hidden");
}

contactForm?.addEventListener("submit", showFormFeedback);

window.toggleMenu = toggleMenu;