const resetEl = document.getElementById("reset");
const startEl = document.getElementById("start");
const hourEl = document.getElementById("setHours");
const minuteEl = document.getElementById("setMinutes");
const secondEl = document.getElementById("setSeconds");
let container = document.querySelector(".body-clock");
const stopwatch = document.getElementById("stwatchSelect");
const timer = document.getElementById("timerSelect");

let countdown, now, then, secondsLeft, display, count;
let setHours = 0;
let setMinutes = 0;
let setSeconds = 0;
let miniSeconds = 0;
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
    <button class="action-bt start" id="start">Start</button>
    <button class="action-bt reset" id="reset">Reset</button>
  </div>
    `;

let htmlStopwatch = `
<div class="sw-frame">
  <span class="sw-cell" id = "stWatch">
    <span>0</span>
    <span class="sw-step">s</span>
    <span>00</span>
  </span>
</div>
<div class="action-nav">
  <button class="action-bt start" id="startSw">Start</button>
  <button class="action-bt reset" id="resetSw">Reset</button>
</div>
`

function inputMatch () {
  total = setSeconds + setMinutes * 60 + setHours * 3600;
};

function timerCountdown (seconds) {
  now = Date.now();
  then = now + seconds * 1000;
  displayTimeLeft(input);
  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return startEl.innerHTML = "OK";     
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft (seconds) {
  let hours = Math.floor(seconds / 3600);
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
    display = `${hours}h ${minutes}m ${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s`;
  } else if(minutes > 0) {
    display = `${minutes}m ${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s`;
  } else display = `${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s`;
  document.querySelector(".timer-cell").innerHTML = display;
  document.querySelector(".timer-cell").removeEventListener("click", exchange);
  document.querySelector(".timer-cell").addEventListener("click", changeTime);
}

function changeTime() {
  startEl.innerHTML = "Start";
  clearInterval(countdown);
  container.innerHTML = htmlDefault;
  tryInput();
};

function setSecond (e) {
  setSeconds = Number(e.target.value);
};

function setMinute (e) {
  setMinutes = Number(e.target.value);
};
      
function setHour (e) {
  setHours = Number(e.target.value);
};

function exchange() {
  let button = document.getElementById("start").innerHTML;
  if (button === "Start") {
    document.getElementById("start").innerHTML = "Stop";
    if (!secondsLeft) {
      input = total;
    } else {
      input = secondsLeft;
    }
    timerCountdown(input);
  }

  if (button === "Stop") {
    clearInterval(countdown);
    document.getElementById("start").innerHTML = "Start";
  }
};

function reset(params) {
  clearInterval(countdown);
  displayTimeLeft(total);
  startEl.innerHTML = "Start";
}

function tryInput() {
  total = 0;
  input = 0;
  secondsLeft = 0;
  setHours = 0;
  setMinutes = 0;
  setSeconds = 0;
  document.getElementById("resetSeconds").addEventListener("keyup", setSecond);
  document.getElementById("resetMinutes").addEventListener("keyup", setMinute);
  document.getElementById("resetHours").addEventListener("keyup", setHour);
  document.getElementById("start").addEventListener("click", () => {
    inputMatch();
    exchange();
  });
  document.getElementById("reset").addEventListener("click", reset);
}

function changeButton () {
  let button = document.getElementById("startSw").innerHTML;
  if (button === "Start") {
    document.getElementById("startSw").innerHTML = "Stop";
    increase(miniSeconds);
  }

  if (button === "Stop") {
    clearInterval(count);
    document.getElementById("startSw").innerHTML = "Start";
  }
};

function increase (param) {
  count = setInterval(() => {
    ++miniSeconds;
    displayStopwatch(miniSeconds);
  }, 10);
}

function displayStopwatch (param) {
  let remainderMiniSeconds = param % 100;
  let seconds = Math.floor(param / 100);
  let minutes;
  let remainderSeconds;
  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    remainderSeconds = seconds % 60;
  } else {
    minutes = 0;
    remainderSeconds = seconds;
  }
  if(minutes > 0) {
      display = `${minutes}m ${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s 
      \ ${remainderMiniSeconds < 10 ? "0" : ""}${remainderMiniSeconds}`;
    } else display = `${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s 
      \ ${remainderMiniSeconds < 10 ? "0" : ""}${remainderMiniSeconds}`;
  
  document.querySelector(".sw-cell").innerHTML = display;
};

function resetStopwatch () {
  clearInterval(count);
  miniSeconds = 0;
  displayStopwatch(0);
  document.getElementById("startSw").innerHTML = "Start";
}

function changeToStopwatch () {
  clearInterval(countdown);
  stopwatch.style.color = "#3287f5"
  stopwatch.style.borderBottom = "2px solid blue";
  timer.style.color = "darkgrey";
  timer.style.borderBottom = "none";
  container.innerHTML = htmlStopwatch;
  document.getElementById("startSw").addEventListener("click", changeButton);
  document.getElementById("resetSw").addEventListener("click", resetStopwatch);
}

function changeToDefault () {
  clearInterval(count);
  stopwatch.style.color = "darkgrey"
  stopwatch.style.borderBottom = "none";
  timer.style.color = "#3287f5";
  timer.style.borderBottom = "2px solid blue";   
  changeTime();
}

secondEl.addEventListener("keyup", setSecond);
minuteEl.addEventListener("keyup", setMinute);
hourEl.addEventListener("keyup", setHour);
startEl.addEventListener("click", () => {
  inputMatch();
  exchange();
});
resetEl.addEventListener("click", reset);
stopwatch.addEventListener("click", changeToStopwatch);
timer.addEventListener("click", changeToDefault);
