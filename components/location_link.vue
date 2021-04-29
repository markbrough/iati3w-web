<template>
  <nuxt-link :to="{name: 'locations-locationname', params: { locationname: name, type: type }}">
    {{ name }} {{ type | location | capitalize }}
  </nuxt-link>
</template>
<script>
export default {
  data() {
    return { }
  },
  props: {
    name: String,
    type: String,
    root: {
      type: String,
      default: ".."
    }
  }
}
</script>