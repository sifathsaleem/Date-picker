// ===== STATE =====
const now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let selectedDate = null;
let selected = false;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ===== DOM ELEMENTS =====
const inputWrapper = document.querySelector("#input-wrapper");
const datesWrapper = document.querySelector(".dates");
const input = document.querySelector("#date");
const label = document.querySelector("label");
const pickerMenu = document.querySelector(".dt-picker");
const dateInput = document.querySelector(".date-input");
const yearVal = document.querySelector("#year");
const monthVal = document.querySelector("#month");

const downArrow = document.querySelector(".fa-chevron-down");
const prevBtn = document.querySelector(".fa-chevron-left");
const nextBtn = document.querySelector(".fa-chevron-right");
const doneBtn = document.querySelector("#done-btn");
const removeBtn = document.querySelector("#remove-btn");
// ===== UTILITY FUNCTIONS =====

function togglePicker(isOpen) {
  downArrow.classList.toggle("open", isOpen);
  pickerMenu.classList.toggle("open", isOpen);
  pickerMenu.hidden = !isOpen;
  inputWrapper.classList.toggle("open", isOpen);
}

function displayDates() {
  datesWrapper.innerHTML = "";
  yearVal.innerText = year;
  monthVal.innerText = `${MONTHS[month]}`;

  // Display the last week of the prev month

  const lastOfPrevMonth = new Date(year, month, 0);

  for (let i = 1; i <= lastOfPrevMonth.getDay(); i++) {
    const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
    const button = createButton(text, true, false);
    datesWrapper.appendChild(button);
  }

  // Display  the current month

  const lastOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastOfMonth.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const button = createButton(i, false, false);
    if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
      button.classList.add("today");
      if (!selected) {
        button.classList.add("selected");
      }
    }
    if (selected) {
      if (year === selectedDate.getFullYear() && month === selectedDate.getMonth() && i === selectedDate.getDate()) {
        button.classList.add("selected");
      }
    }

    datesWrapper.appendChild(button);
  }

  // Display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);
  for (let i = firstOfNextMonth.getDay(); i < 8; i++) {
    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;
    const button = createButton(text, true, false);
    datesWrapper.appendChild(button);
  }
}

// ===== MAIN LOGICs =====

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
}

function setSelectedDate(newDate) {
  const selDate = new Date(year, month, newDate);
  selectedDate = selDate;
  setDateInput(newDate);
}

function setDateInput(newDate = now.getDate()) {
  const setDate = new Date(year, month, newDate);
  input.value = formatDate(setDate);
}

function createButton(text, isDisabled = false, isToday = false) {
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday);

  return button;
}

function renderPrevMonth() {
  month = month - 1;
  if (month < 0) {
    year = year - 1;
    month = 11;
  }

  displayDates();
}

function rendernextMonth() {
  month = month + 1;
  if (month > 11) {
    year = year + 1;
    month = 0;
  }

  displayDates();
}

// ===== EVENT LISTENERS =====
function loadEventListeners() {
  downArrow.addEventListener("click", () => {
    togglePicker(true);
    if (selectedDate) {
      setDateInput(selectedDate.getDate());
    } else {
      setDateInput(now.getDate());
    }
  });

  doneBtn.addEventListener("click", () => {
    togglePicker(false);
    if (selectedDate) {
      selected = true;
    }
  });

  removeBtn.addEventListener("click", () => {
    input.value = "";
    selectedDate = null;
    selected = false;
    const btns = datesWrapper.querySelectorAll("button");
    btns.forEach((btn) => {
      btn.classList.remove("selected");
    });
  });

  document.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target) && !pickerMenu.contains(e.target)) {
      togglePicker(false);

      if (!selected) {
        input.value = "";
      }
    }
  });

  datesWrapper.addEventListener("click", (e) => {
    const dateBtns = datesWrapper.querySelectorAll("button");

    if (e.target.tagName === "BUTTON") {
      if (!e.target.classList.contains("selected")) {
        dateBtns.forEach((btn) => {
          btn.classList.remove("selected");
        });

        e.target.classList.add("selected");
        setSelectedDate(parseInt(e.target.innerText));
        setDateInput(selectedDate.getDate());
      }
    }
  });

  prevBtn.addEventListener("click", () => {
    renderPrevMonth();
  });

  nextBtn.addEventListener("click", () => {
    rendernextMonth();
  });
}

loadEventListeners();
displayDates();
