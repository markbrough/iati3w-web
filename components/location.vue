<template>
  <div class="item">
    <LocationLink
      :name="name"
      :type="type"
      :root="root" />
    <span class="info" v-if="org_count > -1">
      {{ org_count | plural("organisation", "organisations") }}
    </span>
    <span class="info" v-if="activity_count > -1">
      {{ activity_count | plural("activity", "activities") }}
    </span>
  </div>
</template>
<script>
import LocationLink from '~/components/location_link.vue'
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
    },
    root: {
      type: String,
      default: ".."
    }
  },
  components: {
    LocationLink
  }
}
</script>