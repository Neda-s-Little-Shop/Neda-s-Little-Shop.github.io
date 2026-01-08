// --- CONFIGURATION ---
const images = ["/images/tree.jpg", "/images/Petar.jpg", "/images/Ema.jpg"];

// --- LOGIC ---
let currentIdx = 0;
let isScrolling = false;

// 1. SAFETY CHECK: Only run on the Homepage
// PaperMod adds the class 'home' to the body tag on the main page.
if (!document.body.classList.contains("home")) {
  // If we are NOT on home, stop here. Do nothing.
  throw new Error("Not homepage");
}

// 2. PRELOAD IMAGES
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// 3. PARALLAX (Mouse Move)
document.addEventListener("mousemove", function (e) {
  const moveStrength = 50;
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const moveX = 50 + (mouseX * moveStrength - moveStrength / 2);
  const moveY = 50 + (mouseY * moveStrength - moveStrength / 2);

  document.body.style.backgroundPosition = `${moveX}% ${moveY}%`;
});

// 4. SCROLL LOOP (Instant Change)
document.addEventListener("wheel", function (e) {
  if (isScrolling) return;

  // Detect direction
  if (e.deltaY > 0) {
    // Scroll Down: 0 -> 1 -> 2 -> 0 -> 1...
    currentIdx = (currentIdx + 1) % images.length;
  } else {
    // Scroll Up: 0 -> 2 -> 1 -> 0...
    currentIdx = (currentIdx - 1 + images.length) % images.length;
  }

  // Apply Change
  document.body.style.backgroundImage = `url('${images[currentIdx]}')`;

  // Quick Cooldown to prevent spinning too fast
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 200);
});
