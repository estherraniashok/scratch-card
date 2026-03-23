const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = document.querySelector(".invite-img");

// ✅ Wait for everything to load
window.onload = () => {
  canvas.width = img.offsetWidth;
  canvas.height = img.offsetHeight;

  drawScratchLayer();
};

// ❤️ HEART SHAPE
function heartPath() {
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let size = 100;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size/2, x - size, y - size/2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size/2, x, y + size, x, y + size);
  ctx.bezierCurveTo(x, y + size, x + size, y + size/2, x + size, y);
  ctx.bezierCurveTo(x + size, y - size/2, x, y - size/2, x, y);
  ctx.closePath();
}

// 🎨 DRAW GOLD ONLY INSIDE HEART
function drawScratchLayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw heart path
  heartPath();

  // Clip to heart
  ctx.save();
  ctx.clip();

  // ✨ Gold gradient
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#d4af37");
  gradient.addColorStop(0.5, "#ffd700");
  gradient.addColorStop(1, "#b8962e");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ✨ Glitter effect
  for (let i = 0; i < 150; i++) {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 1.5, 0, Math.PI*2);
    ctx.fill();
  }

  // 💖 Text
  ctx.fillStyle = "#fff";
  ctx.font = "18px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Scratch ❤️", canvas.width/2, canvas.height/2+40);

  ctx.restore();
}

// ✨ SCRATCH LOGIC
let isDrawing = false;

function scratch(x, y) {
  ctx.save();

  // Restrict scratch to heart only
  heartPath();
  ctx.clip();

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 🖱️ Mouse Events
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  scratch(e.clientX - rect.left, e.clientY - rect.top);
});

// 📱 Touch Events
canvas.addEventListener("touchstart", () => isDrawing = true);

canvas.addEventListener("touchend", () => isDrawing = false);

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];

  scratch(touch.clientX - rect.left, touch.clientY - rect.top);
});
