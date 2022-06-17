import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let selectedDate = null;
let dateS = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        console.log(options.defaultDate);
        if (selectedDates[0] > options.defaultDate) {
            startBtn.disabled = false;
            selectedDate = selectedDates[0];
            dateS =  selectedDate - options.defaultDate;
            console.log(dateS);
            console.log(convertMs(dateS));
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
    },
};



// console.log(options.defaultDate);
flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', onclick);
function onclick() { };

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
