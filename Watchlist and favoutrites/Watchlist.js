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

const watchlist = [
  { title: "placeholder" },
  { title: "placeholder" },
  { title: "placeholder" },
  { title: "placeholder" },
  { title: "placeholder" },
  { title: "placeholder" },
];

const favourites = [
  { title: "placeholder" },
  { title: "placeholder" },
  { title: "placeholder" },
  { title: "placeholder" },
];

function renderPosters(list) {
  rectangles.classList.add("fade-out");
  setTimeout(() => {
    rectangles.innerHTML = "";
    list.forEach((poster) => {
      const div = document.createElement("div");
      div.className = "rectangle";
      div.style.backgroundColor = poster.color;
      div.title = poster.title;
      div.innerHTML = `<p style="text-align:center; padding-top:195px; color: black; font-weight:bold; ">${poster.title}</p>`;
      rectangles.appendChild(div);
    });
    rectangles.classList.remove("fade-out");
  }, 300);
}

renderPosters(watchlist);

statItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    statItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    overlay.style.transform = `translateX(${index * 100}%)`;

    if (index === 0) {
      renderPosters(watchlist);
    } else {
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