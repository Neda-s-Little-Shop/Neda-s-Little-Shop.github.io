// --- CONFIGURATION ---
const images = ["/images/tree.jpg", "/images/Ema.jpg", "/images/Petar.jpg"];
const scrollCooldown = 800; // ms between image changes
const moveStrength = 50; // Parallax strength

// --- STATE ---
let currentIdx = 0;
let isScrolling = false;

// 1. PRELOAD IMAGES (Prevents flickering)
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// 2. PARALLAX EFFECT (Mouse Movement)
document.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  // Calculate Parallax Position
  const moveX = 50 + (mouseX * moveStrength - moveStrength / 2);
  const moveY = 50 + (mouseY * moveStrength - moveStrength / 2);

  document.body.style.backgroundPosition = `${moveX}% ${moveY}%`;
});

// 3. SCROLL EFFECT (Change Image)
document.addEventListener("wheel", function (e) {
  // Only hijack scroll if we are at the top of the page (optional safety)
  // Remove the 'if' below if you ALWAYS want scroll to change background
  if (window.scrollY > 5) return;

  if (isScrolling) return; // Wait for cooldown

  // Detect direction
  if (e.deltaY > 0) {
    // Scroll Down -> Next Image
    currentIdx = (currentIdx + 1) % images.length;
  } else {
    // Scroll Up -> Previous Image
    currentIdx = (currentIdx - 1 + images.length) % images.length;
  }

  // Apply Change
  document.body.style.backgroundImage = `url('${images[currentIdx]}')`;

  // Set Cooldown
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, scrollCooldown);
});
