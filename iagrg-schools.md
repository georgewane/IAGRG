---
layout: default
title: IAGRG Workshops & Schools
---

<link rel="stylesheet" href="/assets/css/style-meetings.css">

<header class="page-header">
  <div class="container">
    <h1>IAGRG Workshops & Schools</h1>
    <p>
      Specialized meetings, workshops and schools organized or supported by IAGRG.
    </p>
  </div>
</header>

<main class="container">

<details class="about-block">
<summary class="about-summary">About IAGRG Schools/Workshops</summary>

<div class="about-content">
IAGRG also organizes and sponsors additional meetings, workshops and schools from time to time. These are usually more specialized in nature, with themes that evolve according to current developments in gravitation, cosmology and related areas.
</div>

</details>

<div class="archive-container">

{% for period in site.data.iagrg_schools %}

<details class="decade-block" {% if forloop.first %}open{% endif %}>
<summary class="decade-summary">{{ period.decade }}</summary>

<div class="details-content">
<div class="meeting-grid">

{% for meeting in period.meetings %}

<div class="meeting-card">

<div class="meeting-header">
<div>
<h3 class="meeting-title">{{ meeting.title }}</h3>
<div class="meeting-date">{{ meeting.date }}</div>
</div>

<div class="meeting-badge">#{{ meeting.number }}</div>
</div>

<div class="meeting-meta">
<strong>Venue:</strong> {{ meeting.venue }}
</div>

</div>

{% endfor %}

</div>
</div>
</details>

{% endfor %}

</div>
</main>