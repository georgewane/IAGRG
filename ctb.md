---
permalink: /ctb/
layout: none
---

<!--
<!DOCTYPE html> -->
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cosmic Timeline — A Century of Relativity &amp; Gravity</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">

  <!-- Timeline stylesheet -->
 <link rel="stylesheet" href="{{ '/assets/css/style-ctb.css' | relative_url }}">
</head>
<body>

<div id="scene">

  <!-- Perspective grid floor -->
  <div class="grid"></div>

  <!-- Era nebula background clouds (positioned by JS) -->
  <div class="nebula" id="neb-left"></div>
  <div class="nebula" id="neb-mid"></div>
  <div class="nebula" id="neb-right"></div>

  <!-- Twinkling ambient stars (populated by JS) -->
  <div id="ambient"></div>

  <!-- Fixed title -->
  <div class="title">
    <h1>The Cosmic Timeline</h1>
    <p>A Century of Relativity &amp; Gravity</p>
  </div>

  <!-- Draggable world canvas -->
  <div id="viewport">
    <div id="world">
      <svg id="worldSvg" xmlns="http://www.w3.org/2000/svg"></svg>
      <!-- Stars and year labels injected by JS -->
    </div>
  </div>

  <!-- Mouse-follow tooltip -->
  <div class="tooltip" id="tip"></div>

  <!-- Slide-in detail panel -->
  <div class="panel" id="panel">
    <div class="close-btn" id="closeBtn">&times;</div>
    <div class="panel-inner">
      <div class="panel-img">
        <svg class="panel-img-icon" id="pimgIcon" width="80" height="80"
             viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
      <div class="p-year"  id="py"></div>
      <h2  class="p-title" id="pt"></h2>
      <div class="p-sep"></div>
      <p   class="p-desc"  id="pd"></p>
      <div class="ptags"   id="ptags"></div>
      <div class="p-btns">
        <a class="btn-p" href="#" id="paperBtn">Read Paper</a>
        <a class="btn-s" href="#" id="moreBtn">Learn More</a>
      </div>
      <div class="p-next" id="pnext"></div>
    </div>
  </div>

  <!-- Instruction hint -->
  <div class="hint">Drag to explore &nbsp;·&nbsp; Click a star to open</div>

</div>

