// Smooth Parallax Background with Crossfade Transitions
// For Neda's Little Shop

(function() {
    // --- CONFIGURATION ---
    const images = [
        "/images/tree.jpg",
        "/images/Petar.jpg",
        "/images/Ema.jpg"
    ];
    
    const PARALLAX_STRENGTH = 30;      // How much the background moves with mouse (pixels)
    const SCROLL_COOLDOWN = 1000;       // Time between scroll transitions (ms)
    const CROSSFADE_DURATION = 800;     // Match CSS transition duration (ms)

    // --- SAFETY CHECK ---
    if (!document.body.classList.contains("home")) {
        return; // Only run on homepage
    }

    // --- STATE ---
    let currentIdx = 0;
    let isTransitioning = false;
    let mouseX = 0.5;
    let mouseY = 0.5;

    // --- CREATE CROSSFADE LAYER ---
    const crossfadeLayer = document.createElement('div');
    crossfadeLayer.id = 'bg-crossfade';
    document.body.insertBefore(crossfadeLayer, document.body.firstChild);

    // --- PRELOAD IMAGES ---
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // --- PARALLAX (Mouse Move) ---
    function updateParallaxPosition() {
        const offsetX = (mouseX - 0.5) * PARALLAX_STRENGTH;
        const offsetY = (mouseY - 0.5) * PARALLAX_STRENGTH;
        
        const posX = `calc(50% + ${offsetX}px)`;
        const posY = `calc(50% + ${offsetY}px)`;
        
        document.body.style.backgroundPosition = `${posX} ${posY}`;
        crossfadeLayer.style.backgroundPosition = `${posX} ${posY}`;
    }

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        requestAnimationFrame(updateParallaxPosition);
    });

    // --- SMOOTH CROSSFADE TRANSITION ---
    function transitionToImage(newIdx) {
        if (isTransitioning || newIdx === currentIdx) return;
        isTransitioning = true;

        const newImage = images[newIdx];
        
        // Set up crossfade layer with new image
        crossfadeLayer.style.backgroundImage = `url('${newImage}')`;
        crossfadeLayer.style.opacity = '1';

        // After transition completes, swap to body and reset
        setTimeout(() => {
            document.body.style.backgroundImage = `url('${newImage}')`;
            crossfadeLayer.style.opacity = '0';
            currentIdx = newIdx;
            
            // Small delay before allowing next transition
            setTimeout(() => {
                isTransitioning = false;
            }, 200);
        }, CROSSFADE_DURATION);
    }

    // --- SCROLL HANDLER ---
    function handleScroll(e) {
        if (isTransitioning) return;

        let newIdx;
        if (e.deltaY > 0) {
            // Scroll down - next image
            newIdx = (currentIdx + 1) % images.length;
        } else {
            // Scroll up - previous image
            newIdx = (currentIdx - 1 + images.length) % images.length;
        }

        transitionToImage(newIdx);
    }

    document.addEventListener('wheel', handleScroll, { passive: true });

    // --- TOUCH SUPPORT (for mobile) ---
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                // Swipe up - next image
                transitionToImage((currentIdx + 1) % images.length);
            } else {
                // Swipe down - previous image
                transitionToImage((currentIdx - 1 + images.length) % images.length);
            }
        }
    }, { passive: true });

    // --- KEYBOARD SUPPORT ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            transitionToImage((currentIdx + 1) % images.length);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            transitionToImage((currentIdx - 1 + images.length) % images.length);
        }
    });

})();
