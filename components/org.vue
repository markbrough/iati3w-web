<template>
  <div class="item">
    <nuxt-link :title="org.info.stub" :to="{name: 'orgs-stub', params: { stub: org.info.stub }}">{{ org.info.name }}</nuxt-link>
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
    activity_count: Number
  }
}
</script>