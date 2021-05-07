<template>
  <div class="item">
    <nuxt-link :to="{name: 'sectors-type-stub', params: { type: type, stub: stub }}">{{ name }}</nuxt-link>
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
    stub: String,
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