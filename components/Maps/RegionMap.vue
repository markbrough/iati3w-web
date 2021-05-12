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
          :opacity="opacity"
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
  props: ['locations'],
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
    regions () {
      const locationsNamesStubs = Object.entries(this.locations.admin1).reduce((summary, item) => {
        summary[item[1].info.name] = item[0]
        return summary
      }, {})
      if (Object.keys(this.geoJSONData).length === 0) { return [] }
      return this.geoJSONData.features.map((feature) => {
        return {
          region: feature.properties.admin1Name,
          regionName: feature.properties.admin1Name,
          features: [feature],
          stub: locationsNamesStubs[feature.properties.admin1Name]
        }
      })
    },
    opacity () {
      const totalActivities = Object.entries(this.locations.admin1).reduce((summary, item) => {
        return summary + item[1].activities.length
      }, 0)
      return Object.entries(this.locations.admin1).reduce((summary, item) => {
        summary[item[1].info.name] = (item[1].activities.length / totalActivities) * 10
        return summary
      }, {})
    },...mapState(['geoJSONData']),
  },
  async mounted() {
    await this.$store.dispatch('loadMapData')
    this.busy = false
  }
}
</script>
