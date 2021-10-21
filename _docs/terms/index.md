---
title: Terms
tags: 
 - terms
description: A quick lookup for terms and acronyms
permalink: /docs/terms/

# Provided here as an example
terms:
  - name: LLNL
    definition: Lawrence Livermore National Lab
  - name: RADIUSS
    definition: Rapid Application Development via an Institutional Universal Software Stack
---

<style>
.card-header {
  background-color: #005DAB;
}
</style>

# Terms

Search the glossary of terms! To add a term, add it to <a href="https://github.com/rse-ops/knowledge/tree/main/_data" target="_blank">this data file</a> or to the top of a docs page under a list of terms, each with a name and definition attribute.

<div class="row" style="padding-bottom:20px">
  <div class="col-md-12">
    <input type="text" id="myFilter" class="form-control" onkeyup="searchTerms()" placeholder="Search for card name...">
  </div>
</div>

<div class="card-columns" id="terms">
  {% for term in site.data.terms %}<div class="card">
      <div class="card-header d-sm-flex justify-content-sm-between align-items-sm-center">
      <div class="card-title">
       <a href="#" style="color:white" class="display-inline-block">
       <strong>{{ term.name }}</strong></a>
      </div>
      </div>
      <div class="card-footer bg-white d-flex justify-content-between">
      <div class="card-description">{{ term.definition }}</div></div></div>{% endfor %}
  {% for doc in site.docs %}{% if doc.terms %}{% for term in doc.terms %}<div class="card">
      <div class="card-header d-sm-flex justify-content-sm-between align-items-sm-center">
      <div class="card-title">
       <a href="#" style="color:white" class="display-inline-block">
       <strong>{{ term.name }}</strong></a>
      </div>
      </div>
      <div class="card-footer bg-white d-flex justify-content-between">
      <div class="card-description">{{ term.definition }}</div></div></div>{% endfor %}{% endif %}{% endfor %}
</div>

<script>
function searchTerms() {
  var input, filter, cards, cardContainer, title, i;
  input = document.getElementById("myFilter");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("terms");
  cards = cardContainer.getElementsByClassName("card");
  for (i = 0; i < cards.length; i++) {
    title = cards[i].querySelector(".card-title");
    desc = cards[i].querySelector(".card-description");
    if ((title.innerText.toUpperCase().indexOf(filter) > -1) || (desc.innerText.toUpperCase().indexOf(filter) > -1)) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}
</script>
