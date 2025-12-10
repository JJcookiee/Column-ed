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

const datepicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
const yearInput = datepicker.querySelector(".year-input");
const monthInput = datepicker.querySelector(".month-input");
const cancelBtn = datepicker.querySelector(".cancel");
const applyBtn = datepicker.querySelector(".apply");
const nextBtn = datepicker.querySelector(".next");
const prevBtn = datepicker.querySelector(".prev");
const dates = datepicker.querySelector(".dates");

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

dateInput.addEventListener("click", () => {
  datepicker.hidden = false;
});

cancelBtn.addEventListener("click", () => {
  datepicker.hidden = true;
});

applyBtn.addEventListener("click", () => {
  dateInput.value = selectedDate.toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  datepicker.hidden = true;
});

  nextBtn.addEventListener("click", () => {
    if (month === 11) year++;
    month = (month + 1) % 12;
    displayDates();
  });

  prevBtn.addEventListener("click", () => {
    if (month === 0) year--;
    month = (month - 1 + 12) % 12;
    displayDates();
  });

  monthInput.addEventListener("change", () => {
    month = monthInput.selectedIndex;
    displayDates();
  });

  yearInput.addEventListener("change", () => {
    year = yearInput.number;
    displayDates();
  });

  const updateYearMonth = () => {
    monthInput.selectedIndex = month;
    yearInput.number = year;
  };

const handleDateClick = (e) => {
  const button = e.target;

  const selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  button.classList.add("selected");

  selectedDate = new Date(year, month, parseInt(button.textContent));
};

const displayDates = () => {
  updateYearMonth();

  dates.innerHTML = "";

  const lastOfPrevMonth = new Date(year, month, 0);

  for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
    const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    const button = createButton(text, true);
    dates.appendChild(button);
  }

  const lastOfMonth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMonth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    dates.appendChild(button);
  }

  const firstOfNextMonth = new Date(year, month + 1, 1);

  for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;

    const button = createButton(text, true);
    dates.appendChild(button);
  }
};

const createButton = (text, isDisabled = false) => {
  const currentDate = new Date();

  const isToday =
    currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  const selected =
    selectedDate.getDate() === text &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month;

  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();


// document.querySelectorAll('.rating input').forEach(radio => {
//   radio.addEventListener('click', function(e) {
//     if (this.wasChecked) {
//       this.checked = false;
//     }
//     document.querySelectorAll('.rating input').forEach(r => r.wasChecked = false);
//     this.wasChecked = this.checked;
//   });
// });

