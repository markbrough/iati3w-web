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
            :to="{name: 'sectors', hash: '#humanitarian'}"
          >Humanitarian</nuxt-link>
        <nuxt-link
            :to="{name: 'sectors', hash: '#dac'}"
          >OECD</nuxt-link>
      </nav>
      <h1>Aid clusters and sectors in Somalia</h1>
      <section id="content">
        <section id="humanitarian">
          <h3>Humanitarian clusters and areas of concern</h3>
          <div class="inline-list">
            <Sector
              v-for="stub in Object.keys(sectors.humanitarian).sort()"
              :key="stub"
              :name="sectors.humanitarian[stub].name"
              :stub="stub"
              type="humanitarian"
              :org_count="flatten(sectors.humanitarian[stub].orgs).length"
              :activity_count="flatten(sectors.humanitarian[stub].activities).length" />
          </div>
        </section>
        <section id="dac">
          <h3>OECD-DAC purposes</h3>
          <div class="inline-list">
            <Sector
              v-for="stub in Object.keys(sectors.dac).sort()"
              :key="stub"
              :name="sectors.dac[stub].name"
              :stub="stub"
              type="dac"
              :org_count="flatten(sectors.dac[stub].orgs).length"
              :activity_count="flatten(sectors.dac[stub].activities).length" />
          </div>
        </section>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Sector from '~/components/sector.vue'
export default {
  data() {
    return {
      busy: true
    }
  },
  components: {
    Sector
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
