import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
  form: document.querySelector('.timer')
};

let selectDatesCounter;
let operationsFlag = false;
let unformattingDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      if (!operationsFlag){
        const dateNow = new Date();
        console.log(selectedDates[0]-dateNow);
        selectDatesCounter = selectedDates[0];
        if ((selectedDates[0]-dateNow)<0){
          window.alert('Please choose a date in the future');
          refs.startBtn.setAttribute('disabled', true);
        }
        else {
          refs.startBtn.removeAttribute('disabled');
      }

      }

    },

  };

  const flatpickrObject = flatpickr("#datetime-picker", options);

    function startTimer() { 
      const timerId = setInterval(() => {
        if (selectDatesCounter - Date.now() > 0){
          unformattingDate = selectDatesCounter - Date.now();
          refs.dataDays.textContent = addLeadingZero(convertMs(unformattingDate).days);
          refs.dataHours.textContent = addLeadingZero(convertMs(unformattingDate).hours);
          refs.dataMinutes.textContent = addLeadingZero(convertMs(unformattingDate).minutes);
          refs.dataSeconds.textContent = addLeadingZero(convertMs(unformattingDate).seconds);
        }

      }, 1000);
    }

    const startBtnHandler = (evt) => {

      if (!operationsFlag){
        operationsFlag = true;
        startTimer();
        refs.startBtn.setAttribute('disabled', true);
      }
      else{
        clearTimeout(timerId);
        startTimer();
      }
    };

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


  function addLeadingZero(value){
    return String(value).padStart(2, '0');
  }

  refs.startBtn.setAttribute('disabled', true);
  refs.startBtn.addEventListener('click', startBtnHandler);


