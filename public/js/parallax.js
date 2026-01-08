document.addEventListener("mousemove", function (e) {
  // Calculate mouse position as a percentage of the screen
  // (0.0 to 1.0)
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  // Movement Strength (Higher = more movement)
  const strength = 50;

  // Calculate new position
  // We start at 50% (center) and add the offset
  const moveX = 50 + (mouseX * strength - strength / 2);
  const moveY = 50 + (mouseY * strength - strength / 2);

  // Apply the style to the body
  document.body.style.backgroundPosition = `${moveX}% ${moveY}%`;
});
