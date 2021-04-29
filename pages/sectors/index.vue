<template>
  <div class="container">
    <main v-if="busy!=true">
      <nav class="secondary">
        <a href="#humanitarian">Humanitarian</a>
        <a href="#dac">OECD</a>
      </nav>
      <h2>Aid clusters and sectors in Somalia</h2>
      <section id="content">
        <section id="humanitarian">
          <h3>Humanitarian clusters and areas of concern</h3>
          <div class="inline-list">
            <Sector
              v-for="sector_name in Object.keys(sectors.humanitarian).sort()"
              :name="sector_name"
              type="humanitarian"
              :org_count="flatten(sectors.humanitarian[sector_name].orgs).length"
              :activity_count="flatten(sectors.humanitarian[sector_name].activities).length" />
          </div>
        </section>
        <section id="dac">
          <h3>OECD-DAC purposes</h3>
          <div class="inline-list">
            <Sector
              v-for="sector_name in Object.keys(sectors.dac).sort()"
              :name="sector_name"
              type="dac"
              :org_count="flatten(sectors.dac[sector_name].orgs).length"
              :activity_count="flatten(sectors.dac[sector_name].activities).length" />
          </div>
        </section>
      </section>
    </main>
  </div>
</template>
<script>
import Sector from '~/components/sector.vue'
export default {
  data() {
    return {
      sectors: [],
      busy: true
    }
  },
  components: {
    Sector
  },
  methods: {
    loadSectors() {
      this.$axios
        .get(`sector-index.json`)
        .then(response => {
          this.sectors = response.data
          this.busy = false
        })
    },
    flatten(items) {
      return this.$options.filters.flatten(
        items
      )
    }
  },
  mounted() {
    this.loadSectors()
  }
}
</script>
