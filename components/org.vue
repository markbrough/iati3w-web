<template>
  <b-card>
    <nuxt-link :title="org.info.stub" :to="{name: 'orgs-stub', params: { stub: org.info.stub }}">{{ org.info.name }}<template v-if="org.info.shortname!=org.info.name"> ({{ org.info.shortname }})</template></nuxt-link>
    <span class="info"><b>Source:</b> {{ org.sources | join }}</span>
    <span class="info">{{ activity_count | plural("activity", "activities") }}</span>
  </b-card>
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