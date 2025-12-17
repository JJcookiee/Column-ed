// ===== THEME TOGGLE =====

// Selectors
const themeButton = document.getElementById("themeToggle");
const body = document.body;

// Default state
let isLightMode = false;

// Apply theme
function applyTheme() {
    if (isLightMode) {
        // LIGHT MODE
        body.style.backgroundColor = "#F1EDEE";
        body.style.color = "#000";

        document.documentElement.style.setProperty("--bg", "#F1EDEE");
        document.documentElement.style.setProperty("--text", "#000");

        themeButton.textContent = "Dark Mode";

    } else {
        // DARK MODE
        body.style.backgroundColor = "#545454";
        body.style.color = "#fff";

        document.documentElement.style.setProperty("--bg", "#545454");
        document.documentElement.style.setProperty("--text", "#fff");

        themeButton.textContent = "Light Mode";
    }
}

// Toggle on button click
themeButton.addEventListener("click", () => {
    isLightMode = !isLightMode;
    applyTheme();
});

// Smooth transition
document.documentElement.style.transition = "all 0.3s ease";
body.style.transition = "all 0.3s ease";

/* ================================
   SHRINK NAVBAR ON SCROLL
================================ */
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.classList.add("navbar-shrink");
    } else {
        navbar.classList.remove("navbar-shrink");
    }

    lastScroll = currentScroll;
});

/* ================================
   THEME SWITCH BUTTON
================================ */
const themeBtn = document.getElementById("themeToggle");
let isLight = false;

themeBtn.addEventListener("click", () => {
    isLight = !isLight;

    if (isLight) {
        document.body.classList.add("light-mode");
        themeBtn.textContent = "Dark Mode";
        themeBtn.classList.add("theme-glow");
        setTimeout(() => themeBtn.classList.remove("theme-glow"), 400);
    } else {
        document.body.classList.remove("light-mode");
        themeBtn.textContent = "Light Mode";
        themeBtn.classList.add("theme-glow");
        setTimeout(() => themeBtn.classList.remove("theme-glow"), 400);
    }
});

/* ================================
   LOGO GLOW ON HOVER
================================ */
const logo = document.querySelector(".nav-logo a");

logo.addEventListener("mouseenter", () => {
    logo.classList.add("logo-pulse");
});
logo.addEventListener("mouseleave", () => {
    logo.classList.remove("logo-pulse");
});

const slides = document.querySelectorAll('.slide');
const container = document.querySelector('.slides-container');
let index = 0;

/* UPDATE SLIDER POSITION + ACTIVE SLIDE */

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

