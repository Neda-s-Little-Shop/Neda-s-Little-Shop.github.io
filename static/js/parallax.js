(function () {
  // --- CONFIGURATION ---
  // Ensure these match your filenames EXACTLY (Case Sensitive!)
  const images = ["/images/tree.jpg", "/images/Petar.jpg", "/images/Ema.jpg"];

  // Safety: Only run on Home
  if (!document.body.classList.contains("home")) return;

  // --- SETUP ---
  let currentIdx = 0;
  let isTransitioning = false;

  // 1. Create the Background Elements safely
  const bgDiv = document.createElement("div");
  bgDiv.id = "my-background";
  document.body.appendChild(bgDiv);

  const overlayDiv = document.createElement("div");
  overlayDiv.id = "my-overlay";
  document.body.appendChild(overlayDiv);

  // 2. Preload Images
  images.forEach((src) => {
    new Image().src = src;
  });

  // 3. The Easy Fade Logic
  function changeImage(direction) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Calculate next index
    if (direction === "down") {
      currentIdx = (currentIdx + 1) % images.length;
    } else {
      currentIdx = (currentIdx - 1 + images.length) % images.length;
    }

    // A. Fade OUT
    bgDiv.style.opacity = "0";

    // B. Wait for fade (400ms), then Swap & Fade IN
    setTimeout(() => {
      bgDiv.style.backgroundImage = `url('${images[currentIdx]}')`;
      bgDiv.style.opacity = "1";

      // Reset cooldown
      setTimeout(() => {
        isTransitioning = false;
      }, 400);
    }, 400); // This matches the CSS transition time
  }

  // 4. Parallax (Mouse Move) - Keeps it simple
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // 20px movement
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bgDiv.style.transform = `translate(${x}px, ${y}px)`;
  });

  // 5. Scroll Listener
  document.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) changeImage("down");
    else changeImage("up");
  });
})();
