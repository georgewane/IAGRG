---
layout: award
title: Vaidya–Raychaudhuri Endowment Lecture Awards
subtitle: Recognising excellence in research and teaching of General Relativity and its applications
---

Instituted as a tribute to two doyens of Indian relativity research,
**P. C. Vaidya** and **A. K. Raychaudhuri**, this distinguished lecture
recognises exceptional contributions in both research and teaching of
General Relativity and its applications to astrophysics and cosmology.

The awardee is invited to deliver the Vaidya–Raychaudhuri Lecture,
traditionally designed to be accessible to the wider gravitation community.

The first lecture was delivered at the **15th IAGRG Meeting in 1989**,
and it has remained an integral part of IAGRG activities ever since.

Since the **26th IAGRG Meeting in 2011**, the lecture has been held annually:
during IAGRG meetings in alternate years, and between meetings at venues
decided by the General Body Meeting.

---

## Lecture Archive

<div class="vr-archive">

{% for period in site.data.vr_lectures %}

<details {% if forloop.first %}open{% endif %}>
<summary>{{ period.decade }}</summary>

<div class="vr-details-content">

<div class="vr-grid">

{% for lecture in period.lectures %}

<div class="vr-card">

<div class="vr-number">#{{ lecture.number }}</div>

<h3>{{ lecture.speaker }}</h3>

<p class="vr-meta">
<strong>Year:</strong> {{ lecture.date }}<br>
<strong>Venue:</strong> {{ lecture.venue }}
</p>

<p class="vr-title">
{{ lecture.title }}
</p>

{% if lecture.link %}
<a href="{{ lecture.link }}" class="vr-link">Read More →</a>
{% endif %}

</div>

{% endfor %}

</div>
</div>
</details>

{% endfor %}

</div>
