<template>
  <div>
    <header>
      <nuxt-link :to="{name: 'index'}" title="Home">
        <img src="~/assets/iati3w-icon.png" class="logo" />
      </nuxt-link>
      <h1>
        IATI/3W explorer
      </h1>
      <nav id="primary-nav" class="tabs">
        <nuxt-link :to="{name: 'orgs'}" title="Organisations involved in activites in Somalia.">Who?</nuxt-link>
        <nuxt-link :to="{name: 'sectors'}" title="Aid sectors active in Somalia.">What?</nuxt-link>
        <nuxt-link :to="{name: 'locations'}" title="Locations active in Somalia.">Where?</nuxt-link>
        <a class="active">About</a>
      </nav>
    </header>
    <nuxt />
  </div>
</template>

<style>
body {
    font-family: sans-serif;
}

img.logo {
    height: 2ex;
}

header {
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    height: 3ex;
    padding: 1ex;
    width: 100vw;
    background: #ffffff;
    border-bottom: 1px solid #add8e6;
}

header h1 {
    font-size: 80%;
    padding-left: .5em;
}

header nav {
    font-size: 80%;
    flex-grow: 1.1;
    text-align: right;
    padding-right: 2em;
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
  margin-top:60px;
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
