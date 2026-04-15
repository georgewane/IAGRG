---
layout: award
title: V. V. Narlikar Best Thesis Award
subtitle: Recognising outstanding doctoral research in gravitation and related areas
---

The **V. V. Narlikar Best Thesis Award** recognises outstanding doctoral
research carried out at universities in India in the areas of
General Relativity, Gravitation, and related fields.

The award traces its origin to a proposal made at the
**20th General Body Meeting of IAGRG**, held on 20 January 1999 at
D.D.U. Gorakhpur University, to institute a prize for exceptional PhD theses.

Subsequently, the IAGRG Council resolved to encourage thesis presentations
at future meetings, inviting recent PhD recipients in Mathematics and Physics
whose work related to gravitation and allied areas.

The recipient would be selected by a panel of referees on the basis of
scholarly quality and presentation.

Following a suggestion by **Prof. P. C. Vaidya**, the prize was named the
**Professor V. V. Narlikar Award for Best Thesis in GRG and Related Areas**,
in honour of one of India’s distinguished scientific figures.

The first award was conferred for the block **1997–2000**, and it continues
to celebrate excellence in young research scholarship.

---

## Award Archive

<div class="award-grid">

{% for item in site.data.vvn_awards %}

<div class="award-card thesis-card">

<div class="award-badge">{{ item.block }}</div>

<h3>{{ item.winner }}</h3>

{% if item.affiliation != "" %}

<p class="award-meta">{{ item.affiliation }}</p>
{% endif %}

<p class="thesis-title">
{{ item.thesis }}
</p>

<p class="submitted-to">
<strong>Submitted to:</strong><br>
{{ item.university }}
</p>

</div>

{% endfor %}

</div>
