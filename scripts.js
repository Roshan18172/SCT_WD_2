let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let lapTimes = [];

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
  if (!running) {
    running = true;
    paused = false;
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function pauseStopwatch() {
  if (!paused) {
    paused = true;
    clearInterval(tInterval);
    startBtn.innerText = 'Start';
    pauseBtn.innerText = 'Resume';
  } else {
    paused = false;
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 10);
    startBtn.innerText = 'Start';
    pauseBtn.innerText = 'Pause';
  }
}

function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  paused = false;
  startTime = 0;
  difference = 0;
  timeDisplay.innerText = '00:00:00';
  lapList.innerHTML = '';
  lapTimes = [];
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 10);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

  timeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
  if (running) {
    lapTimes.push(difference);
    const lapTime = document.createElement('li');
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    lapTime.innerText = `Lap ${lapTimes.length}: ${hours}:${minutes}:${seconds}`;
    lapList.appendChild(lapTime);
  }
}
