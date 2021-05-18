<template>
  <div class="container-fluid">
    <main>
      <client-only>
        <link rel="stylesheet" href="https://davidmegginson.github.io/network-demo/network-style.css"/>
        <form id="filter">
          <fieldset>
            <label>
              <input type="radio" name="source" value="3W"/>
              <span>3W</span>
            </label>
            <label>
              <input type="radio" name="source" value="IATI"/>
              <span>IATI</span>
            </label>
            <label>
              <input type="radio" name="source" value="Both" checked="checked"/>
              <span>Both</span>
            </label>
          </fieldset>
          <fieldset>
            <label>
              <input type="checkbox" name="humanitarian_only"/>
              Humanitarian only
            </label>
          </fieldset>
        </form>
        <svg xmlns="http://www.w3.org/2000/svg" id="network-diagram" width="1024" height="768"></svg>
      </client-only>
    </main>
  </div>
</template>

<script>

export default {
  components: {
  },
  head() {
    return {
      script: [
        {
          vmid: 'tiptemplate',
          type: 'template',
          innerHTML: '<div class="popup"><p><a target="_blank" href="https://iati-3w.humportal.org/organisations/{{ org.info.stub }}">{{ org.info.name }}</a>{% if org.info.name != org.info.shortname %} ({{ org.info.shortname }}){% endif %}</p><p>Scope: {{ org.info.scope }} </p></div>',
          body: true,
          id: 'tip-template'
        },
        {
          src: 'https://d3js.org/d3.v5.min.js'
        },
        {
          src: 'https://davidmegginson.github.io/network-demo/lib/d3-tip.js'
        },
        {
          src: 'https://davidmegginson.github.io/network-demo/lib/nunjucks.min.js'
        },
        {
          src: 'https://davidmegginson.github.io/network-demo/network-script.js'
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
    }
  }
}
</script>

<style scoped>
#filter {
  z-index: 1020;
  position: sticky;
  padding: 5px;
  height: auto;
  background: #e9ecef;
}
svg {
  top: 10ex;
  height: calc(100% - 10ex);
}
</style>
