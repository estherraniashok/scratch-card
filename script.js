let isDrawing = false;

// 🖱️ MOUSE EVENTS (PC)
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

canvas.addEventListener("mousemove", function(e) {
  if (!isDrawing) return;

  scratch(e.clientX, e.clientY);
});

// 📱 TOUCH EVENTS (MOBILE)
canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);

canvas.addEventListener("touchmove", function(e) {
  if (!isDrawing) return;

  const touch = e.touches[0];
  scratch(touch.clientX, touch.clientY);
});

// ✨ SCRATCH FUNCTION (COMMON)
function scratch(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}
