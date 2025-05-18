const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");
const timeDisplay = document.getElementById("timeDisplay");

let width, height;
let secondsRadius, minutesRadius, hoursRadius;
let secondBlobs = [], minuteBlobs = [], hourBlobs = [];

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  secondsRadius = height / 3;
  minutesRadius = height / 4.2;
  hoursRadius = height / 6;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Blob {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.targetX = startX;
    this.targetY = startY;
  }

  updatePosition(speed = 0.1) {
    this.x += (this.targetX - this.x) * speed;
    this.y += (this.targetY - this.y) * speed;
  }

  draw(color = "white") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function getTopOfCircle(centerX, centerY, radius) {
  return {
    x: centerX,
    y: centerY - radius
  };
}

function updateBlobs(array, count, radius, color) {
  const centerX = width / 2;
  const centerY = height / 2;
  const spacing = (2 * Math.PI) / Math.max(count, 1);

  while (array.length < count) {
    const top = getTopOfCircle(centerX, centerY, radius);
    array.push(new Blob(top.x, top.y));
  }

  for (let i = 0; i < count; i++) {
    const angle = Math.PI / 2 + i * spacing;
    const targetX = centerX + radius * Math.cos(angle);
    const targetY = centerY - radius * Math.sin(angle);

    array[i].targetX = targetX;
    array[i].targetY = targetY;
  }

  array.splice(count);
}

function drawCircles() {
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, secondsRadius, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, minutesRadius, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, hoursRadius, 0, 2 * Math.PI);
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircles();

  secondBlobs.forEach(b => { b.updatePosition(); b.draw("white"); });
  minuteBlobs.forEach(b => { b.updatePosition(); b.draw("lightblue"); });
  hourBlobs.forEach(b => { b.updatePosition(); b.draw("lightgreen"); });

  requestAnimationFrame(animate);
}

function updateTime() {
  const now = new Date();
  updateBlobs(secondBlobs, now.getSeconds(), secondsRadius);
  updateBlobs(minuteBlobs, now.getMinutes(), minutesRadius);
  updateBlobs(hourBlobs, now.getHours(), hoursRadius);
  timeDisplay.textContent = now.toLocaleTimeString();
}

let intervalId = null;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && intervalId === null) {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
    animate();
  }
});
