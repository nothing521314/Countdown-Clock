const resetEl = document.getElementById("reset");
const startEl = document.getElementById("start");
const hourEl = document.getElementById("setHours");
const minuteEl = document.getElementById("setMinutes");
const secondEl = document.getElementById("setSeconds");
let html = document.getElementById("countdown");

let countdown, now, then, secondsLeft, display;
let setHours = 0;
let setMinutes = 0;
let setSeconds = 0;

let input = 0;
let total = 0;

function inputMatch () {
  total = setSeconds + setMinutes * 60 + setHours * 3600;
  console.log("total: ", total);
};

function timerCountdown(seconds) {
  now = Date.now();
  then = now + seconds * 1000;
  displayTimeLeft(input);
  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);

    if(secondsLeft < 0) {
      clearInterval(countdown);
      return startEl.innerHTML = 'OK';     
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  let minutes;
  let remainderSeconds;
  if (seconds > 60) {
    minutes = Math.floor((seconds - hours*3600) / 60);
    remainderSeconds = seconds % 60;
  } else {
    minutes = 0;
    remainderSeconds = seconds;
  }

  if(hours > 0) {
    display = `${hours}h ${minutes}m ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}s`;
  } else if(minutes > 0) {
    display = `${minutes}m ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}s`;
  } else display = `${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}s`;
  html.innerHTML = display;
  html.addEventListener('click', changeTime);
}

function changeTime() {
  clearInterval(countdown);
  html.innerHTML = 
  `
    <span><input type="number" class="ipTime" id="setHours" placeholder="0" pattern="[0-9]{2}"></span>
    <span class="step">h</span>
    <span><input type="number" class="ipTime" id="setMinutes" placeholder="0" pattern="[0-9]{2}"></span>
    <span class="step">m</span>
    <span><input type="number" class="ipTime" id="setSeconds" placeholder="0" pattern="[0-9]{2}"></span>
    <span>s</span>
  `
};  

function setSecond(e) {
  setSeconds = Number(e.target.value);
  console.log(setSeconds);
};

function setMinute(e) {
  setMinutes = Number(e.target.value);
  console.log(setMinutes);
};
      
function setHour(e) {
  setHours = Number(e.target.value);
  console.log(setHours);
};

function exchange() {
  const button = startEl.innerHTML;
  if (button === "Start") {
    startEl.innerHTML = "Stop";
    input = total;
    timerCountdown(input);
  }

  if (button === "Stop") {
    clearInterval(countdown);
    startEl.innerHTML = "Start";
    return input = secondsLeft;
  }
};

function reset(params) {
  clearInterval(countdown);
  displayTimeLeft(input);
  startEl.innerHTML = 'Start';
}

secondEl.addEventListener('keyup', setSecond);
minuteEl.addEventListener('keyup', setMinute);
hourEl.addEventListener('keyup', setHour);
startEl.addEventListener('click', () => {
  inputMatch();
  exchange();
});
resetEl.addEventListener('click', reset);

