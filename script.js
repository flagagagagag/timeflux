const clockCanvas = document.getElementById('clockCanvas');
const clockContext = clockCanvas.getContext('2d');

let circleColor = "gray";

let clockCanvasWidth = clockCanvas.width;
let clockCanvasHeight = clockCanvas.height;

const timeDisplay = document.getElementById("timeDisplay")

const secondsCircleRadius = clockCanvasHeight / 2;
const minutesCircleRadius = clockCanvasHeight / 3.25;
const hoursCircleRadius = clockCanvasHeight / 8;

const secondsSound = new Audio('assets/secondsSound.mp3'); //https://pixabay.com/de/sound-effects/slow-cinematic-clock-ticking-tension-2-323078/
const minutesSound = new Audio('assets/minutesSound.mp3'); //https://pixabay.com/de/sound-effects/tibetan-gong-sound-effect-311179/
const hoursSound = new Audio('assets/hoursSound.mp3'); //https://pixabay.com/de/sound-effects/black-gong-28936/

let intervalId = null;


//  Uhr passt sich an Fenstergröße an
function resizeCanvasToFullScreen() {
    const dpr = window.devicePixelRatio || 1; // z. B. 2 bei Retina

    // CSS-Größe in logischen Pixeln
    clockCanvasWidth = window.innerWidth;
    clockCanvasHeight = window.innerHeight;

    // Setze tatsächliche Zeichenfläche auf physische Pixel
    clockCanvas.width = clockCanvasWidth * dpr;
    clockCanvas.height = clockCanvasHeight * dpr;

    // Skaliere den Canvas-Inhalt runter, damit er optisch passt
    clockCanvas.style.width = clockCanvasWidth + "px";
    clockCanvas.style.height = clockCanvasHeight + "px";

    // Skaliere den Zeichenkontext für scharfes Zeichnen
    clockContext.setTransform(dpr, 0, 0, dpr, 0, 0);
}





function clearCanvas(bg = "black") {
    clockContext.fillStyle = bg;
    clockContext.fillRect(0, 0, clockCanvas.width, clockCanvas.height);
}

function drawSeconds(currentDate) {

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

    clockContext.fillStyle = "yellow";
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

    clockContext.fillStyle = "red";
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

    clockContext.strokeStyle = circleColor;

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
    const currentDate = new Date;
    if (currentDate.getSeconds() !== 0) {
        secondsSound.currentTime = 0;
        secondsSound.play();
    }else if (currentDate.getMinutes() !== 0){
        minutesSound.currentTime = 0;
        minutesSound.play();
    }else {
        hoursSound.currentTime = 0;
        hoursSound.play();
    }
    clearCanvas();
    drawCircles();
    drawSeconds(currentDate);
    drawMinutes(currentDate);
    drawHours(currentDate);
    timeDisplay.innerHTML = "Es ist " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + " Uhr.";
}

/*  User inputs / Tastenkürzel:
    "Enter" = beginnt das Programm und startet die Uhr
    "w"     = färbt die Kreise weiß ein 
    "g"     = färbt die Kreise grau ein 
    "b"     = färbt die Kreise schwarz ein 
*/
window.addEventListener("resize", resizeCanvasToFullScreen);
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        resizeCanvasToFullScreen();
        clockLoop();
        if (intervalId === null) {
            intervalId = setInterval(clockLoop, 1000);
        }
    }
    if (event.key === "w") {
        circleColor = "white";
    }
    if (event.key === "b") {
        circleColor = "black";
    }
    if (event.key === "g") {
        circleColor = "grey";
    }
    if (event.key === "Shift") {
        timeDisplay.style.visibility =
            timeDisplay.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }
}
);