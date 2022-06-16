const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

let timerId = null;
function onStart() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onStop() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
