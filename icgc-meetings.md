---
layout: default
title: ICGC Meetings
---

<link rel="stylesheet" href="{{ '/assets/css/style-meetings.css' | relative_url }}">

<header class="page-header">
  <div class="container">
    <h1>ICGC Meetings</h1>
    <p>
      Archive of the International Conference on Gravitation and Cosmology.
    </p>
  </div>
</header>

<details class="about-block">
<summary class="about-summary">About ICGC Meetings</summary>

<div class="about-content">
The International Conference on Gravitation and Cosmology (ICGC) is an international-level meeting, typically organized once every four years. It aims to survey recent developments in gravitation and cosmology, provide exposure to global research trends, and foster collaborations between Indian researchers and the international community.

Its format generally includes plenary talks and parallel sessions for contributed papers, with some editions also featuring short plenary presentations.

These meetings are usually held over five to six days and attract around 120 participants, including researchers from several countries.

</div>

</details>

<main class="container">
<div class="archive-container">

{% for period in site.data.icgc_meetings %}

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
<strong>Venue:</strong> {{ meeting.venue }}<br>

{% if meeting.proceedings %}
<strong>Proceedings:</strong> {{ meeting.proceedings }}
{% endif %}

</div>

{% if meeting.website_url or meeting.talks_url %}

<div class="meeting-actions">

{% if meeting.website_url %}
<a href="{{ meeting.website_url }}" target="_blank" class="btn-meeting">
Conference Website ↗
</a>
{% endif %}

{% if meeting.talks_url %}
<a href="{{ meeting.talks_url }}" target="_blank" class="btn-meeting">
Plenary Talks ↗
</a>
{% endif %}

</div>
{% endif %}

</div>

{% endfor %}

</div>
</div>
</details>

{% endfor %}

</div>
</main>
