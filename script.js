const canvas = document.getElementById("scratch");
const ctx = canvas.getContext("2d");

// Resize canvas properly
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  drawHeart(); // redraw after resize
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

// Load gold texture
const img = new Image();
img.src = "./gold.jpg";

img.onload = function () {
  drawHeart();
};

// ❤️ Draw HEART shape with gold
function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const w = canvas.width;
  const h = canvas.height;

  ctx.save();

  ctx.beginPath();

  ctx.moveTo(w / 2, h * 0.8);
  ctx.bezierCurveTo(w * 1.2, h * 0.4, w * 0.8, h * 0.1, w / 2, h * 0.3);
  ctx.bezierCurveTo(w * 0.2, h * 0.1, -w * 0.2, h * 0.4, w / 2, h * 0.8);

  ctx.closePath();
  ctx.clip();

  ctx.drawImage(img, 0, 0, w, h);

  ctx.restore();
}

// Scratch logic
let isDrawing = false;

// Get position
function getXY(e) {
  const rect = canvas.getBoundingClientRect();

  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

// Scratch
function scratch(e) {
  if (!isDrawing) return;

  e.preventDefault();

  const pos = getXY(e);

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
  ctx.fill();
}

// PC
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

// Mobile
canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", scratch);
