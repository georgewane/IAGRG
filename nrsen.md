---
layout: award
title: N. R. Sen Young Researcher Award
subtitle: Recognising outstanding early-career contributions in gravitational physics
---

The **N. R. Sen Young Researcher Award** recognises young researchers for
outstanding contributions to gravitational physics.

The award was instituted at the **27th General Body Meeting of IAGRG**,
held on 8 March 2013 at HNB Garhwal University, Srinagar.

The IAGRG Council was entrusted with naming the award and framing the
nomination and selection procedures.

The award carries an honorarium and citation, and the recipient is
typically invited to participate in the IAGRG meeting and deliver a lecture.

This honour reflects IAGRG’s commitment to encouraging promising young
scientists and recognising excellence at an early career stage.

---

## Award Archive

<div class="award-grid">

{% for item in site.data.nrsen_awards %}

<div class="award-card">

<div class="award-badge">{{ item.year }}</div>

<h3>{{ item.winner }}</h3>

<p class="award-meta">{{ item.affiliation }}</p>

<p class="citation-text">
{{ item.citation }}
</p>

</div>

{% endfor %}

</div>
