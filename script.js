let startTime;
let running = false;
let lapCounter = 1;

const stopwatchDisplay = document.querySelector('.stopwatch');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

let interval; // Added to store the interval ID

startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        running = true;
        interval = setInterval(updateStopwatch, 10); // Store the interval ID
    }
}

function stopStopwatch() {
    if (running) {
        running = false;
        clearInterval(interval); // Clear the interval
    }
}

function resetStopwatch() {
    running = false;
    lapCounter = 1;
    lapsContainer.innerHTML = '';
    clearInterval(interval); // Clear the interval
    stopwatchDisplay.textContent = formatTime(0);
}

function recordLap() {
    if (running) {
        const lapTime = calculateElapsedTime();
        const lapItem = document.createElement('div');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
        lapCounter++;
    }
}

function updateStopwatch() {
    const elapsedTime = calculateElapsedTime();
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

function calculateElapsedTime() {
    const currentTime = new Date().getTime();
    return currentTime - startTime;
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
