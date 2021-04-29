<template>
  <div class="item">
    <nuxt-link :to="{name: 'sectors-type-sectorname', params: { type: type, sectorname: name }}">{{ name }}</nuxt-link>
    <template v-if="org_count > -1">
      <span class="info">{{ org_count | plural("organisation", "organisations") }}</span>
    </template>
    <template v-if="activity_count > -1">
      <span class="info">{{ activity_count | plural("activity", "activities") }}</span>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return { }
  },
  props: {
    name: String,
    type: String,
    org_count: {
      type: Number,
      default: -1
    },
    activity_count: {
      type: Number,
      default: -1
    }
  }
}
</script>