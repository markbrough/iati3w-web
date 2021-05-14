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
          <template v-if="location_type == 'admin1'">
            <nuxt-link :to="{name: 'locations-type-stub', params: { stub: info.info.stub, type: location_type }, hash: '#districts'}"
            >Districts</nuxt-link>
          </template>
          <nuxt-link :to="{name: 'locations-type-stub', params: { stub: info.info.stub, type: location_type }, hash: '#orgs'}"
            >Organisations</nuxt-link>
          <nuxt-link :to="{name: 'locations-type-stub', params: { stub: info.info.stub, type: location_type }, hash: '#sectors'}"
            >Sectors</nuxt-link>
          <nuxt-link :to="{name: 'locations-type-stub', params: { stub: info.info.stub, type: location_type }, hash: '#activities'}"
            >Activities</nuxt-link>
        </nav>
        <h2>{{ location_name }} {{ location_type | location | capitalize }}</h2>
        <div
          v-for='level in ["admin1", "admin2"]'
          :key="level"
          v-if="info.info[level]">
          <p>
            <b>{{ level | location }}: </b>
            <nuxt-link :to="{name: 'locations-type-stub', params: { stub: info.info[level], type: level }}">
              {{ locations[level][info.info[level]].info.name }}
            </nuxt-link>
          </p>
        </div>
        <section id="districts" v-if="location_type == 'admin1'">
          <h3>Districts of {{ location_name }}</h3>
          <div class="inline-list">
            <Location
              v-for="district_name in Object.keys(locations.admin2).sort()"
              :key="district_name"
              v-if="locations.admin2[district_name].info.admin1==stub"
              :stub="district_name"
              :name="locations.admin2[district_name].info.name"
              type="admin2"
              :org_count="flatten(locations.admin2[district_name].orgs).length"
              :activity_count="locations.admin2[district_name].activities.length" />
          </div>
        </section>
        <section id="orgs">
          <h3>Organisations working in {{ location_name }}</h3>
          <section :id="`orgs.${ scope }`"
            v-for='scope in ["local", "regional", "international", "unknown"]'
            v-if="Object.keys(info.orgs[scope]).length > 0">
            <h4>{{ scope | scope | capitalize }}s</h4>
            <b-card-group columns>
              <Org
                v-for="org_name in Object.keys(info.orgs[scope]).sort()"
                :key="org_name"
                :org="orgs[org_name]"
                :activity_count="info.orgs[scope][org_name]" />
            </b-card-group>
          </section>
        </section>
        <section id="sectors">
          <h3>Sectors active in {{ location_name }}</h3>
          <div
            v-for="type in Object.keys(info.sectors)"
            :key="type">
            <section :id="`sectors.${ type }`"
              v-if="Object.keys(info.sectors[type]).length > 0">
              <h4>{{ type | sector }}s</h4>
              <div class="inline-list">
                <Sector
                  v-for="stub in Object.keys(info.sectors[type]).sort()"
                  :key="stub"
                  :stub="stub"
                  :name="sectors[type][stub].name"
                  :type="type"
                  :activity_count="info.sectors[type][stub]" />
              </div>
            </section>
          </div>
        </section>
        <section id="activities">
          <h3>Aid activities in {{ location_name }}</h3>
          <ActivitiesList
            :activities="activities"
            :activitiesList="info.activities" />
        </section>
      </section>
    </main>
  </div>
</template>
<script>
import VueScrollTo from 'vue-scrollto'
import { mapState } from 'vuex'
import Org from '~/components/org.vue'
import Sector from '~/components/sector.vue'
import LocationLink from '~/components/location_link.vue'
import Location from '~/components/location.vue'
import ActivitiesList from '~/components/activities_list.vue'
export default {
  data() {
    return {
      busy: true,
      info: {}
    }
  },
  components: {
    Org, Sector, LocationLink, Location, ActivitiesList
  },
  methods: {
    flatten(items) {
      return this.$options.filters.flatten(
        items
      )
    },
    handleScroll() {
      var hash = this.$route.hash.split("#")[1]
      if (this.$route.hash) {
        setTimeout(() => {
          var anchor = document.getElementById(hash)
          VueScrollTo.scrollTo(anchor, 500)
        }, 300)
      }
    },
  },
  computed: {
    sector_count() {
      return this.$options.filters.flatten(
        this.org.sectors
      ).length
    },
    partner_count() {
      return this.$options.filters.flatten(
        this.org.partners
      ).length
    },
    region_count() {
      return Object.keys(this.org.locations.admin1).length
    },
    activity_count() {
      return this.$options.filters.flatten(
        this.org.activities
      ).length
    },
    location_name() {
      if (Object.keys(this.locations).length > 0) {
        return this.locations[this.$route.params.type][this.$route.params.stub].info.name
      }
    },
    location_type() {
      return this.$route.params.type
    },
    stub() {
      return this.$route.params.stub
    },
    ...mapState(['orgs', 'activities', 'locations', 'sectors']),
  },
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    await this.$store.dispatch('loadLocations')
    await this.$store.dispatch('loadActivities')
    await this.$store.dispatch('loadSectors')
    this.info = this.locations[this.$route.params.type][this.$route.params.stub]
    this.busy = false
    this.handleScroll()
  }
}
</script>
