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

// Carousel trending functon
// import {
//   fetchFromTMDB,
//   IMG_POSTER,
//   IMG_BACKDROP
// } from "../api/tmdb.js";


// const carouselTrack = document.querySelector(".carousel-track");
// const trendingList = document.getElementById("trendingList");
// const movieBtn = document.getElementById("movieBtn");
// const tvBtn = document.getElementById("tvBtn");
// const trendingTitle = document.getElementById("trendingTitle");

// let currentType = "movie";
// let carouselIndex = 0;


// async function loadHome(type) {
//   try {
//     const data = await fetchFromTMDB(`/trending/${type}/day`);

//     renderCarousel(data.results);
//     renderTrending(data.results, type);

//   } catch (err) {
//     console.error("TMDB error:", err);
//   }
// }


// function renderCarousel(results) {
//   carouselTrack.innerHTML = "";

//   results
//     .filter(item => item.backdrop_path)
//     .slice(0, 5)
//     .forEach((item, index) => {
//       const img = document.createElement("img");
//       img.src = IMG_BACKDROP + item.backdrop_path;
//       img.className = "carousel-slide";
//       if (index === 0) img.classList.add("active");

//       img.alt = item.title || item.name;

//       img.addEventListener("click", () => {
//         window.location.href =
//           `/content page/content.html?id=${item.id}&type=${currentType}`;
//       });

//       carouselTrack.appendChild(img);
//     });

//   carouselIndex = 0;
//   updateCarousel();
// }

// function updateCarousel() {
//   carouselTrack.style.transform =
//     `translateX(-${carouselIndex * 100}%)`;
// }


// document.querySelector(".next").addEventListener("click", () => {
//   const slides = document.querySelectorAll(".carousel-slide");
//   carouselIndex = (carouselIndex + 1) % slides.length;
//   updateCarousel();
// });

// document.querySelector(".prev").addEventListener("click", () => {
//   const slides = document.querySelectorAll(".carousel-slide");
//   carouselIndex = (carouselIndex - 1 + slides.length) % slides.length;
//   updateCarousel();
// });


// function renderTrending(results, type) {
//   trendingList.innerHTML = "";

//   results.forEach(item => {
//     if (!item.poster_path) return;

//     const link = document.createElement("a");
//     link.href = `/content page/content.html?id=${item.id}&type=${type}`;
//     link.className = "posterContainer";

//     link.innerHTML = `
//       <img
//         src="${IMG_POSTER + item.poster_path}"
//         alt="${item.title || item.name}"
//         loading="lazy"
//       >
//     `;

//     trendingList.appendChild(link);
//   });
// }


// movieBtn.addEventListener("click", () => {
//   currentType = "movie";
//   trendingTitle.textContent = "Trending Movies Today";
//   movieBtn.classList.add("accent1");
//   tvBtn.classList.remove("accent1");
//   loadHome(currentType);
// });

// tvBtn.addEventListener("click", () => {
//   currentType = "tv";
//   trendingTitle.textContent = "Trending TV Shows Today";
//   tvBtn.classList.add("accent1");
//   movieBtn.classList.remove("accent1");
//   loadHome(currentType);
// });


// loadHome(currentType);


// trending

const apiKey = "4b3cf5d163b21a803a304391cab5a629";
const IMG_POSTER = "https://image.tmdb.org/t/p/w500";
const IMG_BACKDROP = "https://image.tmdb.org/t/p/w1280";
const BASE_URL = "https://api.themoviedb.org/3";

const carouselTrack = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

const trendingList = document.getElementById("trendingList");
const movieBtn = document.getElementById("movieBtn");
const tvBtn = document.getElementById("tvBtn");
const trendingTitle = document.getElementById("trendingTitle");

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const type = params.get("type") || "movie";
const autoComplete = document.querySelector('.autoComplete')

let currentType = "movie";
let carouselIndex = 0;
let carouselInterval = null;
let carouselItems = [];
const CAROUSEL_DELAY = 3000;

