const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),

};


refs.btnStart.addEventListener('click', onStartChangeBgColor);
refs.btnStop.addEventListener('click', onStopChangeBgColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  let timer = null;

  function onStartChangeBgColor() {
    timer = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.btnStart.disabled = true;
  }

  function onStopChangeBgColor() {
    clearInterval(timer);
    refs.btnStart.disabled = false;
  }
