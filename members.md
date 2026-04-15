---
layout: default
title: Members Directory
---

<link rel="stylesheet" href="/assets/css/style-members.css">

<header class="page-header">
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

<div class="members-panel">

  <h2 id="stateTitle">Select a State</h2>

  <div id="memberList" class="member-list">
    <p class="empty-state">
      Click a state on the map to view members and institutions.
    </p>
  </div>

</div>

</section>

</main>

<script>
window.memberData = {{ site.data.members | jsonify }};
</script>

<script src="/assets/js/members.js"></script>
<script src="/assets/js/mapdata.js"></script>
<script src="/assets/js/countrymap.js"></script>
<script src="assets/js/navbar.js"></script>