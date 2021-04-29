<template>
  <div class="container">
    <main v-if="busy==false">
      <section id="content">
        <nav class="secondary">
          <template v-if="location_type == 'admin1'">
          <a href="#districts">Districts</a>
          </template>
          <a href="#orgs">Organisations</a>
          <a href="#sectors">Sectors</a>
          <a href="#activities">Activities</a>
        </nav>
        <h2>{{ location_name }} {{ location_type | location | capitalize }}</h2>
        <template
          v-for='level in ["admin1", "admin2"]'
          v-if="info.info[level]">
          <p>
            <b>{{ level | location }}: </b>
            <nuxt-link :to="{name: 'locations-type-locationname', params: { locationname: info.info[level], type: level }}">
              {{ info.info[level] }}
            </nuxt-link>
          </p>
        </template>
        <section id="districts" v-if="location_type == 'admin1'">
          <h3>Districts of {{ location_name }}</h3>
          <div class="inline-list">
            <Location
              v-for="district_name in Object.keys(locations.admin2).sort()"
              v-if="locations.admin2[district_name].info.admin1==location_name"
              :name="district_name"
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
            <h4>{{ scope | scope }}s</h4>
            <div class="inline-list">
              <Org
                v-for="org_name in Object.keys(info.orgs[scope]).sort()"
                :org="orgs[org_name]"
                :activity_count="info.orgs[scope][org_name]" />
            </div>
          </section>
        </section>
        <section id="sectors">
          <h3>Sectors active in {{ location_name }}</h3>
          <template v-for="type in Object.keys(info.sectors)">
            <section :id="`sectors.${ type }`"
              v-if="Object.keys(info.sectors[type]).length > 0">
              <h4>{{ type | sector }}s</h4>
              <div class="inline-list">
                <Sector
                  v-for="sector_name in Object.keys(info.sectors[type]).sort()"
                  :name="sector_name"
                  :type="type"
                  :activity_count="info.sectors[type][sector_name]" />
              </div>
            </section>
          </template>
        </section>
        <section id="activities">
          <h3>Aid activities in {{ location_name }}</h3>
          <div class="inline-list wide">
            <Activity
              v-for="activity_id in info.activities"
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
import Sector from '~/components/sector.vue'
import LocationLink from '~/components/location_link.vue'
import Location from '~/components/location.vue'
import Activity from '~/components/activity.vue'
export default {
  data() {
    return {
      busy: true,
      info: {}
    }
  },
  components: {
    Org, Sector, LocationLink, Location, Activity
  },
  methods: {
    flatten(items) {
      return this.$options.filters.flatten(
        items
      )
    }
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
    location_type() {
      return this.$route.params.type
    },
    location_name() {
      return this.$route.params.locationname
    },
    ...mapState(['orgs', 'activities', 'locations']),
  },
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    this.org = this.orgs[this.$route.params.orgname]
    this.$store.dispatch('loadLocations')
    await this.$store.dispatch('loadActivities')
    this.info = this.locations[this.$route.params.type][this.$route.params.locationname]
    this.busy = false
  }
}
</script>
