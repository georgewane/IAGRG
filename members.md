---
layout: default
title: Members Directory
---

<link rel="stylesheet" href="{{ '/assets/css/style-members.css' | relative_url }}">

<header class="member-hero">
  <div class="container">
    <h1>Members Directory</h1>
    <p>
      Explore the geographical distribution of members of the Indian Association
      for General Relativity and Gravitation.
    </p>
  </div>
</header>

<main class="container">

<section class="members-layout">

  <div class="map-panel">
    <h2>India Membership Map</h2>
    <div id="map"></div>
  </div>

  <div class="members-column">

    <div class="members-panel">

      <h2 id="stateTitle">Select a State</h2>

      <div id="memberList" class="member-list">
        <p class="empty-state">
          Click a state on the map to view members and institutions.
        </p>
      </div>

    </div>

    <div class="member-note">
      To update your affiliation, state, salutation, or if your name is missing
      from the directory, please contact the <strong>IAGRG Secretary</strong> at
      iagrgcontact[AT]gmail.com
    </div>

  </div>

</section>

<!-- INTERNATIONAL MEMBERS -->

<section class="intl-wrap">

  <button class="intl-toggle" id="intlToggle">

    <div class="intl-left">
      <span>International Members & Affiliates</span>
      <span id="intlCount" class="state-count">0</span>
    </div>

    <span class="intl-icon" id="intlIcon">▼</span>

  </button>

  <div id="intlMembers" class="intl-content"></div>

</section>

<div class="intl-member-note">
  To update your international affiliation, country listing, or if your name is
  missing from this section, please contact the <strong>IAGRG Secretary</strong>
  at iagrgcontact[AT]gmail.com
</div>

</main>

<script>
window.memberData = {{ site.data.members | jsonify }};
</script>

<script src="{{ '/assets/js/members.js' | relative_url }}"></script>
<script src="{{ '/assets/js/mapdata.js' | relative_url }}"></script>
<script src="{{ '/assets/js/countrymap.js' | relative_url }}"></script>
<script src="{{ '/assets/js/navbar.js' | relative_url }}"></script>

<script>
document.addEventListener("DOMContentLoaded", function(){

  const data = window.memberData || [];

  const intl = data.filter(m =>
    m.state &&
    m.state.toLowerCase() === "international"
  );

  const wrap  = document.getElementById("intlMembers");
  const count = document.getElementById("intlCount");
  const btn   = document.getElementById("intlToggle");

  if(!wrap || !count || !btn) return;

  count.textContent = intl.length;

  if(intl.length === 0){

    wrap.innerHTML =
      '<p class="empty-state">No international members listed.</p>';

  } else {

    const grouped = {};

    intl.forEach(m => {

      const inst = (m.institution || "-").trim();

      if(!grouped[inst]) grouped[inst] = [];

      if(m.name) grouped[inst].push(m.name);

    });

    let html = "";

    Object.keys(grouped)
      .sort((a,b) => a.localeCompare(b))
      .forEach(inst => {

        html += `
          <div class="institution-card">
            <div class="institution-name">${inst} (${grouped[inst].length})</div>
            <ul class="member-sublist">
              ${grouped[inst].map(n => `<li>${n}</li>`).join("")}
            </ul>
          </div>
        `;

      });

    wrap.innerHTML = html;
  }

  btn.addEventListener("click", function(){
    wrap.classList.toggle("open");
    btn.classList.toggle("active");
  });

});
</script>
