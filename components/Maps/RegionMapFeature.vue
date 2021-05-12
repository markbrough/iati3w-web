<template>
  <l-geo-json
    ref="geoJson"
    :geojson="geojson"
    :options="options"
    :options-style="optionsStyle"
  />
</template>
<script>
export default {
  components: {
  },
  props: ['opacity', 'region', 'regionName',
    'geojson', 'type'],
  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    onEachFeatureFunction () {
      return (feature, layer) => {
        layer.on('mouseover', (e) => {
          e.target.setStyle({
            fillOpacity: 1
          })
        })
        layer.on('mouseout', (e) => {
          e.target.setStyle({
            fillOpacity: this.fillOpacity
          })
        })
        layer.on('click', () => {
          this.clickRegion()
        })
        const activities = this.geojson.data.activities ? this.geojson.data.activities.length : 'unknown'
        layer.bindTooltip(
          `${this.regionName}: ${activities} activities`,
          { permanent: false, sticky: true }
        )
      }
    },
    fillOpacity () {
      return this.opacity[this.regionName] || 0
    },
    optionsStyle () {
      const _fillColor = '#585fd2'
      return {
        fillColor: _fillColor,
        weight: 1,
        opacity: 0.5,
        color: '#bbbbbb',
        fillOpacity: this.fillOpacity
      }
    }
  },
  methods: {
    clickRegion () {
      this.$router.push({
        name: 'locations-type-stub',
        params: {
          type: this.type,
          stub: this.geojson.stub
        }
      })
    }
  }
}
</script>
