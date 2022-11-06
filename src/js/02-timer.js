import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
// console.log(startBtn);
const days = document.querySelector('[data-days]');
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
    // console.log('currentDate', currentDate);

    const selectedDate = selectedDates[0].getTime();
    // console.log('selectedDate', selectedDate);

    const distance = selectedDate - currentDate;
    // console.log('distance', distance);

    const roundedDistance = Math.round(distance / 1000);
    // console.log(roundedDistance);

    if (currentDate >= selectedDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('PLease choose a date in the future');
      //   window.alert('PLease choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        // console.log(selectedDate);
        // console.log(convertMs(selectedDate));

        let intervalTimer = setInterval(() => {
          const currentDate = new Date().getTime();
          //   //   console.log(currentDate);
          const selectedDate = selectedDates[0].getTime();
          //   console.log(selectedDate);

          if (currentDate >= selectedDate) {
            clearInterval(intervalTimer);
            return Notiflix.Notify.failure(
              'The chosen date has passed. PLease choose a date in the future'
            );
          }
          const distance = selectedDate - currentDate;
          const roundedDistance = Math.floor(distance / 1000);

          // console.log('stringDistance:', stringDistance);
          const convertedDistance = convertMs(distance);
          console.log('convertedDistance: ', convertedDistance);
          console.log('roundedDistance: ', roundedDistance);

          function addLeadingZero(value) {
            return String(value).padStart(2, '0');
          }

          //   days.innerHTML = convertedDistance.days;
          days.innerHTML = addLeadingZero(convertedDistance.days);
          hours.innerHTML = addLeadingZero(convertedDistance.hours);
          minutes.innerHTML = addLeadingZero(convertedDistance.minutes);
          seconds.innerHTML = addLeadingZero(convertedDistance.seconds);

          startBtn.disabled = true;

          if (roundedDistance === 0) {
            clearInterval(intervalTimer);
            Notiflix.Notify.success('Timer finished');
            console.log('Timer finished');
            // window.alert('Timer finished');
          }
        }, 1000);
      });
    }
  },
};
flatpickr(dateTimePicker, options);
// Date time picker

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
