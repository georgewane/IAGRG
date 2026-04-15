document.addEventListener("DOMContentLoaded", () => {
  // Select the SVG directly from the DOM
  const svg = document.getElementById("indiaMap"); 
  const title = document.getElementById("stateTitle");
  const list = document.getElementById("memberList");

  if (!svg) return; // Safety check

  /* Works for path / polygon / g inside the inline SVG */
  const states = svg.querySelectorAll("[id]");

  states.forEach(state => {
    const code = state.id;
    if (!stateMap[code]) return;

    state.style.cursor = "pointer";
    // ... rest of your hover/click logic remains the same ...
  });
});