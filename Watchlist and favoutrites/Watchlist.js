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
