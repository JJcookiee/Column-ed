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

// document.getElementById("film-title").textContent = data.title;
// document.getElementById("film-year").textContent = data.year;
// document.getElementById("film-director").textContent = data.director;

// const datepicker = document.querySelector(".datepicker");
// const dateInput = document.querySelector(".date-input");
// const yearInput = datepicker.querySelector(".year-input");
// const monthInput = datepicker.querySelector(".month-input");
// const cancelBtn = datepicker.querySelector(".cancel");
// const applyBtn = datepicker.querySelector(".apply");
// const nextBtn = datepicker.querySelector(".next");
// const prevBtn = datepicker.querySelector(".prev");
// const dates = datepicker.querySelector(".dates");

// let selectedDate = new Date();
// let year = selectedDate.getFullYear();
// let month = selectedDate.getMonth();

// dateInput.addEventListener("click", () => {
//   datepicker.hidden = false;
// });

// cancelBtn.addEventListener("click", () => {
//   datepicker.hidden = true;
// });

// applyBtn.addEventListener("click", () => {
//   dateInput.value = selectedDate.toLocaleDateString("en-UK", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

//   datepicker.hidden = true;
// });

// nextBtn.addEventListener("click", () => {
//   if (month === 11) year++;
//   month = (month + 1) % 12;
//   displayDates();
// });

// prevBtn.addEventListener("click", () => {
//   if (month === 0) year--;
//   month = (month - 1 + 12) % 12;
//   displayDates();
// });

// monthInput.addEventListener("change", () => {
//   month = monthInput.selectedIndex;
//   displayDates();
// });

// yearInput.addEventListener("change", () => {
//   year = yearInput.number;
//   displayDates();
// });

// const updateYearMonth = () => {
//   monthInput.selectedIndex = month;
//   yearInput.number = year;
// };

// const handleDateClick = (e) => {
//   const button = e.target;

//   const selected = dates.querySelector(".selected");
//   selected && selected.classList.remove("selected");

//   button.classList.add("selected");

//   selectedDate = new Date(year, month, parseInt(button.textContent));
// };

// const displayDates = () => {
//   updateYearMonth();

//   dates.innerHTML = "";

//   const lastOfPrevMonth = new Date(year, month, 0);

//   for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
//     const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
//     const button = createButton(text, true);
//     dates.appendChild(button);
//   }

//   const lastOfMonth = new Date(year, month + 1, 0);

//   for (let i = 1; i <= lastOfMonth.getDate(); i++) {
//     const button = createButton(i, false);
//     button.addEventListener("click", handleDateClick);
//     dates.appendChild(button);
//   }

//   const firstOfNextMonth = new Date(year, month + 1, 1);

//   for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
//     const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;

//     const button = createButton(text, true);
//     dates.appendChild(button);
//   }
// };

// const createButton = (text, isDisabled = false) => {
//   const currentDate = new Date();

//   const isToday =
//     currentDate.getDate() === text &&
//     currentDate.getFullYear() === year &&
//     currentDate.getMonth() === month;

//   const selected =
//     selectedDate.getDate() === text &&
//     selectedDate.getFullYear() === year &&
//     selectedDate.getMonth() === month;

//   const button = document.createElement("button");
//   button.textContent = text;
//   button.disabled = isDisabled;
//   button.classList.toggle("today", isToday);
//   button.classList.toggle("selected", selected);
//   return button;
// };

// displayDates();

const stars = document.querySelectorAll(".rating input");
// const ratingContainer = document.querySelector(".rating");
let currentRating = 0;

function updateStars(rating) {
  stars.forEach((star) => {
    const label = star.nextElementSibling;
    if (parseInt(star.value) <= rating) {
      label.classList.add("active");
    } else {
      label.classList.remove("active");
    }
  });
}

stars.forEach((star) => {
  const label = star.nextElementSibling;

  label.addEventListener("mouseenter", () => {
    updateStars(parseInt(star.value));
  });

  label.addEventListener("mouseleave", () => {
    updateStars(currentRating);
  });

  star.addEventListener("click", function () {
    const selectedValue = parseInt(this.value);

    if (selectedValue === currentRating) {
      currentRating = 0;
      star.checked = false;
    } else {
      currentRating = selectedValue;
    }

    updateStars(currentRating);
  });
});

// document.querySelectorAll('.rating input').forEach(radio => {
//   radio.addEventListener('click', function(e) {
//     if (this.wasChecked) {
//       this.checked = false;
//     }
//     document.querySelectorAll('.rating input').forEach(r => r.wasChecked = false);
//     this.wasChecked = this.checked;
//   });
// });

// api stuff



const apiKey = "4b3cf5d163b21a803a304391cab5a629";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const type = params.get("type") || "movie";

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
      person => person.job === "Director"
    );
    creator = director ? director.name : "Unknown";
  } else {
    creator = data.created_by?.[0]?.name || "Unknown";
  }

  document.getElementById("film-director").textContent = creator;

  // TAGLINE
  document.getElementById("film-tagline").textContent =
    data.tagline || "No tagline available.";

  // GENRES
  document.getElementById("film-genre").textContent =
    data.genres.map(g => g.name).join(", ");

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
  document.getElementById("film-cast").textContent =
    data.credits.cast
      .slice(0, 5)
      .map(p => p.name)
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



fetchMovieDetails();
