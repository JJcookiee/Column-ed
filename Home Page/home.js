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

// Carousel trending funciton
import {
  fetchFromTMDB,
  IMG_POSTER,
  IMG_BACKDROP
} from "../api/tmdb.js";


const carouselTrack = document.querySelector(".carousel-track");
const trendingList = document.getElementById("trendingList");
const movieBtn = document.getElementById("movieBtn");
const tvBtn = document.getElementById("tvBtn");
const trendingTitle = document.getElementById("trendingTitle");

let currentType = "movie";
let carouselIndex = 0;


async function loadHome(type) {
  try {
    const data = await fetchFromTMDB(`/trending/${type}/day`);

    renderCarousel(data.results);
    renderTrending(data.results, type);

  } catch (err) {
    console.error("TMDB error:", err);
  }
}


function renderCarousel(results) {
  carouselTrack.innerHTML = "";

  results
    .filter(item => item.backdrop_path)
    .slice(0, 5)
    .forEach((item, index) => {
      const img = document.createElement("img");
      img.src = IMG_BACKDROP + item.backdrop_path;
      img.className = "carousel-slide";
      if (index === 0) img.classList.add("active");

      img.alt = item.title || item.name;

      img.addEventListener("click", () => {
        window.location.href =
          `/content page/content.html?id=${item.id}&type=${currentType}`;
      });

      carouselTrack.appendChild(img);
    });

  carouselIndex = 0;
  updateCarousel();
}

function updateCarousel() {
  carouselTrack.style.transform =
    `translateX(-${carouselIndex * 100}%)`;
}


document.querySelector(".next").addEventListener("click", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  carouselIndex = (carouselIndex + 1) % slides.length;
  updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  carouselIndex = (carouselIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});


function renderTrending(results, type) {
  trendingList.innerHTML = "";

  results.forEach(item => {
    if (!item.poster_path) return;

    const link = document.createElement("a");
    link.href = `/content page/content.html?id=${item.id}&type=${type}`;
    link.className = "posterContainer";

    link.innerHTML = `
      <img
        src="${IMG_POSTER + item.poster_path}"
        alt="${item.title || item.name}"
        loading="lazy"
      >
    `;

    trendingList.appendChild(link);
  });
}


movieBtn.addEventListener("click", () => {
  currentType = "movie";
  trendingTitle.textContent = "Trending Movies Today";
  movieBtn.classList.add("accent1");
  tvBtn.classList.remove("accent1");
  loadHome(currentType);
});

tvBtn.addEventListener("click", () => {
  currentType = "tv";
  trendingTitle.textContent = "Trending TV Shows Today";
  tvBtn.classList.add("accent1");
  movieBtn.classList.remove("accent1");
  loadHome(currentType);
});


loadHome(currentType);


