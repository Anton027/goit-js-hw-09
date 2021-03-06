import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    daysFace: document.querySelector('[data-days]'),
    hoursFace: document.querySelector('[data-hours]'),
    minutesFace: document.querySelector('[data-minutes]'),
    secondsFace: document.querySelector('[data-seconds]'),
    inputDate: document.querySelector('#datetime-picker')
}

refs.startBtn.disabled = true;
refs.inputDate.disabled = false;

let selectedDate = null;
let dateDifference = 0;
let dateDifConvert = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] >= options.defaultDate) {
            refs.startBtn.disabled = false;

            selectedDate = selectedDates[0];
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        updateTextContent();
    },
};

flatpickr('#datetime-picker', options);
dateDifConvert = convertMs(dateDifference);
const timer = {
    intervalId: null,
    start() {
        
        this.intervalId = setInterval(() => {
            const currentDate = Date.now();
            if (currentDate >= selectedDate) {
                this.stop();
            } else {
                dateDifference = selectedDate - currentDate;
                dateDifConvert = convertMs(dateDifference);
                updateTextContent();
            }
        }, 1000)
        
    },
    stop() {
        clearInterval(this.intervalId);
    }
};


refs.startBtn.addEventListener('click', () => {
    timer.start();
    // timer.stop();
    refs.inputDate.disabled = true;
});

function updateTextContent() {
    refs.daysFace.textContent = dateDifConvert.days;
    refs.hoursFace.textContent = dateDifConvert.hours;
    refs.minutesFace.textContent = dateDifConvert.minutes;
    refs.secondsFace.textContent = dateDifConvert.seconds;
}

function  addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}


