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
  props: ['activities', 'region', 'regionName',
    'geojson', 'type', 'totalActivities'],
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
        const activities = this.numActivities
        layer.bindTooltip(
          `${this.regionName}: ${this.plural(activities, 'activity', 'activities')}`,
          { permanent: false, sticky: true }
        )
      }
    },
    numActivities() {
      if (!(this.regionName in this.activities)) { return 0 }
      return this.activities[this.regionName]
    },
    fillOpacity () {
      return ((this.numActivities / this.totalActivities) * 10) || 0
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
    plural(_number, _singular, _plural) {
      return this.$options.filters.plural(
        _number, _singular, _plural
      )
    },
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
