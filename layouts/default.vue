<template>
  <div class="d-flex flex-column h-100">
    <b-navbar toggleable="lg" type="light" variant="light" class="navbar-primary" sticky>
      <b-navbar-brand :to="{name: 'index'}" title="Home">
        <img src="~/assets/iati3w-icon.png" class="logo" />
        IATI/3W Explorer
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{name: 'organisations'}" title="Organisations involved in activites in Somalia." active-class="active" >Who?</b-nav-item>
          <b-nav-item :to="{name: 'sectors'}" title="Aid sectors active in Somalia." active-class="active" >What?</b-nav-item>
          <b-nav-item :to="{name: 'locations'}" title="Locations active in Somalia." active-class="active" >Where?</b-nav-item>
          <b-nav-item :to="{name: 'about'}" title="About the prototype IATI/3W explorer" active-class="active" >About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
    <footer class="mt-auto">
      <b-container>
        <b-row>
          <b-col md="6">
            Created by <a href="https://www.devinit.org/"
            target="_blank">Development Initiatives</a>, with funding
            from the <a
            href="https://www.government.nl/ministries/ministry-of-foreign-affairs"
            target="_blank">Netherlands Ministry of Foreign
            Affairs</a> on behalf of the <a
            href="https://interagencystandingcommittee.org/greater-transparency"
            target="_blank">Grand Bargain Transparency Workstream</a>
          </b-col>
          <b-col md="6" class="text-md-right">
            This site is a prototype. Quality and accuracy are not guaranteed.
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<style>
body {
    font-family: sans-serif;
}
footer {
  padding: 20px;
  background-color: #e9ecef;
}

img.logo {
    height: 2ex;
}
div#__nuxt, div#__layout {
  height: 100% !important;
  flex-direction: column !important;
  display: flex !important;
}

.navbar-primary {
    align-items: center;
    padding: 1ex;
    background: #ffffff;
    border-bottom: 1px solid #add8e6;
}



nav a {
    padding-left: 1em;
    text-decoration: none;
}

a.active {
    font-weight: bold;
}

nav.secondary {
    display: flex;
    font-size: 80%;
}

nav.secondary a {
    font-size: 80%;
    text-decoration: none;
    font-style: italic;
    padding: 0 2em 0 0;
}

main {
  margin-top: 40px;
  margin-bottom: 40px;
  word-wrap: break-word;
}

main h2 {
    font-size: 172.8%;
}

main h3 {
    font-size: 144%;
    font-weight: normal;
}

main h4 {
    font-size: 120%;
    font-weight: normal;
}

.pre {
    white-space: pre-wrap;
}

#activity-list li {
    margin-bottom: 2ex;
}

.info {
    display: block;
    font-size: 69.5%;
}

.inline-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.inline-list .item {
    width: 15em;
    margin: 0 1em 1em 1em;
}

.inline-list.wide .item {
    width: 32em;
}

dl {
    display: grid;
    grid-template-columns: 10em auto;
}

dt {
    grid-column: 1;
    text-align: right;
    font-size: 83.333333%;
    font-weight: bold;
}

dd {
    grid-column: 2;
    margin-bottom: 2ex;
}

ul li {
    margin-bottom: 1ex;
}

.fixture {
    text-decoration: underline;
    margin-bottom: .5ex;
    color: #333333;
    font-size: 83.333333%
}

h2 {
    margin-top: 0;
    font-size: 120%;
}

#map {
    width: 100vw;
    height: 50vh;
}
</style>
