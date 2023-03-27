import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedTime = null;
refs.btnStart.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    if (selectedTime < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
        fontSize: '20px',
        width: '400px',
        failure: {
          background: '#663399',
          textColor: '#ffffff',
        },
      });
      selectedTime = new Date();
      refs.btnStart.disabled = true;
      refs.input.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      refs.input.disabled = true;
    }
  },
};

refs.btnStart.addEventListener('click', onStartCountdown);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function onStartCountdown() {
  refs.btnStart.disabled = false;
  refs.input.disabled = true;

  const date = new Date(refs.input.value).getTime();

  selectedTime = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(date - Date.now());

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

    if (date - Date.now() < 1000) {
      clearInterval(selectedTime);
      refs.btnStart.disabled = true;
      refs.input.disabled = true;
    }
  }, 1000);
}

flatpickr(refs.input, options);