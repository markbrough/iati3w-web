<template>
  <div class="container">
    <main v-if="busy">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner variant="secondary" label="Loading..."></b-spinner>
      </div>
    </main>
    <main v-else>
      <h1>Sectors in Somalia</h1>
      <section id="content">
        <section id="humanitarian">
          <client-only>
            <Treemap
              :data="sectors.humanitarian"
              type="humanitarian"
              class="mb-4" />
          </client-only>
          <div class="inline-list">
            <Sector
              v-for="stub in Object.keys(sectors.humanitarian).sort()"
              :key="stub"
              :name="sectors.humanitarian[stub].name"
              :stub="stub"
              type="humanitarian"
              :org_count="flatten(sectors.humanitarian[stub].orgs).length"
              :activity_count="sectors.humanitarian[stub].activities.length" />
          </div>
        </section>
      </section>
      <b-alert variant="light" show>The sectors shown above are derived from humanitarian
      clusters. Most activities published to IATI use OECD DAC CRS purpose codes
      rather than humanitarian clusters. These have been mapped to the above
      clusters. Note that this includes both humanitarian and development
      activities.</b-alert>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Sector from '~/components/sector.vue'
import Treemap from '~/components/treemap.vue'
export default {
  data() {
    return {
      busy: true
    }
  },
  components: {
    Sector, Treemap
  },
  methods: {
    flatten(items) {
      return this.$options.filters.flatten(
        items
      )
    }
  },
  computed: mapState(['sectors']),
  async mounted() {
    await this.$store.dispatch('loadSectors')
    this.busy = false
  }
}
</script>
