// ===== STATE =====
const now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let selectedDate = null;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ===== DOM ELEMENTS =====
const inputWrapper = document.querySelector("#input-wrapper");
const input = document.querySelector("#date");
const label = document.querySelector("label");
const dateInput = document.querySelector(".date-input");
const downArrow = document.querySelector(".fa-chevron-down");

const pickerMenu = document.querySelector(".dt-picker");
const prevBtn = document.querySelector(".fa-chevron-left");
const nextBtn = document.querySelector(".fa-chevron-right");
const yearVal = document.querySelector("#year");
const monthVal = document.querySelector("#month");
const datesWrapper = document.querySelector(".dates");
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

  let adjustedDay = toMondayFirst(lastOfPrevMonth.getDay());

  for (let i = 0; i <= adjustedDay; i++) {
    const text = lastOfPrevMonth.getDate() - adjustedDay + i;
    const button = createButton(text, true);
    datesWrapper.appendChild(button);
  }

  // Display  the current month

  const lastOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastOfMonth.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const button = createButton(i, false);
    if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
      button.classList.add("today");
      if (!selectedDate) {
        button.classList.add("selected");
      }
    }
    if (selectedDate) {
      if (year === selectedDate.getFullYear() && month === selectedDate.getMonth() && i === selectedDate.getDate()) {
        button.classList.add("selected");
      }
    }

    datesWrapper.appendChild(button);
  }

  // Display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);
  adjustedDay = toMondayFirst(firstOfNextMonth.getDay());
  for (let i = adjustedDay; i <= 6; i++) {
    const text = firstOfNextMonth.getDate() - adjustedDay + i;
    const button = createButton(text, true);
    datesWrapper.appendChild(button);
  }
}

function createButton(text, isDisabled = false) {
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  return button;
}

// ===== MAIN LOGICs =====

function toMondayFirst(dayIndex) {
  return (dayIndex + 6) % 7;
}

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
    displayDates();
    if (selectedDate) {
      setDateInput(selectedDate.getDate());
    } else {
      setDateInput(now.getDate());
    }
  });

  doneBtn.addEventListener("click", () => {
    togglePicker(false);
    if (!selectedDate) {
      month = now.getMonth();
      year = now.getFullYear();
    }
  });

  removeBtn.addEventListener("click", () => {
    year = now.getFullYear();
    month = now.getMonth();
    selectedDate = now;
    displayDates();
  });

  document.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target) && !pickerMenu.contains(e.target)) {
      togglePicker(false);

      if (!selectedDate) {
        input.value = "";
        month = now.getMonth();
        year = now.getFullYear();
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
