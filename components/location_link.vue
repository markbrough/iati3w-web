<template>
  <nuxt-link :to="{name: 'locations-type-stub', params: { stub: stub, type: type }}">
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
    stub: String,
    type: String
  }
}
</script>