---
layout: default
title: V. V. Narlikar Best Thesis Award
---

<link rel="stylesheet" href="{{ '/assets/css/style-awards.css' | relative_url }}">

<header class="award-hero">
  <div class="container">
    <p class="award-kicker">IAGRG Awards</p>

    <h1>V. V. Narlikar Best Thesis Award</h1>

    <p class="award-subtitle">
      Recognising outstanding doctoral research in gravitation and related areas
    </p>
  </div>
</header>

<!-- ABOUT SECTION -->
<section class="archive-container">

  <details class="about-block" open>
    <summary class="about-summary">About this Award</summary>

    <div class="about-content">

      <p>
        The <strong>V. V. Narlikar Best Thesis Award</strong> recognises
        outstanding doctoral research carried out at universities in India
        in the areas of General Relativity, Gravitation, and related fields.
      </p>

      <p>
        The award traces its origin to a proposal made at the
        <strong>20th General Body Meeting of IAGRG</strong>, held on
        20 January 1999 at D.D.U. Gorakhpur University, to institute a prize
        for exceptional PhD theses.
      </p>

      <p>
        Subsequently, the IAGRG Council resolved to encourage thesis
        presentations at future meetings, inviting recent PhD recipients
        in Mathematics and Physics whose work related to gravitation
        and allied areas.
      </p>

      <p>
        The recipient would be selected by a panel of referees on the basis
        of scholarly quality and presentation.
      </p>

      <p>
        Following a suggestion by <strong>Prof. P. C. Vaidya</strong>,
        the prize was named the
        <strong>Professor V. V. Narlikar Award for Best Thesis in GRG and Related Areas</strong>,
        in honour of one of India’s distinguished scientific figures.
      </p>

      <p>
        The first award was conferred for the block <strong>1997–2000</strong>,
        and it continues to celebrate excellence in young research scholarship.
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

      {% for item in site.data.vvn_awards %}

      <article class="award-card thesis-card">

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

      </article>

      {% endfor %}

    </div>

  </div>

</section>