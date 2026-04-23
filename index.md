---
layout: default
title: Home
---

<!-- HERO -->
<section class="hero-immersive" id="hero-section" style="background-image: url('{{ '/assets/img/eht-hero.jpg' | relative_url }}');">
  <div class="hero-gradient">
    <div class="hero-content container">

      <span class="hero-kicker">
        Indian Association for General Relativity and Gravitation
      </span>

      <h1 class="hero-title">
        Advancing the Frontier of Spacetime.
      </h1>

      <p class="hero-subtitle">
        Promoting interest in gravitation and facilitating collaborative research
        across India since 1969.
      </p>

      <div class="hero-actions">
        <a href="{{ '/members' | relative_url }}" class="btn-solid">Meet Our Members</a>
        <a href="{{ '/resources' | relative_url }}" class="btn-outline-light">Explore Resources</a>
      </div>

    </div>

  </div>

  <!-- Animated scroll hint -->
  <div class="hero-scroll-hint" id="heroScrollHint" role="button" tabindex="0" aria-label="Scroll to Cosmic Timeline">
    <span class="hint-label">Cosmic Timeline</span>
    <svg class="hint-arrow" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4v14M4 11l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var hero      = document.getElementById("hero-section");
  var ctb       = document.getElementById("ctb");
  var mainSec   = document.getElementById("main-section");
  var heroHint  = document.getElementById("heroScrollHint");
  var ctbHint   = document.getElementById("ctbScrollHint");

  /* ── Click / keyboard handlers ── */
  heroHint.addEventListener("click", function () {
    ctb.scrollIntoView({ behavior: "smooth" });
  });
  heroHint.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") ctb.scrollIntoView({ behavior: "smooth" });
  });

  ctbHint.addEventListener("click", function () {
    mainSec.scrollIntoView({ behavior: "smooth" });
  });
  ctbHint.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") mainSec.scrollIntoView({ behavior: "smooth" });
  });

  /* ── Watch the HERO leaving the viewport to hide/show heroHint ──
     Much more reliable than watching CTB entering, since CTB has overflow:hidden */
  var heroObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        /* Hero is back in view — show hint */
        heroHint.classList.remove("hint-hidden");
      } else {
        /* Hero has left — hide hint */
        heroHint.classList.add("hint-hidden");
      }
    });
  }, { threshold: 0.15 });

  heroObserver.observe(hero);

  /* ── Watch CTB for: reveal animation + ctbHint show/hide ── */
  var ctbObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        ctb.classList.add("visible");
        ctbHint.classList.remove("hint-hidden");
      } else {
        ctbHint.classList.add("hint-hidden");
      }
    });
  }, { threshold: 0.15 });

  ctbObserver.observe(ctb);
});
</script>

<!-- COSMIC TIMELINE BRIDGE -->
<div id="ctb">
  <div id="stars"></div>
  <div class="ctb-inner">
    <div class="ctb-head">
      <span class="ctb-eyebrow">A Century of Discovery</span>
      <h2 class="ctb-title">Cosmic Timeline</h2>
      <p class="ctb-sub">From Einstein's equations to black hole imaging, GPS, and the expanding universe.</p>
    </div>
    <div class="ctb-scroll">
      <svg id="ctbsvg" class="ctb-svg" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <linearGradient id="tlgrd" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#fca311" stop-opacity="0.4"/>
            <stop offset="50%"  stop-color="#fca311" stop-opacity="1"/>
            <stop offset="100%" stop-color="#fca311" stop-opacity="0.5"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="ctb-cta">
      <a href="{{ '/ctb' | relative_url }}"
   class="ctb-btn"
   target="_blank"
   rel="noopener noreferrer">
   View Full Timeline →
</a>
    </div>
  </div>

  <!-- Scroll hint to main section -->
  <div class="ctb-scroll-hint hint-hidden" id="ctbScrollHint" role="button" tabindex="0" aria-label="Scroll to History and News">
    <span class="hint-label">Our History & News</span>
    <svg class="hint-arrow" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4v14M4 11l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</div>

