---
layout: default
title: IAGRG Meetings
---

<link rel="stylesheet" href="/assets/css/style-meetings.css">

<header class="page-header">
  <div class="container">
    <h1>IAGRG Meetings</h1>
    <p>The central gathering of the Indian gravitation and cosmology community since 1969.</p>
  </div>
</header>

<details class="about-block">
<summary class="about-summary">About IAGRG Meetings</summary>

<div class="about-content">
IAGRG Meetings are primarily national-level meetings, typically organized once every two years. They provide a forum for the Indian gravitation and cosmology community to present recent work, exchange ideas, and promote interaction among researchers.

Their format usually includes plenary talks, contributed paper sessions, the Vaidya–Raychaudhuri Endowment Award Lecture, and the General Body Meeting of the IAGRG, which is generally held toward the close of the meeting.

These meetings are typically held over four days and host around 70 participants from institutions across the country.
</div>

</details>

<main class="container">
<div class="archive-container">

{% for period in site.data.iagrg_meetings %}

<details class="decade-block" {% if forloop.first %}open{% endif %}>
<summary class="decade-summary">{{ period.decade }}</summary>

<div class="details-content">
<div class="meeting-grid">

{% for meeting in period.meetings %}

<div class="meeting-card">

<div class="meeting-header">
<div>
<h3 class="meeting-title">IAGRG {{ meeting.number }}</h3>
<div class="meeting-date">{{ meeting.date }}</div>
</div>

<div class="meeting-badge">#{{ meeting.number }}</div>
</div>

{% if meeting.theme %}
<div class="theme-text">“{{ meeting.theme }}”</div>
{% endif %}

<div class="meeting-meta">
<strong>Venue:</strong> {{ meeting.venue }}<br>

{% if meeting.proceedings %}
<strong>Proceedings:</strong> {{ meeting.proceedings }}
{% endif %}
</div>

{% if meeting.soc_chair or meeting.soc_members %}
<details class="soc-details">
<summary class="soc-summary">Scientific Organising Committee</summary>

<div class="soc-list">

{% if meeting.soc_chair %}
<p><strong>Chair:</strong> {{ meeting.soc_chair }}</p>
{% endif %}

{% if meeting.soc_members.size > 0 %}
<p><strong>Members:</strong></p>

<ul>
{% for member in meeting.soc_members %}
<li>{{ member }}</li>
{% endfor %}
</ul>

{% endif %}

</div>
</details>
{% endif %}

<div class="meeting-actions">

{% if meeting.website_url %}
<a href="{{ meeting.website_url }}" target="_blank" class="btn-meeting">
Conference Website ↗
</a>
{% endif %}

{% if meeting.talks_url %}
<a href="{{ meeting.talks_url }}" target="_blank" class="btn-meeting">
Talks & Slides ↗
</a>
{% endif %}

</div>

</div>

{% endfor %}

</div>
</div>
</details>

{% endfor %}

</div>
</main>