<script>

  /* ============================================================
     DATA — 12 milestone events.

     LAYOUT ZONES (x ranges):
       100–1600  = Left  — Foundations 1915–1939
       1700–2800 = Center — Theory Revolution 1963–1998
       2900–3900 = Right  — Observation Era 2015–2023

     Y positions deliberately scattered across 120–950 of the
     1100px world height so stars form constellation clusters,
     never a straight horizontal line.
  ============================================================ */
  const events = {{ site.data.ctb | jsonify }};
  /* ============================================================
     TAG MAP — category pill labels for the detail panel
  ============================================================ */
  const tagMap = {{ site.data.ctb_tags | jsonify }};

  /* ============================================================
     PANEL ICON MAP — SVG drawn inside the image placeholder.
     One design per category; rendered at 80×80 viewBox.
  ============================================================ */
  const iconMap = {
    foundation:
      `<circle cx="40" cy="40" r="28" stroke="rgba(255,195,60,.55)" stroke-width="1.5" fill="none"/>
       <circle cx="40" cy="40" r="16" stroke="rgba(255,195,60,.35)" stroke-width="1" fill="none"/>
       <circle cx="40" cy="40" r="4"  fill="rgba(255,195,60,.7)"/>
       <line x1="40" y1="4"  x2="40" y2="14" stroke="rgba(255,195,60,.4)" stroke-width="1"/>
       <line x1="40" y1="66" x2="40" y2="76" stroke="rgba(255,195,60,.4)" stroke-width="1"/>
       <line x1="4"  y1="40" x2="14" y2="40" stroke="rgba(255,195,60,.4)" stroke-width="1"/>
       <line x1="66" y1="40" x2="76" y2="40" stroke="rgba(255,195,60,.4)" stroke-width="1"/>`,
    blackhole:
      `<circle cx="40" cy="40" r="30" stroke="rgba(70,170,255,.25)" stroke-width="1" fill="none"/>
       <circle cx="40" cy="40" r="20" stroke="rgba(70,170,255,.45)" stroke-width="1.5" fill="none"/>
       <circle cx="40" cy="40" r="10" stroke="rgba(70,170,255,.65)" stroke-width="1" fill="none"/>
       <circle cx="40" cy="40" r="4"  fill="rgba(4,9,16,.98)" stroke="rgba(70,170,255,.9)" stroke-width="1.5"/>`,
    wave:
      `<path d="M5,40 Q17,20 29,40 Q41,60 53,40 Q65,20 75,40" stroke="rgba(90,235,255,.7)" stroke-width="1.5" fill="none"/>
       <path d="M5,52 Q17,32 29,52 Q41,72 53,52 Q65,32 75,52" stroke="rgba(90,235,255,.3)" stroke-width="1" fill="none"/>
       <path d="M5,28 Q17,8  29,28 Q41,48 53,28 Q65,8  75,28" stroke="rgba(90,235,255,.2)" stroke-width="1" fill="none"/>`,
    cosmo:
      `<circle cx="40" cy="40" r="24" stroke="rgba(155,115,255,.5)" stroke-width="1.5" fill="rgba(90,60,195,.06)"/>
       <circle cx="40" cy="40" r="4"  fill="rgba(155,115,255,.8)"/>
       <circle cx="22" cy="24" r="2"  fill="rgba(195,165,255,.5)"/>
       <circle cx="58" cy="30" r="2.5" fill="rgba(195,165,255,.4)"/>
       <circle cx="28" cy="58" r="1.5" fill="rgba(195,165,255,.5)"/>
       <circle cx="55" cy="54" r="2"  fill="rgba(195,165,255,.3)"/>`,
    theory:
      `<rect x="20" y="20" width="40" height="40" stroke="rgba(170,215,255,.5)" stroke-width="1.5" fill="none" rx="2"/>
       <rect x="30" y="30" width="20" height="20" stroke="rgba(170,215,255,.3)" stroke-width="1" fill="none" rx="1"/>
       <circle cx="40" cy="40" r="3" fill="rgba(195,225,255,.8)"/>
       <line x1="20" y1="20" x2="30" y2="30" stroke="rgba(170,215,255,.3)" stroke-width="1"/>
       <line x1="60" y1="20" x2="50" y2="30" stroke="rgba(170,215,255,.3)" stroke-width="1"/>
       <line x1="20" y1="60" x2="30" y2="50" stroke="rgba(170,215,255,.3)" stroke-width="1"/>
       <line x1="60" y1="60" x2="50" y2="50" stroke="rgba(170,215,255,.3)" stroke-width="1"/>`
  };

  /* ============================================================
     WORLD DIMENSIONS — 4000 × 1100 px
       Horizontal: wide enough to contain all events with drag room
       Vertical: 1100px gives ~300px of meaningful vertical drag
                 in a typical 800px viewport
  ============================================================ */
  const WORLD_W = 4000;
  const WORLD_H = 1100;

  /* ============================================================
     DOM REFERENCES
  ============================================================ */
  const viewport  = document.getElementById('viewport');
  const world     = document.getElementById('world');
  const svg       = document.getElementById('worldSvg');
  const tip       = document.getElementById('tip');
  const panel     = document.getElementById('panel');
  const ambientEl = document.getElementById('ambient');

  /* ============================================================
     SIZE WORLD & SVG
  ============================================================ */
  world.style.width  = WORLD_W + 'px';
  world.style.height = WORLD_H + 'px';
  svg.setAttribute('width',   WORLD_W);
  svg.setAttribute('height',  WORLD_H);
  svg.setAttribute('viewBox', `0 0 ${WORLD_W} ${WORLD_H}`);

  /* ============================================================
     NEBULA CLOUD POSITIONS
     Placed relative to viewport (not world) so they stay fixed
     as the user drags — they represent the background sky, not
     objects on the timeline canvas.
  ============================================================ */
  function positionNebulae() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    Object.assign(document.getElementById('neb-left').style,
      { left: '-60px', top: (vh * 0.28) + 'px' });
    Object.assign(document.getElementById('neb-mid').style,
      { left: (vw * 0.3) + 'px', top: (vh * 0.18) + 'px' });
    Object.assign(document.getElementById('neb-right').style,
      { right: '-40px', top: (vh * 0.08) + 'px' });
  }
  positionNebulae();

  /* Fade nebulae in after a short delay (avoids flash-of-colour on load) */
  setTimeout(() => {
    ['neb-left','neb-mid','neb-right'].forEach(id =>
      document.getElementById(id).classList.add('visible')
    );
  }, 500);

  /* ============================================================
     SVG CONNECTOR LINE
     Drawn through all large-sized events in chronological order.
     The animated dash-offset (CSS @keyframes dashFlow) makes the
     line appear to flow along its path — subtle, not distracting.
  ============================================================ */
