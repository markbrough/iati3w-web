<template>
  <div class="container">
    <main v-if="busy!=true">
      <section id="content">
        <nav class="secondary">
          <nuxt-link
            :to="{name: 'sectors-type-stub', params: { type: sector_type, stub: stub }, hash: '#orgs'}"
          >Organisations</nuxt-link>
          <nuxt-link
            :to="{name: 'sectors-type-stub', params: { type: sector_type, stub: stub }, hash: '#locations'}"
          >Locations</nuxt-link>
          <nuxt-link
            :to="{name: 'sectors-type-stub', params: { type: sector_type, stub: stub }, hash: '#activities'}"
          >Activities</nuxt-link>
        </nav>
        <h2>{{ sector_type | sector }}: {{ sector_name }}</h2>
        <section id="orgs">
          <h3>Organisations working in {{ sector_name }}</h3>
          <section :id="`orgs.${ scope }`"
            v-for='scope in ["local", "regional", "international", "unknown"]'
            :key="scope"
            v-if="Object.keys(sector.orgs[scope]).length > 0">
            <h4>{{ scope | scope | capitalize }}s</h4>
            <div class="inline-list">
              <Org
                v-for="org_name in Object.keys(sector.orgs[scope]).sort()"
                :key="org_name"
                :org="orgs[org_name]"
                :activity_count="sector.orgs[scope][org_name]" />
            </div>
          </section>
        </section>
        <section id="locations">
          <h3>Where {{ sector_name }} is active</h3>
          <section
            v-for="region_name in Object.keys(sector.locations.admin1).sort()"
            :key="region_name">
            <h4>{{ locations.admin1[region_name].info.name }}</h4>
            <div class="inline-list">

              <Location
                v-for="district_name in Object.keys(sector.locations.admin2).sort()"
                :key="district_name"
                :name="locations.admin2[district_name].info.name"
                :stub="district_name"
                type="admin2"
                :activity_count="sector.locations.admin2[district_name]" />
            </div>
          </section>
          <p class="warning" v-if="Object.keys(sector.locations.admin1).length == 0">No location information available for {{ sector_name }}.</p>
        </section>
        <section id="activities">
          <h3>Activities related to {{ sector_name }} ({{ sector.activities | length }})</h3>
          <div class="inline-list wide">
            <Activity
              v-for="activity_id in sector.activities"
              :key="activity_id"
              :activity="activities[activity_id]" />
          </div>
        </section>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Org from '~/components/org.vue'
import Location from '~/components/location.vue'
import Activity from '~/components/activity.vue'
export default {
  data() {
    return {
      busy: true,
      sector: {}
    }
  },
  components: {
    Org, Location, Activity
  },
  methods: {
    flatten(items) {
      return this.$options.filters.flatten(
        items
      )
    }
  },
  computed: {
    sector_type() {
      return this.$route.params.type
    },
    sector_name() {
      return this.sectors[this.sector_type][this.stub].name
    },
    stub() {
      return this.$route.params.stub
    },...mapState(['sectors', 'orgs', 'activities', 'locations'])
  },
  async mounted() {
    await this.$store.dispatch('loadSectors')
    await this.$store.dispatch('loadOrgs')
    await this.$store.dispatch('loadActivities')
    await this.$store.dispatch('loadLocations')
    this.sector = this.sectors[this.$route.params.type][this.$route.params.stub]
    this.busy = false
  }
}

</script>
