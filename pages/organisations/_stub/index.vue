<template>
  <div class="container">
    <main v-if="busy">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner variant="secondary" label="Loading..."></b-spinner>
      </div>
    </main>
    <main v-else>
      <section id="content">
      <h2>
        {{ org.info.name }}
        <template v-if="org.info.name != org.info.shortname">
        ({{ org.info.shortname }})
        </template>
      </h2>

      <p>
        According to the {{ org.sources | join(" and ") }} data,
        {{ org.info.scope | scope }} <b>{{ org.info.name }}</b>
        works
        <template v-if="region_count > 0">
        in <nuxt-link :to="{name: 'organisations-stub', params: { stub: org.info.stub }, hash: '#locations'}"
        >{{ region_count | plural("region", "regions") }}</nuxt-link> of Somalia,
        </template>
        <template v-if="sector_count > 0">
        through <nuxt-link :to="{name: 'organisations-stub', params: { stub: org.info.stub }, hash: '#sectors'}"
        >{{ sector_count | plural("sector", "sectors") }}</nuxt-link>,
        </template>
        <template v-if="partner_count > 0">
        collaborating with <nuxt-link :to="{name: 'organisations-stub', params: { stub: org.info.stub }, hash: '#partners'}"
        >{{ partner_count | plural("partner organisation", "partner organisations") }}</nuxt-link>,
        </template>
        on a total of <nuxt-link :to="{name: 'organisations-stub', params: { stub: org.info.stub }, hash: '#activities'}"
        >{{ activity_count | plural("aid activity", "aid activities") }}</nuxt-link>
        <template v-if="org.humanitarian">
        (including humanitarian activities).
        </template>
        <template v-else>
        (none flagged as humanitarian).
        </template>
      </p>

      <template v-if="org.info.synonyms.length > 0">
      <p>
        Alternative names: <i>{{ org.info.synonyms | join | truncate }}</i>
      </p>
      </template>
      <template v-if="org.info.iati_id">
      <p>
        IATI organisation identifier: <a :href="`https://d-portal.org/ctrack.html?reporting_ref=${ urlenc(org.info.iati_id) }`" target="_blank">{{ org.info.iati_id }}</a> (link opens in D-Portal).
      </p>
      </template>
      <template v-if="org.info.url">
      <p>
        You can learn more about {{ org.info.shortname }} at <a :href="org.info.url" target="_blank" rel="nofollow">{{ org.info.url }}</a>
      </p>
      </template>
      <hr />
      <section id="partners">
        <b-row>
          <b-col lg="9">
            <h3>Organisations who partner with {{ org.info.shortname }}</h3>
          </b-col>
          <b-col lg="3" class="text-md-right">
            <b-form-radio-group
              v-model="source"
              :options="sourceOptions"
              button-variant="outline-secondary"
              name="radio-btn-outline"
              buttons
              size="sm"
              class="w-100"
            ></b-form-radio-group>
          </b-col>
        </b-row>
        <template v-if="partner_count > 0">
          <div
            v-for='scope in ["local", "regional", "international", "unknown"]'
            :key="scope">
            <section :id="`partners.${ scope }`"
              v-if="Object.keys(org.partners[source][scope]).length > 0">
              <h4>{{ scope | scope | capitalize }}s</h4>
              <b-card-group columns>
                <Org
                  v-for="partner_name in Object.keys(org.partners[source][scope]).sort()"
                  :key="partner_name"
                  :org="orgs[partner_name]"
                  :activity_count="org.partners[source][scope][partner_name]" />
              </b-card-group>
            </section>
          </div>
        </template>
        <template v-else>
          <p class="notice">(No partner organisations found for {{ org.info.name }}.)</p>
        </template>
        <hr />
      </section>
      <section id="sectors">
        <h3>Sectors where {{ org.info.shortname }} works</h3>
        <template v-if="sector_count > 0">
          <div
            v-for="type in Object.keys(org.sectors)"
            :key="type"
            v-if="Object.keys(org.sectors[type]).length > 0">
            <section :id="`sectors.${ type }`">
              <h4>{{ type | sector }}s</h4>
              <div class="inline-list">
                <Sector
                  v-for="stub in Object.keys(org.sectors[type]).sort()"
                  :key="stub"
                  :stub="stub"
                  :name="sectors[type][stub].name"
                  :type="type"
                  :activity_count="org.sectors[type][stub]" />
              </div>
            </section>
          </div>
        </template>
        <template v-else>
          <p class="notice">(No sectors found for {{ org.info.name }}.)</p>
        </template>
        <hr />
      </section>
      <section id="locations" v-if="region_count > 0">
        <h3>Regions where {{ org.info.shortname }} works</h3>
        <b-row>
          <b-col lg="4">
            <client-only>
              <RegionMap
                :locations="locations"
                :locations-list="org.locations"
                class="mb-4" />
            </client-only>
          </b-col>
          <b-col lg="8">
            <b-card-group columns>
              <b-card
                v-for="region_name in Object.keys(org.locations.admin1).sort()"
                :key="region_name">
                <h4>
                  <LocationLink
                    :stub="region_name"
                    :name="locations.admin1[region_name].info.name"
                    type="admin1" />
                  ({{ org.locations.admin1[region_name] | plural("activity", "activities") }})
                </h4>
                <div class="inline-list">
                  <Location
                    v-for="district_name in Object.keys(org.locations.admin2).sort()"
                    v-if="locations.admin2[district_name].info.admin1==region_name"
                    :key="district_name"
                    :name="locations.admin2[district_name].info.name"
                    :stub="district_name"
                    type="admin2"
                    :activity_count="org.locations.admin2[district_name]" />
                </div>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
        <hr />
      </section>
      <section id="activities">
        <h3>Activities involving {{ org.info.shortname }}</h3>
        <section :id="`activities.${ type }`"
          v-for="type in Object.keys(org.activities)"
          :key="type"
          v-if="org.activities[type].length > 0">
          <h4>{{ org.info.shortname }} as {{ type | role }} ({{ org.activities[type].length }})</h4>
          <ActivitiesList
            :activities="activities"
            :activitiesList="org.activities[type]" />
        </section>
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
import RegionMap from '~/components/Maps/RegionMap.vue'
export default {
  data() {
    return {
      org: {
        sectors: [],
        partners: {local: {}, regional: {}, international: {}, unknown: {}},
        locations: { admin1: [] },
        activities: []
      },
      busy: true,
      source: 'all',
      sourceOptions: [
        {
          value: 'iati',
          text: 'IATI'
        },
        {
          value: '3w',
          text: '3W'
        },
        {
          value: 'all',
          text: 'IATI + 3W'
        }
      ]
    }
  },
  components: {
    Org, Sector, LocationLink, Location, ActivitiesList, RegionMap
  },
  methods: {
    urlenc(value) {
      return this.$options.filters.urlenc(
        value
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
        this.org.partners[this.source]
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
    ...mapState(['orgs', 'activities', 'locations', 'sectors']),
  },
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    this.org = this.orgs[this.$route.params.stub]
    this.$store.dispatch('loadLocations')
    await this.$store.dispatch('loadActivities')
    await this.$store.dispatch('loadSectors')
    this.busy = false
    this.handleScroll()
  }
}
</script>
