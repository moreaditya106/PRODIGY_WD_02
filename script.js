// Initialize variables
let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

// Start button event
startButton.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
});

// Pause button event
pauseButton.addEventListener('click', function() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
});

// Reset button event
resetButton.addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    lapCounter = 1;
    display.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    startButton.disabled = false;
    pauseButton.disabled = true;
});

// Function to update time
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

// Function to add a lap time
function addLap() {
    if (running) {
        let lapTime = display.innerHTML;
        let lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
}

// Add lap time on double-click of the display
display.addEventListener('dblclick', addLap);
