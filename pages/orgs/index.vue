<template>
  <div class="container">
    <main v-if="busy">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner variant="secondary" label="Loading..."></b-spinner>
      </div>
    </main>
    <main v-else>
      <nav class="secondary">
        <nuxt-link
            :to="{name: 'orgs', hash: '#local'}"
        >Local and national actors</nuxt-link>
        <nuxt-link
            :to="{name: 'orgs', hash: '#regional'}"
        >Regional actors</nuxt-link>
        <nuxt-link
            :to="{name: 'orgs', hash: '#international'}"
        >International actors</nuxt-link>
        <nuxt-link
            :to="{name: 'orgs', hash: '#unknown'}"
        >Undetermined actors</nuxt-link>
      </nav>
      <h1>Aid organisations active in Somalia</h1>
      <!--
      <div id="map">
        Loading map...
      </div>
      -->
      <p>
        The following organisations are associated with 3W and IATI
        activities from 2020 onwards.
      </p>
      <OrgsList
        :orgs="orgs" />
    </main>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import OrgsList from '~/components/orgs_list.vue'
export default {
  data() {
    return {
      busy: true
    }
  },
  components: {
    OrgsList
  },
  computed: mapState(['orgs']),
  methods: {
  },
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    this.busy = false
  }
}
</script>

<style>
</style>
