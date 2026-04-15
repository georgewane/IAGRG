---
layout: default
title: Famous Indian Relativists
---

<link rel="stylesheet" href="{{ '/assets/css/style-relativists.css' | relative_url }}">

<header class="relativists-hero">
  <div class="container">
    <h1>Famous Indian Relativists</h1>
    <p>
      Honouring the pioneering minds who shaped the development of
      General Relativity, Cosmology, Gravitation, and Astrophysics in India.
    </p>
  </div>
</header>

<main class="container">

  <section class="legacy-intro">
    <p>
      From foundational mathematics to black holes, cosmology,
      and gravitational collapse, these scholars helped build India’s
      distinguished tradition in relativity research.
    </p>
  </section>

<section class="relativists-grid">

{% for person in site.data.relativists %}

<article class="relativist-card">

  <div class="card-topline"></div>

  <div class="card-inner">

    <!-- LEFT -->
    <div class="left-column">
      <div class="relativist-photo-slot">
        {% if person.image %}
          <img src="{{ person.image | relative_url }}" alt="{{ person.name }}">
        {% else %}
          <img src="{{ '/assets/img/dummy-photo.png' | relative_url }}" alt="{{ person.name }}">
        {% endif %}
      </div>
    </div>

    <!-- RIGHT -->
    <div class="right-column">

      <div class="header-text">
        <h2>{{ person.name }}</h2>
        <span class="lifespan">{{ person.lifespan }}</span>
      </div>

      <div class="interest-area">
        {{ person.interest }}
      </div>

      <p class="bio">
        {{ person.bio }}
      </p>

      <div class="works-block">
        <h3>Key Contributions</h3>

        <ul class="works-list">
          {% for work in person.works %}
            <li>{{ work }}</li>
          {% endfor %}
        </ul>
      </div>

    </div>

  </div>

</article>

{% endfor %}

</section>

</main>