async function loadHome(type) {
  const url = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results || [];

    renderCarousel(results, type);
    renderTrending(results, type);
  } catch (err) {
    console.error("TMDB error:", err);
  }
}

function renderCarousel(results, type) {
  if (!carouselTrack) return;

  carouselTrack.innerHTML = "";

  carouselItems = results
    .filter(item => item.backdrop_path)
    .slice(0, 5);

  carouselItems.forEach((item) => {
    const img = document.createElement("img");
    img.className = "carousel-slide";
    img.src = IMG_BACKDROP + item.backdrop_path;
    img.alt = item.title || item.name || "Trending";

    img.addEventListener("click", () => {
      window.location.href =
        `/content page/content.html?id=${item.id}&type=${type}`;
    });

    carouselTrack.appendChild(img);
  });

  carouselIndex = 0;
  updateCarousel();
  updateCarouselTitle();
  startCarouselAutoRotate();
}

function updateCarouselTitle() {
  const titleEl = document.getElementById("carouselTitle");
  if (!titleEl || !carouselItems.length) return;

  const current = carouselItems[carouselIndex];
  titleEl.textContent = current.title || current.name || "";
}


function updateCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  if (!slides.length) return;

  carouselTrack.style.transform =
    `translateX(-${carouselIndex * 100}%)`;
}

function startCarouselAutoRotate() {
  // Clear any existing timer (important when switching Movie/TV)
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }

  carouselInterval = setInterval(() => {
    const slides = document.querySelectorAll(".carousel-slide");
    if (!slides.length) return;

    carouselIndex = (carouselIndex + 1) % slides.length;
    updateCarousel();
    updateCarouselTitle();
  }, CAROUSEL_DELAY);
}


function renderTrending(results, type) {
  if (!trendingList) return;
  trendingList.innerHTML = "";

  results.forEach(item => {
    if (!item.poster_path) return;

    const a = document.createElement("a");
    a.href = `/content page/content.html?id=${item.id}&type=${type}`;
    a.className = "posterContainer";
    a.innerHTML = `<img src="${IMG_POSTER + item.poster_path}" alt="${item.title || item.name}">`;

    trendingList.appendChild(a);
  });
}

nextBtn?.addEventListener("click", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  if (!slides.length) return;
  carouselIndex = (carouselIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn?.addEventListener("click", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  if (!slides.length) return;
  carouselIndex = (carouselIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

movieBtn?.addEventListener("click", () => {
  currentType = "movie";
  trendingTitle.textContent = "Trending Movies Today";
  movieBtn.classList.add("accent1");
  tvBtn.classList.remove("accent1");
  loadHome("movie");
});

tvBtn?.addEventListener("click", () => {
  currentType = "tv";
  trendingTitle.textContent = "Trending TV Shows Today";
  tvBtn.classList.add("accent1");
  movieBtn.classList.remove("accent1");
  loadHome("tv");
});

// initial load
loadHome("movie");


// searchbar function

const searchInput = document.querySelector(".search-input");
const resultsList = document.getElementById("search-results");
const searchForm = document.querySelector(".searchbar form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});


let debounceTimer = null;


searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();


  clearTimeout(debounceTimer);

  if (query.length < 2) {
    resultsList.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    searchTMDB(query);
  }, 300);
});

async function searchTMDB(query){
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );

    const data = await res.json();
    showResults(data.results);
  } catch (err){
    console.error("Search error:", err)
  }
}

function showResults(results){
  resultsList.innerHTML = "";

  results
    .filter(item => item.media_type === "movie" || item.media_type === "tv")
    .slice(0, 8)
    .forEach(item => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      const title = item.title || item.name;
      const year = (item.release_date || item.first_air_date || "")
        .split("-")[0];
      
      button.textContent = year ? `${title} (${year})` : title;

      button.addEventListener("click", () => {
        window.location.href = `/content page/content.html?id=${item.id}&type=${item.media_type}`;
      });

      li.appendChild(button);
      resultsList.appendChild(li);
    })

}

fetchMovies();