---
layout: default
title: Home
---

<!-- HERO -->
<section class="hero-immersive" style="background-image: url('/assets/img/eht-hero.jpg');">
  <div class="hero-gradient">
    <div class="hero-content container">

      <span class="hero-kicker">
        Indian Association for General Relativity and Gravitation
      </span>

      <h1 class="hero-title">
        Advancing the Frontier of Spacetime.
      </h1>

      <p class="hero-subtitle">
        Promoting interest in gravitation and facilitating collaborative research
        across India since 1969.
      </p>

      <div class="hero-actions">
        <a href="/members" class="btn-solid">Meet Our Members</a>
        <a href="/resources" class="btn-outline-light">Explore Resources</a>
      </div>

    </div>

  </div>
</section>

<!-- MAIN SECTION -->
<section class="home-main-section bg-light">
  <div class="container grid-layout">

    <!-- LEFT COLUMN -->
    <main class="mission-column">

      <!-- Mission -->
      <section class="mission-statement">

  <h2>Our History & Mission</h2>

  <p class="lead-text">
    The aim of IAGRG is to promote interest in the phenomena related to
    Gravitation and to facilitate research in related areas.
  </p>

  <p>
    In February 1969, Indian relativists met for the first time in a conference
    in Ahmedabad. It was organized to honour and felicitate one of the pioneers
    of relativity and gravitation research in India,
    <strong>Professor V. V. Narlikar</strong>,
    on attaining 60 years of age.
  </p>

  <p>
    At this historic meeting,
    <strong>Professor P. C. Vaidya</strong>
    proposed the formation of a society of Indian relativists. Thus, IAGRG was
    born, with Professor V. V. Narlikar serving as the founder President.
  </p>

  <p>
    Today, the association connects institutions and scholars across India,
    supports meetings and schools, shares opportunities, and helps sustain a
    vibrant scientific community in gravitation, cosmology, and astrophysics.
  </p>

<a href="/about" class="read-link">Learn More →</a>

</section>
      <!-- Compact Latest Updates -->
      <section class="mini-updates">

        <div class="updates-head">
          <h3>Latest IAGRG News</h3>
          <a href="/news">View All →</a>
        </div>

        <div class="mini-updates-list">

          {% assign latest_news = site.posts | where: "category", "news" %}

          {% for post in latest_news limit:4 %}
          <a href="{{ post.url }}" class="mini-update-item">

            <span class="update-date">
              {{ post.date | date: "%b %d, %Y" }}
            </span>

            <span class="update-title">
              {{ post.title }}
            </span>

          </a>
          {% endfor %}

        </div>

      </section>

    </main>


    <!-- RIGHT COLUMN -->
    <aside class="recent-updates">

      <h3 class="section-heading">Latest Opportunities</h3>

      <div class="update-cards">

        {% assign opportunities = site.posts | where_exp: "post", "post.category != 'news'" %}

        {% for post in opportunities limit:3 %}
        <a href="{{ post.url }}" class="update-card">

          <span class="badge badge-{{ post.category }}">
            {% case post.category %}
              {% when "job" %}Job
              {% when "conference" %}Conference
            {% endcase %}
          </span>

          <h4>{{ post.title }}</h4>

          <span class="update-date">
            {{ post.date | date: "%b %d, %Y" }}
          </span>

          <span class="read-link">Read More →</span>

        </a>
        {% endfor %}

      </div>

    </aside>

  </div>
</section>
