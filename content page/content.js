document.addEventListener("DOMContentLoaded", () => {
  function createPopup(id) {
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector(".overlay");
    let closeButton = popupNode.querySelector(".closeButton");

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

// document.getElementById("film-title").textContent = data.title;
// document.getElementById("film-year").textContent = data.year;
// document.getElementById("film-director").textContent = data.director;

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
