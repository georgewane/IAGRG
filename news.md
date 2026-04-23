---
layout: default
title: News & Announcements
---

<link rel="stylesheet" href="{{ '/assets/css/style-news.css' | relative_url }}">

<header class="news-header">
  <div class="container">
    <h1>News & Announcements</h1>

    <p class="news-subtitle">
      Latest updates, conference alerts, and job opportunities
      from the IAGRG community.
    </p>

  </div>
</header>

<section class="news-page container">

  <div class="filter-tabs">
    <button class="filter-tab active" data-filter="all">All</button>
    <button class="filter-tab" data-filter="job">Jobs</button>
    <button class="filter-tab" data-filter="conference">Conferences</button>
    <button class="filter-tab" data-filter="news">News</button>
    <button class="filter-tab" data-filter="wgg">WGG</button>
  </div>

  <div class="news-feed">

    {% for post in site.posts %}
    <article class="news-card" data-category="{{ post.category }}">

      <div class="news-meta">

        <span class="badge badge-{{ post.category }}">
        {% case post.category %}
          {% when "job" %}Jobs
          {% when "conference" %}Conferences
          {% when "news" %}News
          {% when "wgg" %}WGG
        {% endcase %}
        </span>

        <span class="news-date">
          {{ post.date | date: "%b %d, %Y" }}
        </span>

      </div>

      <h2 class="news-title">
<<<<<<< HEAD
        <a href="{{ post.url | relative_url}}">{{ post.title }}</a>
=======
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
>>>>>>> redesign
      </h2>

      <p class="news-excerpt">
        {{ post.excerpt | strip_html | truncatewords: 34 }}
      </p>

<<<<<<< HEAD
      <a href="{{ post.url | relative_url}}" class="read-more">Read More →</a>
=======
      <a href="{{ post.url | relative_url }}" class="read-more">Read More →</a>
>>>>>>> redesign

    </article>
    {% endfor %}

  </div>

</section>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".news-card");

tabs.forEach(tab => {
tab.addEventListener("click", () => {
tabs.forEach(t => t.classList.remove("active"));
tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        card.style.display =
          filter === "all" || card.dataset.category === filter
          ? ""
          : "none";
      });
    });

});
});
</script>
