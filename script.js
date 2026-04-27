const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme || prefersDark) {
  root.dataset.theme = storedTheme || "dark";
}

toggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  drawSky();
});

document.querySelector("#year").textContent = new Date().getFullYear();

const canvas = document.querySelector("#sky-map");
const context = canvas.getContext("2d");
const stars = Array.from({ length: 130 }, (_, index) => ({
  x: (index * 47) % 100,
  y: (index * 83) % 100,
  radius: 0.7 + ((index * 13) % 24) / 20,
  phase: (index * 19) % 360,
}));

function color(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function drawSky() {
  const ratio = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const background = color("--bg");
  const accent = color("--accent");
  const warm = color("--warm");
  const line = color("--line");

  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = line;
  context.lineWidth = 1;
  context.globalAlpha = 0.42;

  for (let i = 0; i < 7; i += 1) {
    const y = height * (0.18 + i * 0.105);
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(width * 0.28, y - 34, width * 0.62, y + 34, width, y - 8);
    context.stroke();
  }

  context.globalAlpha = 1;

  stars.forEach((star, index) => {
    const x = (star.x / 100) * width;
    const y = (star.y / 100) * height;
    const pulse = 0.75 + Math.sin((Date.now() / 1800 + star.phase) * 0.017) * 0.25;
    context.beginPath();
    context.fillStyle = index % 9 === 0 ? warm : accent;
    context.globalAlpha = index % 5 === 0 ? 0.72 : 0.38;
    context.arc(x, y, star.radius * pulse, 0, Math.PI * 2);
    context.fill();
  });

  context.globalAlpha = 0.5;
  context.strokeStyle = accent;
  context.lineWidth = 1.2;
  context.beginPath();
  context.moveTo(width * 0.56, height * 0.24);
  context.lineTo(width * 0.68, height * 0.34);
  context.lineTo(width * 0.76, height * 0.28);
  context.lineTo(width * 0.86, height * 0.42);
  context.stroke();
  context.globalAlpha = 1;
}

drawSky();
window.addEventListener("resize", drawSky);
window.setInterval(drawSky, 2400);
