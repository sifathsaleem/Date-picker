// ===== STATE =====
const now = new Date();
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const state = {
  viewYear: now.getFullYear(),
  viewMonth: now.getMonth(),
  selectedDate: {
    year: null,
    month: null,
    date: null,
  },
};
// ===== DOM ELEMENTS =====
const inputWrapper = document.querySelector("#input-wrapper");
const datesWrapper = document.querySelector(".dates");
const input = document.querySelector("#date");
const label = document.querySelector("label");
const downArrow = document.querySelector(".fa-chevron-down");
const pickerMenu = document.querySelector(".dt-picker");
const removeBtn = document.querySelector("#remove-btn");
const doneBtn = document.querySelector("#done-btn");
const dateInput = document.querySelector(".date-input");
const yearVal = document.querySelector("#year");
const monthVal = document.querySelector("#month");

// ===== UTILITY FUNCTIONS =====
function togglePickerMenu() {
  downArrow.classList.toggle("open");
  pickerMenu.classList.toggle("open");
  inputWrapper.classList.toggle("open");
}

function setSelectedDate(year, month, date) {
  const today = formatDate();
}

function closePickerMenu() {
  downArrow.classList.remove("open");
  pickerMenu.classList.remove("open");
  inputWrapper.classList.remove("open");
}

// ===== APP LOGIC =====

function renderCalendar(year, month) {
  yearVal.innerText = year;
  monthVal.innerText = `${MONTHS[month]}`;

  const dates = getDatesInMonth(year, month);

  dates.forEach((date) => {
    const btn = document.createElement("button");

    if (now.getDate() === date.getDate()) {
      btn.classList.add("today");
    }

    btn.innerText = date.getDate();

    datesWrapper.appendChild(btn);
  });
}

function getDatesInMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  const daysInMonth = date.getDate();

  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }

  return dates;
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
}


function setDate(newDate) {
  let { year, month, date } = state.selectedDate;
  year = state.viewYear;
  month = state.viewMonth;
  date = newDate;

  const selDate = new Date(year, month, date);
  input.value = formatDate(selDate);
}

// ===== EVENT LISTENERS =====
function loadEventListeners() {
  downArrow.addEventListener("click", () => {
    if (state.selectedDate.date) {
      const { year, month, date } = state.selectedDate;
      const selectedDate = new Date(year, month, date);
      input.value = formatDate(selectedDate);
    } else {
      input.value = formatDate(now);
    }
    togglePickerMenu();
    const dateBtns = datesWrapper.querySelectorAll("button");

    if (inputWrapper.classList.contains("open")) {
      if (dateBtns.length === 0) {
        renderCalendar(state.viewYear, state.viewMonth);
      }
      input.focus();
    } else {
      input.blur();
    }
  });

  dateInput.addEventListener("click", () => {
    if (!inputWrapper.classList.contains("open")) {
      togglePickerMenu();
      input.focus();
    }
  });

  doneBtn.addEventListener("click", () => {
    const { date } = state.selectedDate;
    setDate(date);
    closePickerMenu();
  });
  document.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target) && !pickerMenu.contains(e.target)) {
      closePickerMenu();
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
        setDate(parseInt(e.target.innerText));
        setDateValue(parseInt(e.target.innerText));
      }
    }
  });
}

loadEventListeners();

console.log(new Date(2026, 3, 30));

