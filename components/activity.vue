<template>
  <div class="item" v-if="this.busy==false">
    <nuxt-link
      :title="activity.title"
      :to="{name: 'activities-identifier', params: { identifier: activity.identifier }}">
      {{ activity.title | truncate }}
    </nuxt-link>
    <span class="info"><b>Who:</b> {{ orgNames | join | truncate }}</span>
    <span class="info"><b>Where:</b> {{ locationNames | join | truncate }}</span>
    <span class="info"><b>Source:</b> {{ activity.source }}</span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      busy: true
    }
  },
  props: {
    activity: Object
  },
  computed: {
    orgNames() {
      if (Object.keys(this.orgs).length == 0) { return ''}
      return this.unique(Object.entries(this.activity.orgs).reduce((summary, _org) => {
        const key = _org[0]
        const organisation = _org[1]
        organisation.map(item => {
          if (item in this.orgs) {
            summary.push(this.orgs[item].info.name)
          }
        })
        return summary
      }, []))
    },
    locationNames() {
      if (Object.keys(this.locations).length == 0) { return ''}
      return this.unique(Object.entries(this.activity.locations).reduce((summary, loc) => {
        const key = loc[0]
        const location = loc[1]
        location.map(item => {
          if (key=='countries') {
            summary.push(item)
            return summary
          }
          const target = this.locations[key][item]
          if (target != undefined) {
            summary.push(this.locations[key][item].info.name)
          } else {
            summary.push(item)
          }
        })
        return summary
      }, []))
    },...mapState(['orgs', 'locations']),
  },
  methods: {
    unique(values) {
      return Array.from(new Set(values.filter(item => { return item != ''})))
    }
  },
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    await this.$store.dispatch('loadLocations')
    this.busy = false
  }
}
</script>