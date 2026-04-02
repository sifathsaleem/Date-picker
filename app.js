const inputWrapper = document.querySelector("#input");
const input = document.querySelector("#date");
const label = document.querySelector('label')
const downArrow = document.querySelector(".fa-chevron-down");

downArrow.addEventListener('click', () => {
    downArrow.classList.toggle('open')
    
})
