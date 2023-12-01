const timerElement = document.getElementById('timer');
const startStopBtn = document.getElementById('start-stop-btn');
const pauseBtn = document.getElementById('pause-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const ringingSound = document.getElementById('ringing-sound');

let timerInterval;
let ringingTimeout;
let timeRemaining = 0;
let isTimerRunning = false;

function startTimer(duration) {
  let endTime = Date.now() + duration * 1000;
  timerInterval = setInterval(updateTimer, 10);

  function updateTimer() {
    let currentTime = Date.now();
    timeRemaining = Math.max(0, endTime - currentTime);

    const formattedTime = formatTime(timeRemaining);
    timerElement.textContent = formattedTime;

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      startStopBtn.textContent = 'Start';
      isTimerRunning = false;
      playRingingSound();
    }
  }
}

function formatTime(time) {
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const minutes = Math.floor((time / 1000 / 60) % 60).toString().padStart(2, '0');
  const hours = Math.floor(time / 1000 / 60 / 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function playRingingSound() {
  ringingSound.play();
  ringingTimeout = setTimeout(stopRingingSound, 7500);
}

function stopRingingSound() {
  ringingSound.pause();
  ringingSound.currentTime = 0;
}

startStopBtn.addEventListener('click', () => {
  if (!isTimerRunning) {
    const durationInput = parseInt(prompt('Enter the duration in seconds:'));
    if (isNaN(durationInput) || durationInput <= 0) {
      return;
    }
    startTimer(durationInput);
    startStopBtn.textContent = 'Stop';
    pauseBtn.textContent = 'Pause';
  } else {
    clearInterval(timerInterval);
    clearTimeout(ringingTimeout);
    timeRemaining = 0;
    timerElement.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    stopRingingSound();
  }

  isTimerRunning = !isTimerRunning;
});

pauseBtn.addEventListener('click', () => {
  if (pauseBtn.textContent === 'Pause') {
    clearInterval(timerInterval);
    clearTimeout(ringingTimeout);
    pauseBtn.textContent = 'Resume';
    stopRingingSound();
  } else {
    startTimer(timeRemaining / 1000);
    pauseBtn.textContent = 'Pause';
    stopRingingSound();
  }
});

fullscreenBtn.addEventListener('click', () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
});
