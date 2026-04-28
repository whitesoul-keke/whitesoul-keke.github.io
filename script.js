const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("theme");

root.dataset.theme = storedTheme || "dark";

toggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  drawSky();
});

document.querySelector("#year").textContent = new Date().getFullYear();

const canvas = document.querySelector("#sky-map");
const context = canvas.getContext("2d");
const stars = Array.from({ length: 86 }, (_, index) => ({
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
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  context.globalAlpha = 1;

  stars.forEach((star, index) => {
    const x = (star.x / 100) * width;
    const y = (star.y / 100) * height;
    const pulse = 0.75 + Math.sin((Date.now() / 1800 + star.phase) * 0.017) * 0.25;
    context.beginPath();
    context.fillStyle = accent;
    context.globalAlpha = index % 6 === 0 ? 0.56 : 0.28;
    context.arc(x, y, star.radius * pulse, 0, Math.PI * 2);
    context.fill();
  });

  context.globalAlpha = 1;
}

drawSky();
window.addEventListener("resize", drawSky);
window.setInterval(drawSky, 2400);
