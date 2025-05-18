const clockCanvas = document.getElementById('clockCanvas');
const clockContext = clockCanvas.getContext('2d');

clockContext.strokeStyle = "black";

let clockCanvasWidth = clockCanvas.width;
let clockCanvasHeight = clockCanvas.height;

const timeDisplay = document.getElementById("timeDisplay")

const secondsCircleRadius = clockCanvasHeight / 2;
const minutesCircleRadius = clockCanvasHeight / 3.5;
const hoursCircleRadius = clockCanvasHeight / 8;

const dropSound = new Audio('assets/dropSound.mp3');

let intervalId = null;

// function resizeCanvasToFullScreen() {
//     // Setze Zeichenfläche auf echte Größe des Browserfensters
//     clockCanvasWidth = window.innerWidth;
//     clockCanvasHeight = window.innerHeight;

//     clockCanvasWidth = clockCanvas.width;
//     clockCanvasHeight = clockCanvas.height;
// }

function resizeCanvasToFullScreen() {
    const dpr = window.devicePixelRatio || 1; // z. B. 2 bei Retina

    // CSS-Größe in logischen Pixeln
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Setze tatsächliche Zeichenfläche auf physische Pixel
    clockCanvas.width = width * dpr;
    clockCanvas.height = height * dpr;

    // Skaliere den Canvas-Inhalt runter, damit er optisch passt
    clockCanvas.style.width = width + "px";
    clockCanvas.style.height = height + "px";

    // Skaliere den Zeichenkontext für scharfes Zeichnen
    clockContext.setTransform(dpr, 0, 0, dpr, 0, 0);

    clockCanvasWidth = clockCanvas.width;
    clockCanvasHeight = clockCanvas.height;
}





function clearCanvas(bg = "black") {
    clockContext.fillStyle = bg;
    clockContext.fillRect(0, 0, clockCanvas.width, clockCanvas.height);
}

function drawSeconds(currentDate) {
    // Schrittweise erhöhen (z. B. 0.05 = ca. 2.8°)
    // let startAngle = 0;
    // let endAngle = 0;
    // if (endAngle < Math.PI * 2) {
    //     endAngle += 0.05;
    //     requestAnimationFrame(drawAnimatedCircle);
    // }

    const currentAmountOfSeconds = currentDate.getSeconds();
    let secondX = (secondsCircleRadius * Math.cos(Math.PI / 2)) + (clockCanvasWidth / 2);
    let secondY = -(secondsCircleRadius * Math.sin(Math.PI / 2)) + (clockCanvasHeight / 2);

    clockContext.fillStyle = "white";
    let degreeForSpacingBlobs = (2 * Math.PI) / currentAmountOfSeconds;

    for (let i = 1; i <= currentAmountOfSeconds; i++) {

        let secondX = (secondsCircleRadius * Math.cos((Math.PI / 2) + (degreeForSpacingBlobs * i))) + (clockCanvasWidth / 2);
        let secondY = -(secondsCircleRadius * Math.sin((Math.PI / 2) + (degreeForSpacingBlobs * i))) + (clockCanvasHeight / 2);

        clockContext.beginPath();
        clockContext.arc(secondX, secondY, 5, 0, 2 * Math.PI, true);
        clockContext.fill();
        clockContext.closePath();
    }
}

function drawMinutes(currentDate) {

    const currentAmountOfMinutes = currentDate.getMinutes();

    let minuteX = (minutesCircleRadius * Math.cos(Math.PI / 2)) + (clockCanvasWidth / 2);
    let minuteY = -(minutesCircleRadius * Math.sin(Math.PI / 2)) + (clockCanvasHeight / 2);

    clockContext.fillStyle = "white";
    let degreeForSpacingBlobs = (2 * Math.PI) / currentAmountOfMinutes;

    for (let i = 1; i <= currentAmountOfMinutes; i++) {

        let minuteX = (minutesCircleRadius * Math.cos((Math.PI / 2) + (degreeForSpacingBlobs * i))) + (clockCanvasWidth / 2);
        let minuteY = -(minutesCircleRadius * Math.sin((Math.PI / 2) + (degreeForSpacingBlobs * i))) + (clockCanvasHeight / 2);

        clockContext.beginPath();
        clockContext.arc(minuteX, minuteY, 5, 0, 2 * Math.PI, true);
        clockContext.fill();
        clockContext.closePath();
    }
}

function drawHours(currentDate) {

    const currentAmountOfHours = currentDate.getHours();

    let hourX = (hoursCircleRadius * Math.cos(Math.PI / 2)) + (clockCanvasWidth / 2);
    let hourY = -(hoursCircleRadius * Math.sin(Math.PI / 2)) + (clockCanvasHeight / 2);

    clockContext.fillStyle = "white";
    let degreeForSpacingBlobs = (2 * Math.PI) / currentAmountOfHours;

    for (let i = 1; i <= currentAmountOfHours; i++) {

        let hourX = (hoursCircleRadius * Math.cos((Math.PI / 2) + (degreeForSpacingBlobs * i))) + (clockCanvasWidth / 2);
        let hourY = -(hoursCircleRadius * Math.sin((Math.PI / 2) + (degreeForSpacingBlobs * i))) + (clockCanvasHeight / 2);

        clockContext.beginPath();
        clockContext.arc(hourX, hourY, 5, 0, 2 * Math.PI, true);
        clockContext.fill();
        clockContext.closePath();
    }
}

function drawCircles() {

    //Draw Seconds Circle
    clockContext.beginPath();
    clockContext.arc((clockCanvasWidth / 2), (clockCanvasHeight / 2), secondsCircleRadius, 0, 2 * Math.PI, true);
    clockContext.stroke();
    clockContext.closePath();

    //Draw Minutes Circle
    clockContext.beginPath();
    clockContext.arc((clockCanvasWidth / 2), (clockCanvasHeight / 2), minutesCircleRadius, 0, 2 * Math.PI, true);
    clockContext.stroke();
    clockContext.closePath();

    //Draw Hours Circle
    clockContext.beginPath();
    clockContext.arc((clockCanvasWidth / 2), (clockCanvasHeight / 2), hoursCircleRadius, 0, 2 * Math.PI, true);
    clockContext.stroke();
    clockContext.closePath();
}

function clockLoop() {
    dropSound.play();
    const currentDate = new Date;
    clearCanvas();
    drawCircles();
    drawSeconds(currentDate);
    drawMinutes(currentDate);
    drawHours(currentDate);
    timeDisplay.innerHTML = "Es ist " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + " Uhr.";
}

window.addEventListener("resize", resizeCanvasToFullScreen);
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        resizeCanvasToFullScreen();
        clockLoop();
    }
    if (intervalId === null) {
        intervalId = setInterval(clockLoop, 1000);
    }
    if (event.key === "w") {
        clockContext.strokeStyle = "white";
    }
    if (event.key === "b") {
        clockContext.strokeStyle = "black";
    }
    if (event.key === "g") {
        clockContext.strokeStyle = "grey";
    }
    if (event.key === "Shift") {
        timeDisplay.style.visibility =
            timeDisplay.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }
}
);