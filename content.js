document.addEventListener("DOMContentLoaded", () => {
  function createPopup(id) {
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector(".overlay");
    let closeButton = popupNode.querySelector(".popup-close");

    function openPopup() {
      popupNode.classList.add("active");
    }
    function closePopup() {
      popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    closeButton.addEventListener("click", closePopup);

    return openPopup;
  }

  let openPopupFunc = createPopup("#popup");

  document.querySelector("#openPopup").addEventListener("click", openPopupFunc);
});

const anchorButton = document.querySelector(".anchor-button");

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

const stars = document.querySelectorAll(".rating input");
let currentRating = 0;

function updateStars(rating) {
  stars.forEach((star) => {
    const label = star.nextElementSibling;
    const value = parseFloat(star.value);
    if (value <= rating) {
      label.classList.add("active");
    } else {
      label.classList.remove("active");
    }
  });
}

stars.forEach((star) => {
  const label = star.nextElementSibling;

  label.addEventListener("mouseenter", () => {
    updateStars(parseFloat(star.value));
  });

  label.addEventListener("mouseleave", () => {
    updateStars(currentRating);
  });

  star.addEventListener("click", function () {
    const selectedValue = parseFloat(this.value);

    if (selectedValue === currentRating) {
      currentRating = 0;
      star.checked = false;
    } else {
      currentRating = selectedValue;
    }

    updateStars(currentRating);
  });
});



// api stuff

const apiKey = "4b3cf5d163b21a803a304391cab5a629";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const type = params.get("type") || "movie";
const autoComplete = document.querySelector(".autoComplete");

if (!movieId) {
  console.error("No movie ID found");
}

async function fetchMovieDetails() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${apiKey}&append_to_response=credits`
    );
    const movie = await res.json();

    displayMovie(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
}

function displayMovie(data) {
  // TITLE
  const title = data.title || data.name;
  document.getElementById("film-title").textContent = title;
  document.getElementById("popup-film-title").textContent = title;

  // YEAR
  const date = data.release_date || data.first_air_date;
  document.getElementById("film-year").textContent = date
    ? `(${date.split("-")[0]})`
    : "";
  document.getElementById("popup-film-year").textContent = date
    ? `(${date.split("-")[0]})`
    : "";

  // DIRECTOR / CREATOR
  let creator = "Unknown";

  if (type === "movie") {
    const director = data.credits.crew.find(
      (person) => person.job === "Director"
    );
    creator = director ? director.name : "Unknown";
  } else {
    creator = data.created_by?.[0]?.name || "Unknown";
  }

  document.getElementById("film-director").textContent = creator;

  // DESCRIPTION
  const overview = data.overview;
  document.getElementById("description").textContent = overview;

  // TAGLINE
  document.getElementById("film-tagline").textContent =
    data.tagline || "No tagline available.";

  // GENRES
  document.getElementById("film-genre").textContent = data.genres
    .map((g) => g.name)
    .join(", ");

  // RUNTIME
  let runtimeText = "N/A";
  if (type === "movie" && data.runtime) {
    const h = Math.floor(data.runtime / 60);
    const m = data.runtime % 60;
    runtimeText = `${h}h ${m}m`;
  } else if (type === "tv" && data.episode_run_time?.length) {
    runtimeText = `${data.episode_run_time[0]}m per episode`;
  }

  document.getElementById("film-runtime").textContent = runtimeText;

  // CAST
  document.getElementById("film-cast").textContent = data.credits.cast
    .slice(0, 15)
    .map((p) => p.name)
    .join(", ");

  // POSTER
  document.getElementById("rectangles").innerHTML = `
    <img src="${IMG_PATH + data.poster_path}" class="movie_img_rounded">
  `;

  // REVIEW POPUP POSTER
  document.getElementById("review-rectangle").innerHTML = `
    <img src="${IMG_PATH + data.poster_path}" class="review_movie_img_rounded">
  `;
}

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

async function searchTMDB(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();
    showResults(data.results);
  } catch (err) {
    console.error("Search error:", err);
  }
}

function showResults(results) {
  resultsList.innerHTML = "";

  results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .slice(0, 8)
    .forEach((item) => {
      const li = document.createElement("li");
      const button = document.createElement("button");

      const title = item.title || item.name;
      const year = (item.release_date || item.first_air_date || "").split(
        "-"
      )[0];

      button.textContent = year ? `${title} (${year})` : title;

      button.addEventListener("click", () => {
        window.location.href = `content.html?id=${item.id}&type=${item.media_type}`;
      });

      li.appendChild(button);
      resultsList.appendChild(li);
    });
}

fetchMovieDetails();




if (movieId) {
  // --- Elements ---
  const seenIcon = document.querySelector(".seen-check");
  const watchedCheckbox = document.getElementById("watched"); // main watched checkbox
  const favouriteIcon = document.querySelector(".favourite");
  const watchlistIcon = document.querySelector(".watchlist");
  const stars = document.querySelectorAll(".rating input");
  let currentRating = 0;

  // --- Load saved states ---
  let savedWatched = localStorage.getItem(`watchedStatus_${movieId}`) === "true";
  let savedFavourite = localStorage.getItem(`favourite_${movieId}`) === "true";
  let savedWatchlist = localStorage.getItem(`watchlist_${movieId}`) === "true";
  
  fetch('getLists.php', {
    method: 'Get',
  })
  .then(res => res.json())
  .then(data => {
    if (data.diary !== undefined) { saveWatched = data.diary; }
    if (data.favourites !== undefined) { savedFavourite = data.favourites; }
    if (data.to_watch !== undefined) { savedWatchlist = data.to_watch; }
  }).catch(err => {
    console.error("JS PARSE ERROR:", err);
  });
  const savedRating = parseFloat(localStorage.getItem(`rating_${movieId}`)) || 0;

  watchedCheckbox.checked = savedWatched;
  seenIcon.classList.toggle("active", savedWatched);
  favouriteIcon.classList.toggle("active", savedFavourite);
  watchlistIcon.classList.toggle("active", savedWatchlist);
  currentRating = savedRating;

  // --- Helper to update stars ---
  function updateStars(rating) {
    stars.forEach((star) => {
      const label = star.nextElementSibling;
      const value = parseInt(star.value);
      label.classList.toggle("active", value <= rating);
    });
  }
  if (currentRating > 0) updateStars(currentRating);

  // --- Watched toggle ---
  watchedCheckbox.addEventListener("change", () => {
    const isChecked = watchedCheckbox.checked;
    seenIcon.classList.toggle("active", isChecked);
    localStorage.setItem(`watchedStatus_${movieId}`, isChecked);
  });

  seenIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !watchedCheckbox.checked;
    watchedCheckbox.checked = newState;
    seenIcon.classList.toggle("active", newState);
    const isActive = seenIcon.classList.contains("active");
    localStorage.setItem(`watchedStatus_${movieId}`, newState);
    fetch('setWatched.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        watched: `${movieId}`,
        active: isActive
      })
    })
    .then(res => res.text())
    .then(text => {
      console.log("RAW RESPONSE:", text);
      return JSON.parse(text);
    })
    .then(data => console.log(data))
    .catch(err => console.error("JS PARSE ERROR:", err));
  });

  // --- Favourite toggle ---
  favouriteIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wasActive = favouriteIcon.classList.contains("active");
    favouriteIcon.classList.toggle("active");
    const isActive = favouriteIcon.classList.contains("active");
    localStorage.setItem(
      `favourite_${movieId}`,
      isActive
    );
    fetch('setFavourite.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favourite: `${movieId}`,
        active: isActive
      })
    })
    .then(res => res.text())
    .then(text => {
      console.log("RAW RESPONSE:", text);
      return JSON.parse(text);
    })
    .then(data => console.log(data))
    .catch(err => {
      console.error("JS PARSE ERROR:", err);
      favouriteIcon.classList.toggle("active",wasActive);
    });
  });

  // --- Watchlist toggle ---
  watchlistIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wasActive = watchlistIcon.classList.contains("active");
    watchlistIcon.classList.toggle("active");
    const isActive = watchlistIcon.classList.contains("active");
    localStorage.setItem(
      `watchlist_${movieId}`,
      watchlistIcon.classList.contains("active")
    );
    fetch('setWatch.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        watch: `${movieId}`,
        active: isActive
      })
    })
    .then(res => res.text())
    .then(text => {
      console.log("RAW RESPONSE:", text);
      return JSON.parse(text);
    })
    .then(data => console.log(data))
    .catch(err => {
      console.error("JS PARSE ERROR:", err);
      watchlistIcon.classList.toggle("active", wasActive);
    });
  });

  // --- Rating stars ---
  stars.forEach((star) => {
    const label = star.nextElementSibling;

    label.addEventListener("mouseenter", () =>
      updateStars(parseInt(star.value))
    );
    label.addEventListener("mouseleave", () => updateStars(currentRating));

    star.addEventListener("click", function () {
      const selectedValue = parseInt(this.value);
      if (selectedValue === currentRating) {
        currentRating = 0;
        star.checked = false;
        localStorage.removeItem(`rating_${movieId}`);
      } else {
        currentRating = selectedValue;
        localStorage.setItem(`rating_${movieId}`, currentRating);
      }
      updateStars(currentRating);
    });
  });
}
