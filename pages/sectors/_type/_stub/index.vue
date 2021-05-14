<template>
  <div class="container">
    <main v-if="busy">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner variant="secondary" label="Loading..."></b-spinner>
      </div>
    </main>
    <main v-else>
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
            <b-card-group columns>
              <Org
                v-for="org_name in Object.keys(sector.orgs[scope]).sort()"
                :key="org_name"
                :org="orgs[org_name]"
                :activity_count="sector.orgs[scope][org_name]" />
            </b-card-group>
          </section>
          <hr />
        </section>
        <section id="locations">
          <h3>Where {{ sector_name }} is active</h3>
          <b-row>
            <b-col lg="4">
              <client-only>
                <RegionMap
                  :locations="locations"
                  :locations-list="sector.locations"
                  class="mb-4" />
              </client-only>
            </b-col>
            <b-col lg="8">
              <b-card-group columns>
                <b-card
                  v-for="region_name in Object.keys(sector.locations.admin1).sort()"
                  :key="region_name">
                  <h4>{{ locations.admin1[region_name].info.name }}</h4>
                  <div class="inline-list">
                    <Location
                      v-for="district_name in Object.keys(sector.locations.admin2).sort()"
                      v-if="locations.admin2[district_name].info.admin1==region_name"
                      :key="district_name"
                      :name="locations.admin2[district_name].info.name"
                      :stub="district_name"
                      type="admin2"
                      :activity_count="sector.locations.admin2[district_name]" />
                  </div>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
          <p class="warning" v-if="Object.keys(sector.locations.admin1).length == 0">No location information available for {{ sector_name }}.</p>
          <hr />
        </section>
        <section id="activities">
          <h3>Activities related to {{ sector_name }} ({{ sector.activities | length }})</h3>
          <ActivitiesList
            :activities="activities"
            :activitiesList="sector.activities" />
        </section>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Org from '~/components/org.vue'
import Location from '~/components/location.vue'
import ActivitiesList from '~/components/activities_list.vue'
import RegionMap from '~/components/Maps/RegionMap.vue'
export default {
  data() {
    return {
      busy: true,
      sector: {}
    }
  },
  components: {
    Org, Location, ActivitiesList, RegionMap
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
