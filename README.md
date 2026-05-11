# Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

---

## Overview

### The challenge

Users should be able to:

- Open a date picker by clicking the calendar icon or the dropdown arrow
- Navigate between months using previous and next arrows
- Select a date and see it reflected in the input field
- See today's date highlighted automatically
- Remove a selected date and reset to the current date
- Close the picker by clicking outside of it

### Screenshot

![Custom Date Picker Screenshot](./assets/screenshot.png)

### Links

- Live Site URL: **https://datepicker-slm.netlify.app/**

---

## My process

### Built with

- Semantic HTML5
- CSS3 (custom properties, CSS Grid, transitions)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts (Poppins)

### What I learned

This project taught me a lot about working with JavaScript's `Date` object, which is trickier than it looks. Here are the key things I learned:

**Making Monday the first day of the week**
By default, JavaScript's `Date` object treats Sunday as the first day of the week (index 0). I had to figure out how to shift the week so that Monday comes first. I solved this with a small utility function:

```js
function toMondayFirst(dayIndex) {
  return (dayIndex + 6) % 7;
}
```
This was a satisfying problem to solve because it required me to think mathematically, not just write code.

**Finding the first day of the month and rendering the calendar correctly**
To display the calendar grid properly, I needed to know which day of the week the month starts on, then fill in the trailing days from the previous month and the leading days of the next month. Getting this logic right — so every month renders in the correct position — was the core challenge of the project.

**Manipulating the JavaScript Date object**
Working on this project gave me a much deeper understanding of how the `Date` object works — creating dates dynamically, comparing them, formatting them, and using them to drive UI updates. It's something that looks simple but has many small details to get right.

---

## Author

- GitHub — [@sifathsaleem](https://github.com/sifathsaleem)
- Live Project — [datepicker-slm.netlify.app](https://datepicker-slm.netlify.app/)