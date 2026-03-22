const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// ✅ Load YOUR gold image
const img = new Image();
img.src = "gold.jpg";   // 🔥 change to gold.jpg if needed

img.onload = function () {

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  // ❤️ Create heart shape
  ctx.save();
  ctx.beginPath();

  ctx.moveTo(x, y + 70);

  ctx.bezierCurveTo(
    x - 150, y - 40,
    x - 80, y - 160,
    x, y - 60
  );

  ctx.bezierCurveTo(
    x + 80, y - 160,
    x + 150, y - 40,
    x, y + 70
  );

  ctx.closePath();
  ctx.clip();

  // ✨ Fill heart with gold texture
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.restore();
};

// Smooth scratch
ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false;

// Mouse events
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

canvas.addEventListener("mousemove", function(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
});