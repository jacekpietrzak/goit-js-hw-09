import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
console.log(startBtn);
const days = document.querySelector('[data-days]');
days.innerHTML = 20;
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// Date time picker
const dateTimePicker = document.getElementById('datetime-picker');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    console.log('currentDate', currentDate);

    const selectedDate = selectedDates[0].getTime();
    console.log('selectedDate', selectedDate);

    if (currentDate >= selectedDate) {
      startBtn.disabled = true;
      window.alert('PLease choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        console.log(selectedDate);
        console.log(convertMs(selectedDate));
      });
    }

    // localStorage.setItem('selected-date', selectedDates[0].getTime());
    // return selectedDates[0].getTime();
  },
};
flatpickr(dateTimePicker, options);
// Date time picker

// const selectedDate = localStorage.getItem('selected-date');

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
