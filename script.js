const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas resolution properly
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  drawGold();
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

// Load gold texture
const img = new Image();
img.src = "./gold.jpg";

img.onload = function () {
  drawGold();
};

function drawGold() {
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Scratch logic
let isDrawing = false;

// Get correct position
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

// Scratch function
function scratch(e) {
  if (!isDrawing) return;

  e.preventDefault(); // 🔥 VERY IMPORTANT for mobile

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
