---
layout: default
title: N. R. Sen Young Researcher Award
---

<link rel="stylesheet" href="{{ '/assets/css/style-awards.css' | relative_url }}">

<header class="award-hero">
  <div class="container">
    <p class="award-kicker">IAGRG Awards</p>

    <h1>N. R. Sen Young Researcher Award</h1>

    <p class="award-subtitle">
      Recognising outstanding early-career contributions in gravitational physics
    </p>
  </div>
</header>

<!-- ABOUT SECTION -->
<section class="archive-container">

  <details class="about-block" open>
    <summary class="about-summary">About this Award</summary>

    <div class="about-content">

      <p>
        The <strong>N. R. Sen Young Researcher Award</strong> recognises young
        researchers for outstanding contributions to gravitational physics.
      </p>

      <p>
        The award was instituted at the <strong>27th General Body Meeting of IAGRG</strong>,
        held on 8 March 2013 at HNB Garhwal University, Srinagar.
      </p>

      <p>
        The IAGRG Council was entrusted with naming the award and framing the
        nomination and selection procedures.
      </p>

      <p>
        The award carries an honorarium and citation, and the recipient is
        typically invited to participate in the IAGRG meeting and deliver a lecture.
      </p>

      <p>
        This honour reflects IAGRG’s commitment to encouraging promising young
        scientists and recognising excellence at an early career stage.
      </p>

    </div>
  </details>

</section>

<!-- ARCHIVE SECTION -->
<section class="archive-container">

  <div class="archive-card">

    <div class="archive-header">
      <h2>Award Archive</h2>
    </div>

    <div class="award-grid">

      {% for item in site.data.nrsen_awards %}

      <article class="award-card">

        <div class="award-badge">{{ item.year }}</div>

        <h3>{{ item.winner }}</h3>

        <p class="award-meta">{{ item.affiliation }}</p>

        <p class="citation-text">
          {{ item.citation }}
        </p>

      </article>

      {% endfor %}

    </div>

  </div>

</section>