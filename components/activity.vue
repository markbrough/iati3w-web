<template>
  <div class="item">
    <nuxt-link
      :title="activity.title"
      :to="{name: 'activities-identifier', params: { identifier: activity.identifier }}">
      {{ activity.title | truncate }}
    </nuxt-link>
    <span class="info"><b>Who:</b> {{ activity.orgs | join | truncate }}</span>
    <span class="info"><b>Where:</b> {{ activity.locations | join | truncate }}</span>
    <span class="info"><b>Source:</b> {{ activity.source }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return { }
  },
  props: {
    activity: Object,
    root: {
      type: String,
      default: ".."
    }
  }
}
</script>