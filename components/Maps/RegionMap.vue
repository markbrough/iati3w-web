<template>
  <div>
    <template v-if="busy">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner variant="secondary" label="Loading..."></b-spinner>
      </div>
    </template>
    <template v-else>
      <l-map
        class="region-map"
        :zoom="zoom"
        :center="center"
        :options="mapControls"
      >
        <RegionMapFeature
          v-for="region in regions"
          :key="region.region"
          :geojson="region"
          :activities="activities"
          :total-activities="totalActivities"
          :region="region.region"
          :region-name="region.regionName"
          type="admin1" />
      </l-map>
    </template>
  </div>
</template>
<style>
.region-map {
  height: 350px !important;
  width: 100%;
  background: none;
}
</style>
<script>
import { mapState } from 'vuex'
import RegionMapFeature from './RegionMapFeature.vue'
import 'leaflet/dist/leaflet.css'
export default {
  components: {
    RegionMapFeature
  },
  props: ['locations', 'locationsList'],
  data () {
    return {
      busy: true,
      zoom: 5,
      center: [5, 45],
      mapControls: {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        keyboard: false,
        doubleClickZoom: false,
        boxZoom: false,
        tap: false,
        touchZoom: false
      }
    }
  },
  computed: {
    locationsNamesStubs() {
      return Object.entries(this.locations.admin1).reduce((summary, item) => {
        summary[item[1].info.name] = { stub: item[0], data: item[1] }
        return summary
      }, {})
    },
    locationsStubsNames() {
      return Object.entries(this.locations.admin1).reduce((summary, item) => {
        summary[item[0]] = item[1].info.name
        return summary
      }, {})
    },
    regions () {
      if (Object.keys(this.geoJSONData).length === 0) { return [] }
      return this.geoJSONData.features.map((feature) => {
        return {
          region: feature.properties.admin1Name,
          regionName: feature.properties.admin1Name,
          features: [feature],
          stub: this.locationsNamesStubs[feature.properties.admin1Name] ? this.locationsNamesStubs[feature.properties.admin1Name].stub : '',
          data: this.locationsNamesStubs[feature.properties.admin1Name] ? this.locationsNamesStubs[feature.properties.admin1Name].data : {}
        }
      })
    },
    activities() {
      if (this.locationsList) { return this.activitiesLocationsList }
      else { return this.activitiesLocations }
    },
    totalActivities() {
      if (this.locationsList) {
        return this.totalActivitiesLocationsList
      }
      else {
        return this.totalActivitiesLocations
      }
    },
    totalActivitiesLocationsList(){
      return Object.entries(this.locationsList.admin1).reduce((summary, item) => {
        return summary + item[1]
      }, 0)
    },
    totalActivitiesLocations(){
      return Object.entries(this.locations.admin1).reduce((summary, item) => {
        return summary + item[1].activities.filter(activity => this.checkSource(activity)).length
      }, 0)
    },
    activitiesLocationsList() {
      return Object.entries(this.locationsList.admin1).reduce((summary, item) => {
        summary[this.locationsStubsNames[item[0]]] = item[1]
        return summary
      }, {})
    },
    activitiesLocations() {
      return Object.entries(this.locations.admin1).reduce((summary, item) => {
        summary[item[1].info.name] = item[1].activities.filter(activity => this.checkSource(activity)).length
        return summary
      }, {})
    },...mapState(['geoJSONData', 'source']),
  },
  methods: {
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
  async mounted() {
    await this.$store.dispatch('loadMapData')
    this.busy = false
  }
}
</script>
