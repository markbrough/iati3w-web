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
              class="mb-4"
              :colors="sectorColors" />
          </client-only>
          <div class="inline-list">
            <Sector
              v-for="stub in Object.keys(sectors.humanitarian).sort()"
              :key="stub"
              :name="sectors.humanitarian[stub].name"
              :stub="stub"
              type="humanitarian"
              :org_count="flatten(sectors.humanitarian[stub].orgs[source]).length"
              :activity_count="sectors.humanitarian[stub].activities.filter(activity => checkSource(activity)).length" />
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
      busy: true,
      sectorColors: {
        'Water Sanitation Hygiene': '#CF3D1E',
        'Health': '#F15623',
        'Protection': '#F68B1F',
        '(No corresponding humanitarian cluster)': '#FFC60B',
        'Nutrition': '#DFCE21',
        'Food Security': '#BCD631',
        'Education': '#95C93D',
        'Shelter/ NFI': '#48B85C',
        'Camp Coordination / Management': '#00833D',
        'Early Recovery': '#00B48D',
        'Emergency Shelter and NFI': '#60C4B1',
        'Logistics': '#27C4F4',
        'Emergency Telecommunications': '#478DCB',
        'Gender Based Violence': '#3E67B1',
        'Child Protection': '#4251A3',
        'Housing, Land and Property': '#59449B',
        'Mine Action': '#6E3F7C'
      }
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
    },
    checkSource(activity) {
      if (this.source == 'all') {
        return true
      } else if ((this.source == '3w') && (activity.length == 8)) {
        return true
      } else if ((this.source == 'iati') && (activity.length != 8)) {
        return true
      }
      return false
    }
  },
  computed: mapState(['sectors', 'source']),
  async mounted() {
    await this.$store.dispatch('loadSectors')
    this.busy = false
  }
}
</script>
