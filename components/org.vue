<template>
  <div class="item">
    <nuxt-link :title="org.info.name" :to="{name: 'orgs-orgname', params: { orgname: org.info.shortname }}">{{ org.info.shortname | truncate }}</nuxt-link>
    <span class="info"><b>Source:</b> {{ org.sources | join }}</span>
    <span class="info">{{ activity_count | plural("activity", "activities") }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return { }
  },
  props: {
    org: Object,
    activity_count: Number,
    root: {
      type: String,
      default: ".."
    }
  }
}
</script>