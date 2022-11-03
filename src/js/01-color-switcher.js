const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalTimer;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const randomBgColor = () => {
  console.log(getRandomHexColor());
  body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  intervalTimer = setInterval(randomBgColor, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(intervalTimer);
});
