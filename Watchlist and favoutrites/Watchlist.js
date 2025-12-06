const statItems = document.querySelectorAll(".stat-item");
const overlay = document.querySelector(".active-overlay");
const anchorButton = document.querySelector(".anchor-button");

import { createIcons, icons } from "lucide";

createIcons({ icons });

document.body.append('<i data-lucide="arrow-up"></i>');

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
