---
layout: default
title: Working Group on Gender
---

<link rel="stylesheet" href="/assets/css/style-wgg.css">

<header class="wgg-header">
  <div class="container">
    <p class="wgg-kicker">IAGRG Community Initiative</p>

    <h1>Working Group on Gender</h1>

    <p class="wgg-subtitle">
      Advancing a more equitable, gender-sensitive, and inclusive
      environment within the gravitation and cosmology community.
    </p>

  </div>
</header>

<section class="wgg-page container">

  <!-- Banner -->

  <section class="wgg-banner">
    <img
      src="/assets/img/gwg1.png"
      alt="Working Group on Gender banner"
    >
  </section>

  <!-- About + Updates -->

  <section class="wgg-split">

    <!-- Left Column -->

    <article class="wgg-row">

      <div class="wgg-accent"></div>

      <div class="wgg-content">

        <h2>About the Initiative</h2>

        <p>
          The Indian Association for General Relativity and Gravitation
          announced the first Working Group on Gender (WGG-IAGRG) on
          Women’s Day 2023.
        </p>

        <p>
          The group was formed to help guide the community toward a more
          equitable, gender-sensitive, and inclusive academic environment.
        </p>

        <p>
          WGG seeks to strengthen participation, support structures,
          dialogue, and institutional awareness across the community.
        </p>

      </div>

    </article>

    <!-- Right Column -->

    <aside class="recent-updates">

      <h3 class="section-heading">Latest WGG Updates</h3>

      <div class="update-cards">

        {% assign wgg_posts = site.posts | where: "category", "wgg" %}

        {% for post in wgg_posts limit:3 %}

        <a href="{{ post.url }}" class="update-card">

          <span class="badge badge-news">
            Update
          </span>

          <h4>{{ post.title }}</h4>

          <span class="update-date">
            {{ post.date | date: "%b %d, %Y" }}
          </span>

          <span class="read-link">
            Read More →
          </span>

        </a>

        {% endfor %}

      </div>

    </aside>

  </section>

  <!-- Committee Archive -->

  <section class="wgg-section">

    <div class="section-heading">

      <h2>Committee Archive</h2>

      <p>
        Members of the Working Group across terms.
      </p>

    </div>

    {% for committee in site.data.wgg.committees %}

    <details class="wgg-collapse" {% if committee.open %}open{% endif %}>

      <summary>{{ committee.year }} Committee</summary>

      <div class="committee-grid">

        {% for person in committee.members %}

        <div class="member-chip">

          <strong>{{ person.name }}</strong>

          {% if person.role %}
          <span>{{ person.role }}</span>
          {% endif %}

        </div>

        {% endfor %}

      </div>

    </details>

    {% endfor %}

  </section>

</section>
