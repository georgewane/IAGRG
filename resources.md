---
layout: default
title: Resources for Researchers
---

<link rel="stylesheet" href="{{ '/assets/css/style-resources.css' | relative_url }}">

<header class="resources-header">
  <div class="container">
    <h1>Knowledge Hub</h1>
    <p>
      Curated software, databases, and literature to accelerate your
      research in general relativity and cosmology.
    </p>
  </div>
</header>

<section class="resources-page container">

  <section class="knowledge-hero-image">

    <figure class="hub-figure">
      <img
        src="{{ '/assets/img/mega-science_banner_smaller.webp' | relative_url }}"
        alt="From micro to macro: understanding the universe through mega science projects"
      >

      <figcaption>
        Visual courtesy of <strong>Vigyan Samagam</strong>
      </figcaption>
    </figure>

  </section>

{% assign categorized_resources = site.data.resources | group_by: "category" %}

{% for category in categorized_resources %}

  <section class="resource-section">

    <h2 class="category-title">{{ category.name }}</h2>

    <div class="resource-grid">

      {% for resource in category.items %}

      <a href="{{ resource.url }}"
         class="resource-card"
         target="_blank"
         rel="noopener noreferrer">

        <div class="resource-header">

          <h3 class="resource-title">{{ resource.title }}</h3>

          <div class="tag-container">
            <span class="badge badge-level">{{ resource.level }}</span>

            {% for tag in resource.tags %}
            <span class="badge">{{ tag }}</span>
            {% endfor %}
          </div>

        </div>

        <p class="resource-desc">{{ resource.description }}</p>

        <span class="resource-link-text">
          Access Resource →
        </span>

      </a>

      {% endfor %}

    </div>

  </section>

{% endfor %}

</section>
