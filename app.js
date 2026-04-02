const inputWrapper = document.querySelector("#input-wrapper");
const input = document.querySelector("#date");
const label = document.querySelector("label");
const downArrow = document.querySelector(".fa-chevron-down");
const pickerMenu = document.querySelector(".dt-picker");
const removeBtn = document.querySelector("#remove-btn");
const doneBtn = document.querySelector("#done-btn");
const dateInput = document.querySelector(".date-input");

function togglePickerMenu() {
  downArrow.classList.toggle("open");
  pickerMenu.classList.toggle("open");
  inputWrapper.classList.toggle("open");
  label.classList.toggle("open");
  dateInput.classList.toggle("open");
}

function loadEventListeners() {
  downArrow.addEventListener("click", togglePickerMenu);
  label.addEventListener("click", togglePickerMenu);
  doneBtn.addEventListener("click", togglePickerMenu);
  document.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target) && !pickerMenu.contains(e.target)) {
      togglePickerMenu();
    }
  });
}

loadEventListeners();