<script>
(function(){
  // Stars
  var starsEl = document.getElementById('stars');
  for(var i=0;i<90;i++){
    var s=document.createElement('div');
    s.className='star';
    var sz=Math.random()<0.12?2:1;
    s.style.cssText='width:'+sz+'px;height:'+sz+'px;top:'+(Math.random()*100)+'%;left:'+(Math.random()*100)+'%;--d:'+(2+Math.random()*4)+'s;--delay:'+(Math.random()*4)+'s;--op:'+(0.25+Math.random()*0.6);
    starsEl.appendChild(s);
  }

  // --- Cubic Bézier evaluation ---
  // The full path is one composite cubic built from the shorthand S commands.
  // We decompose it into 4 explicit cubic segments and find exact points.

  // The path: M60,120 C130,40 200,200 310,120 S460,40 560,120 S700,200 800,120 S920,40 960,120
  // Segment anchors (start, cp1, cp2, end):
  var segs = [
    // seg 0: M60,120 C130,40 200,200 310,120
    {p0:[60,120],  p1:[130,78], p2:[210,162], p3:[310,120]},
    // seg 1: S460,40 560,120  → cp1 reflected from p2 of seg0
    // reflection of [200,200] about [310,120] = [420,40]
    {p0:[310,120], p1:[410,78], p2:[455,78],  p3:[560,120]},
    // seg 2: S700,200 800,120 → reflection of [460,40] about [560,120] = [660,200]
    {p0:[560,120], p1:[665,162],p2:[700,162], p3:[800,120]},
    // seg 3: S920,40 960,120  → reflection of [700,200] about [800,120] = [900,40]
    {p0:[800,120], p1:[900,78], p2:[915,78],  p3:[960,120]},
  ];

  function cubicPt(seg, t){
    var mt=1-t;
    var x=mt*mt*mt*seg.p0[0]+3*mt*mt*t*seg.p1[0]+3*mt*t*t*seg.p2[0]+t*t*t*seg.p3[0];
    var y=mt*mt*mt*seg.p0[1]+3*mt*mt*t*seg.p1[1]+3*mt*t*t*seg.p2[1]+t*t*t*seg.p3[1];
    return [x,y];
  }

  // 10 nodes, evenly distributed across 4 segments (0.0 to 1.0 each)
  // Distribute t values so nodes are visually balanced:
  // We spread across total t in [0..4] and map to segment+local t
  var globalTs = [0, 0.44, 0.89, 1.33, 1.78, 2.22, 2.67, 3.11, 3.56, 4.0];

  function evalGlobal(gt){
    var seg = Math.min(Math.floor(gt), 3);
    var t = gt - seg;
    if(gt >= 4){ seg=3; t=1; }
    return cubicPt(segs[seg], t);
  }

  var events = [
    {year:'1915', line1:'General',      line2:'Relativity'},
    {year:'1919', line1:'Eclipse',      line2:'Test'},
    {year:'1929', line1:'Expanding',    line2:'Universe'},
    {year:'1939', line1:'Gravitational',line2:'Collapse'},
    {year:'1963', line1:'Kerr',         line2:'Black Hole'},
    {year:'1974', line1:'Binary',       line2:'Pulsar'},
    {year:'1990', line1:'GPS',          line2:'Relativity'},
    {year:'1998', line1:'Accelerating', line2:'Universe'},
    {year:'2015', line1:'LIGO',         line2:'Detection'},
    {year:'2019', line1:'EHT Black',    line2:'Hole Image'},
  ];

  var pts = globalTs.map(function(gt){ return evalGlobal(gt); });

  // Build SVG viewBox based on points
  var minX=50, maxX=980, minY=0, maxY=220;
  var vbW=maxX-minX+60, vbH=maxY+20;

  var svg=document.getElementById('ctbsvg');
  svg.setAttribute('viewBox',(minX-30)+' -90 '+(vbW)+' '+(vbH+90));

  var ns='http://www.w3.org/2000/svg';

  // Draw path
  var pathEl=document.createElementNS(ns,'path');
  pathEl.setAttribute('class','tl-path');
  pathEl.setAttribute('d','M60,120 C130,78 210,162 310,120 S455,78 560,120 S700,162 800,120 S915,78 960,120');
  svg.appendChild(pathEl);

  // Render nodes — tooltips above path (appended last so they're on top)
  // First pass: dots, halos, years (below tooltips)
  // Second pass: tooltips
  var tipGroups = [];

  pts.forEach(function(pt, i){
    var cx=pt[0], cy=pt[1];
    var ev=events[i];

    var g=document.createElementNS(ns,'g');
    g.setAttribute('class','tl-node');

    // halo
    var halo=document.createElementNS(ns,'circle');
    halo.setAttribute('class','tl-halo');
    halo.setAttribute('cx',cx); halo.setAttribute('cy',cy); halo.setAttribute('r',18);
    g.appendChild(halo);

    // dot
    var dot=document.createElementNS(ns,'circle');
    dot.setAttribute('class','tl-dot');
    dot.setAttribute('cx',cx); dot.setAttribute('cy',cy); dot.setAttribute('r',7);
    g.appendChild(dot);

    // year label — below the path
    var yr=document.createElementNS(ns,'text');
    yr.setAttribute('class','tl-year');
    yr.setAttribute('x',cx); yr.setAttribute('y',cy+26);
    yr.textContent=ev.year;
    g.appendChild(yr);

    // tooltip group — positioned ABOVE the node
    var tipY = cy - 18; // base of tooltip box sits 18px above node center
    var tipX = cx;

    // clamp tooltip so it doesn't go off left/right edges
    var tipW=124, tipH=72;
    var tipLeft = tipX - tipW/2;
    var tipRight = tipX + tipW/2;
    var offX = 0;
    if(tipLeft < minX-20) offX = (minX-20) - tipLeft;
    if(tipRight > maxX+20) offX = (maxX+20) - tipRight;

    var tip=document.createElementNS(ns,'g');
    tip.setAttribute('class','tl-tip');

    var bg=document.createElementNS(ns,'rect');
    bg.setAttribute('class','tl-tip-bg');
    bg.setAttribute('x', tipX - tipW/2 + offX);
    bg.setAttribute('y', tipY - tipH);
    bg.setAttribute('width', tipW);
    bg.setAttribute('height', tipH);
    bg.setAttribute('rx',10);
    tip.appendChild(bg);

    var bar=document.createElementNS(ns,'rect');
    bar.setAttribute('class','tl-tip-bar');
    bar.setAttribute('x', tipX - tipW/2 + offX);
    bar.setAttribute('y', tipY - tipH);
    bar.setAttribute('width', tipW);
    bar.setAttribute('height', 3);
    bar.setAttribute('rx', 1.5);
    tip.appendChild(bar);

    var tx=tipX + offX;

    var ty=document.createElementNS(ns,'text');
    ty.setAttribute('class','tl-tip-yr');
    ty.setAttribute('x',tx); ty.setAttribute('y', tipY - tipH + 18);
    ty.setAttribute('text-anchor','middle');
    ty.textContent=ev.year;
    tip.appendChild(ty);

    var tl1=document.createElementNS(ns,'text');
    tl1.setAttribute('class','tl-tip-tx');
    tl1.setAttribute('x',tx); tl1.setAttribute('y', tipY - tipH + 36);
    tl1.setAttribute('text-anchor','middle');
    tl1.textContent=ev.line1;
    tip.appendChild(tl1);

    var tl2=document.createElementNS(ns,'text');
    tl2.setAttribute('class','tl-tip-tx');
    tl2.setAttribute('x',tx); tl2.setAttribute('y', tipY - tipH + 52);
    tl2.setAttribute('text-anchor','middle');
    tl2.textContent=ev.line2;
    tip.appendChild(tl2);

    g.appendChild(tip);
    tipGroups.push(g);
    svg.appendChild(g);
  });

})();
</script>
<!-- MAIN SECTION -->
<section class="home-main-section bg-light" id="main-section">
  <div class="container grid-layout">

    <!-- LEFT COLUMN -->
    <main class="mission-column">

      <!-- Mission -->
      <section class="mission-statement">

  <h2>Our History & Mission</h2>

  <p class="lead-text">
    The aim of IAGRG is to promote interest in the phenomena related to
    Gravitation and to facilitate research in related areas.
  </p>

  <p>
    In February 1969, Indian relativists met for the first time in a conference
    in Ahmedabad. It was organized to honour and felicitate one of the pioneers
    of relativity and gravitation research in India,
    <strong>Professor V. V. Narlikar</strong>,
    on attaining 60 years of age.
  </p>

  <p>
    At this historic meeting,
    <strong>Professor P. C. Vaidya</strong>
    proposed the formation of a society of Indian relativists. Thus, IAGRG was
    born, with Professor V. V. Narlikar serving as the founder President.
  </p>

  <p>
    Today, the association connects institutions and scholars across India,
    supports meetings and schools, shares opportunities, and helps sustain a
    vibrant scientific community in gravitation, cosmology, and astrophysics.
  </p>

