const statItems = document.querySelectorAll(".stat-item");
const overlay = document.querySelector(".active-overlay");
const anchorButton = document.querySelector(".anchor-button");
const rectangles = document.getElementById("rectangles");

statItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    statItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    overlay.style.transform = `translateX(${index * 100}%)`;
  });
});

let mybutton = document.getElementById("anchor-button");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 550
  ) {
    mybutton.classList.add("show");
  } else {
    mybutton.classList.remove("show");
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let watchlist = [];
let favourites = [];

function renderPosters(list) {
  rectangles.classList.add("fade-out");
  setTimeout(() => {
    rectangles.innerHTML = "";

    list.forEach((poster) => {
      if (!poster.poster_path) return;

      const a = document.createElement("a");
      a.href = `/content page/content.html?id=${poster.id}`;
      a.className = "rectangle";
      a.title = poster.title;
      a.innerHTML = `<img src="${IMG_POSTER + poster.poster_path}" alt="${poster.title || poster.name}">`;

      rectangles.appendChild(a);
    });
    rectangles.classList.remove("fade-out");
  }, 300);
}

async function getWatchlist() {
  const response = await fetch("watch.php");
  const data = await response.json();
  return await fetchPoster(data);
}

async function getFavourites() {
  const response = await fetch("fav.php");
  const data = await response.json();
  return await fetchPoster(data);
}


statItems.forEach((item, index) => {
  item.addEventListener("click", async () => {
    statItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    overlay.style.transform = `translateX(${index * 100}%)`;

    if (index === 0) {
      watchlist = await getWatchlist();
      renderPosters(watchlist);
    } else {
      favourites = await getFavourites();
      renderPosters(favourites);
    }
  });
});


// searchbar function + api

const apiKey = "4b3cf5d163b21a803a304391cab5a629";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";

const searchInput = document.querySelector(".search-input");
const resultsList = document.getElementById("search-results");
const searchForm = document.querySelector(".searchbar form");

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const type = params.get("type") || "movie";
const autoComplete = document.querySelector(".autoComplete");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

if (!movieId) {
  console.error("No movie ID found");
}

async function fetchPoster(data) {
  const promises = data.map(async item => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${item.id}?api_key=${apiKey}`
      );
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

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