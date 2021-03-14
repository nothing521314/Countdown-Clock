const resetEl = document.getElementById("reset");
const startEl = document.getElementById("start");
const hourEl = document.getElementById("setHours");
const minuteEl = document.getElementById("setMinutes");
const secondEl = document.getElementById("setSeconds");
let container = document.querySelector(".body-clock");

let countdown, now, then, secondsLeft, display;
let setHours = 0;
let setMinutes = 0;
let setSeconds = 0;

let input = 0;
let total = 0;

let htmlDefault = `
  <div class="timer-frame">
    <span class="timer-cell" id = "countdown">
      <input type="number" class="ipTime" id="resetHours" placeholder="0" pattern="[0-9]{2}">
      <span class="step">h</span>
      <input type="number" class="ipTime" id="resetMinutes" placeholder="0" pattern="[0-9]{2}">
      <span class="step">m</span>
      <input type="number" class="ipTime" id="resetSeconds" placeholder="0" pattern="[0-9]{2}">
      <span>s</span>
    </span>
  </div>
  <div class="action-nav">
    <button class="action-bt start" id="startChange">Start</button>
    <button class="action-bt reset" id="resetChange">Reset</button>
  </div>
    `;

function inputMatch () {
  total = setSeconds + setMinutes * 60 + setHours * 3600;
};

function timerCountdown(seconds) {
  now = Date.now();
  then = now + seconds * 1000;
  displayTimeLeft(input);
  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
  console.log(countdown);
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
  document.querySelector(".timer-cell").innerHTML = display;
  document.querySelector(".timer-cell").removeEventListener('click', exchange);
  document.querySelector(".timer-cell").addEventListener('click', changeTime);
}

function changeTime() {
  startEl.innerHTML = "Start";
  clearInterval(countdown);
  container.innerHTML = htmlDefault;
  tryInput();
};

function setSecond(e) {
  setSeconds = Number(e.target.value);
};

function setMinute(e) {
  setMinutes = Number(e.target.value);
};
      
function setHour(e) {
  setHours = Number(e.target.value);
};

function exchange() {
  const button = startEl.innerHTML;
  if (button === "Start") {
    startEl.innerHTML = "Stop";
    input = total;
    timerCountdown(input);
  }

  if (button === "Stop") {
    console.log("button: ", 2);
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

function tryInput() {
  total = 0;
  input = 0;
  setHours = 0;
  setMinutes = 0;
  setSeconds = 0;
  console.log("input: ", total, input);
  document.getElementById("resetSeconds").addEventListener('keyup', setSecond);
  document.getElementById("resetMinutes").addEventListener('keyup', setMinute);
  document.getElementById("resetHours").addEventListener('keyup', setHour);
  document.getElementById("startChange").addEventListener('click', () => {
    inputMatch();
    exchange();
  });
  document.getElementById("resetChange").addEventListener('click', reset);
}

function stopWatch(params) {
  
}

secondEl.addEventListener('keyup', setSecond);
minuteEl.addEventListener('keyup', setMinute);
hourEl.addEventListener('keyup', setHour);
startEl.addEventListener('click', () => {
  inputMatch();
  exchange();
});
resetEl.addEventListener('click', reset);