<a href="{{ '/about' | relative_url }}" class="read-link">Learn More →</a>

</section>
      <!-- Compact Latest Updates -->
      <section class="mini-updates">

        <div class="updates-head">
          <h3>Latest IAGRG News</h3>
          <a href="{{ '/news' | relative_url }}">View All →</a>
        </div>

        <div class="mini-updates-list">

          {% assign latest_news = site.posts | where: "category", "news" %}

          {% for post in latest_news limit:4 %}
          <a href="{{ post.url | relative_url }}" class="mini-update-item">

            <span class="update-date">
              {{ post.date | date: "%b %d, %Y" }}
            </span>

            <span class="update-title">
              {{ post.title }}
            </span>

          </a>
          {% endfor %}

        </div>

      </section>

    </main>


    <!-- RIGHT COLUMN -->
    <aside class="recent-updates">

      <h3 class="section-heading">Latest Opportunities</h3>

      <div class="update-cards">

        {% assign opportunities = site.posts | where_exp: "post", "post.category != 'news'" %}

        {% for post in opportunities limit:3 %}
        <a href="{{ post.url | relative_url }}" class="update-card">

          <span class="badge badge-{{ post.category }}">
            {% case post.category %}
              {% when "job" %}Job
              {% when "conference" %}Conference
            {% endcase %}
          </span>

          <h4>{{ post.title }}</h4>

          <span class="update-date">
            {{ post.date | date: "%b %d, %Y" }}
          </span>

          <span class="read-link">Read More →</span>

        </a>
        {% endfor %}

      </div>

    </aside>

  </div>
</section>
