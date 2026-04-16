---
layout: default
title: IAGRG Council
---

<header class="member-hero">
  <div class="container">
    <h1>IAGRG Council</h1>
    <p>The elected council overseeing the activities and governance of IAGRG.</p>
  </div>
</header>

<main class="container">

  <h2 class="section-title">
    Current Office Bearers ({{ site.data.council.current.term }})
  </h2>

  <div class="leadership-grid">

    <div class="leader-card">
        <span class="leader-role">President</span>
        <h3 class="leader-name">{{ site.data.council.current.president.name }}</h3>
        {% if site.data.council.current.president.institution %}
            <p class="leader-inst">
            {{ site.data.council.current.president.institution }}
            </p>
        {% endif %}

</div>

    <div class="leader-card">
        <span class="leader-role">Secretary</span>
        <h3 class="leader-name">{{ site.data.council.current.secretary.name }}</h3>
        {% if site.data.council.current.secretary.institution %}
            <p class="leader-inst">
            {{ site.data.council.current.secretary.institution }}
            </p>
        {% endif %}

</div>

  </div>

<h2 class="members-heading">Council Members</h2>

<div class="members-grid">

{% for member in site.data.council.current.members %}

  <div class="member-mini-card">

    <strong>{{ member.name }}</strong>

    {% if member.institution %}
      <span>{{ member.institution }}</span>
    {% endif %}

    {% if member.exofficio %}
      <em>Ex Officio</em>
    {% endif %}

  </div>

{% endfor %}

</div>

  <hr class="section-divider">

  <h2 class="section-title">Past Office Bearers Archive</h2>

  <div class="archive-container">

    {% for term in site.data.council.archive %}

    <details {% if forloop.first %}open{% endif %}>
      <summary>Term: {{ term.term }}</summary>

      <div class="term-content">

        {% if term.leadership %}
          {% for row in term.leadership %}
          <div class="term-leadership">
            <div>
              <strong>{{ row.label }}</strong> {{ row.text }}
            </div>
          </div>
          {% endfor %}
        {% endif %}

        {% if term.members %}
        <ul class="term-members">
          {% for member in term.members %}
          <li>{{ member }}</li>
          {% endfor %}
        </ul>
        {% endif %}

      </div>
    </details>

    {% endfor %}

  </div>

</main>