const lineEvents = events;

const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

poly.setAttribute(
  'points',
  lineEvents.map(e => `${e.x},${e.y}`).join(' ')
);

poly.setAttribute('fill', 'none');
poly.setAttribute('stroke', 'rgba(70,150,200,.2)');
poly.setAttribute('stroke-width', '1');

poly.classList.add('connector-line');

svg.appendChild(poly);

  /* ============================================================
     BUILD STARS & LABELS

     For each event:
       1. Create a <button class="star …"> at (e.x, e.y)
       2. Attach tooltip + click handlers
       3. Create a <div class="starlabel"> with the year,
          positioned just below the dot's bottom edge

     wasDrag is the shared click-vs-drag flag (set in drag engine).
  ============================================================ */
  let wasDrag = false;

  events.forEach(e => {

    /* ── Dot radius for label offset ── */
    const dotR = e.size === 'large' ? 8.5 : e.size === 'medium' ? 6 : 4;

    /* ── Star button ── */
    const btn = document.createElement('button');
    btn.className = `star ${e.size} ${e.cls}`;
    btn.style.left = e.x + 'px';
    btn.style.top  = e.y + 'px';
    btn.setAttribute('aria-label', `${e.year}: ${e.title}`);

    /* ── Year label ── */
    const lbl = document.createElement('div');
    lbl.className   = 'starlabel';
    lbl.textContent = e.year;
    lbl.style.left  = e.x + 'px';
    lbl.style.top   = (e.y + dotR + 10) + 'px';

    /* Show tooltip on hover; highlight label */
    btn.addEventListener('mouseenter', ev => {
      tip.innerHTML     = `<strong>${e.year}</strong>${e.title}`;
      tip.style.opacity = '1';
      positionTip(ev);
      lbl.classList.add('active');
    });
    btn.addEventListener('mousemove', positionTip);
    btn.addEventListener('mouseleave', () => {
      tip.style.opacity = '0';
      lbl.classList.remove('active');
    });

    /* Open panel on click — bail if this was actually a drag */
    btn.addEventListener('click', ev => {
      if (wasDrag) return;
      ev.stopPropagation();
      openPanel(e);
    });

    world.appendChild(btn);
    world.appendChild(lbl);
  });

  /* ============================================================
     TOOLTIP POSITION HELPER
  ============================================================ */
  function positionTip(ev) {
    tip.style.left = (ev.clientX + 18) + 'px';
    tip.style.top  = (ev.clientY + 14) + 'px';
  }

  /* ============================================================
     PANEL OPEN / CLOSE

     openPanel(e):
       - Writes icon SVG, year badge, title, description, tags, next
       - Adds .open class to slide the panel in
       - Scrolls panel content to top (in case a prev entry was scrolled)

     closePanel():
       - Removes .open to slide the panel out
  ============================================================ */
  function openPanel(e) {
    document.getElementById('pimgIcon').innerHTML = iconMap[e.cls] || '';
    document.getElementById('py').textContent     = e.year;
    document.getElementById('pt').textContent     = e.title;
    document.getElementById('pd').textContent     = e.desc;

    const tagList = tagMap[e.cls] || ['Physics'];
    document.getElementById('ptags').innerHTML =
      tagList.map(t => `<span class="tag">${t}</span>`).join('');

    const idx  = events.indexOf(e);
    const next = events[idx + 1];
    const pnext = document.getElementById('pnext');
    pnext.innerHTML = next
      ? `Next milestone &rarr; <span>${next.year} — ${next.title}</span>`
      : 'You have reached the present frontier.';

    panel.classList.add('open');
    panel.scrollTop = 0;
  }

  function closePanel() { panel.classList.remove('open'); }

  document.getElementById('closeBtn').addEventListener('click', closePanel);

  /* Click outside panel + stars closes panel */
  document.getElementById('scene').addEventListener('click', ev => {
    if (!ev.target.closest('.panel') && !ev.target.closest('.star')) closePanel();
  });

  /* ============================================================
     DRAG ENGINE — Mouse

     Uses translate3d() exclusively (never changes left/top),
     keeping the drag on the GPU compositor for smooth 60 fps.

     wasDrag:
       - Set true as soon as pointer moves > 4px during a mousedown
       - Cleared 60ms after mouseup (delay lets star click handler
         see it as true, preventing accidental panel opens after drag)

     Clamping:
       - Horizontal: 100px slack lets user slightly overshoot edges
       - Vertical:   200px slack for the 1100px tall world
  ============================================================ */

  /* Initial camera: center on Kerr Metric (x=1980) — the heart of
     the theory era. User can drag left for origins, right for modern. */
  const CAM_X = 1980;
  let tx = -(CAM_X - window.innerWidth * 0.44);
  let ty = -(WORLD_H / 2 - window.innerHeight / 2);
  clamp();
  applyTransform();

  let isDown = false;
  let startX = 0, startY = 0;
  let startTx = 0, startTy = 0;

  viewport.addEventListener('mousedown', ev => {
    if (ev.target.closest('.star')) return;
    isDown  = true;
    wasDrag = false;
    startX  = ev.clientX;
    startY  = ev.clientY;
    startTx = tx;
    startTy = ty;
    viewport.classList.add('dragging');
    ev.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    viewport.classList.remove('dragging');
    setTimeout(() => { wasDrag = false; }, 60);
  });

  window.addEventListener('mousemove', ev => {
    if (!isDown) return;
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) wasDrag = true;
    tx = startTx + dx;
    ty = startTy + dy;
    clamp();
    applyTransform();
  });

  /* ============================================================
     DRAG ENGINE — Touch
  ============================================================ */
  viewport.addEventListener('touchstart', ev => {
    const t = ev.touches[0];
    isDown  = true;
    wasDrag = false;
    startX  = t.clientX;
    startY  = t.clientY;
    startTx = tx;
    startTy = ty;
  }, { passive: true });

  window.addEventListener('touchmove', ev => {
    if (!isDown) return;
    const t  = ev.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) wasDrag = true;
    tx = startTx + dx;
    ty = startTy + dy;
    clamp();
    applyTransform();
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDown = false;
    setTimeout(() => { wasDrag = false; }, 60);
  });

  /* ============================================================
     DRAG HELPERS
  ============================================================ */
  function clamp() {
    /* Horizontal: 100px slack either side of the world edges */
    tx = Math.max(-(WORLD_W - window.innerWidth  + 100), Math.min(100, tx));
    /* Vertical:   200px slack — meaningful range within 1100px world */
    ty = Math.max(-(WORLD_H - window.innerHeight + 200), Math.min(200, ty));
  }

  function applyTransform() {
    world.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }

  /* ============================================================
     AMBIENT BACKGROUND STARS — 180 dots with size / opacity
     variation to simulate depth layers (closer = larger + brighter).
  ============================================================ */
  for (let i = 0; i < 180; i++) {
    const s     = document.createElement('span');
    const layer = Math.random(); /* 0 = very distant, 1 = nearer */
    const size  = layer > 0.88 ? 2.5 : layer > 0.6 ? 1.5 : 1;
    const baseOp = layer > 0.88 ? 0.55 : layer > 0.6 ? 0.32 : 0.18;
    const dur   = (3.5 + Math.random() * 5).toFixed(1) + 's';
    const delay = (Math.random() * 7).toFixed(1) + 's';

    s.style.cssText =
      `left:${(Math.random()*100).toFixed(2)}%;` +
      `top:${(Math.random()*100).toFixed(2)}%;`  +
      `width:${size}px;height:${size}px;`         +
      `--base-op:${baseOp};--dur:${dur};--delay:${delay};`;

    ambientEl.appendChild(s);
  }

  /* ============================================================
     PARALLAX — subtle ambient layer drift on mouse move.
     Moves at ~30% of cursor offset, creating a sense that the
     background stars are farther away than the world canvas.
     Does NOT move the world or stars.
  ============================================================ */
  document.addEventListener('mousemove', ev => {
    const x = (ev.clientX / window.innerWidth  - 0.5) * 10;
    const y = (ev.clientY / window.innerHeight - 0.5) * 10;
    ambientEl.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

</script>
</body>
</html>
