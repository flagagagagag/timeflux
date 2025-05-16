const clockCanvas = document.getElementById('clockCanvas');
const clockContext = clockCanvas.getContext('2d');

function drawCircle(){
    console.log("start drawing");
    clockContext.beginPath();
    clockContext.fillStyle= "black";

    clockContext.arc(300, 300, 100, 0, 2 * Math.PI, true);
    clockContext.stroke();
    //clockContext.fill()
    clockContext.closePath();
    console.log("end drawing");
}

function onStartButtonClick(){
    drawCircle();
}