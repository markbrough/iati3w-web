<template>
  <div class="container">
    <main v-if="busy">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner variant="secondary" label="Loading..."></b-spinner>
      </div>
    </main>
    <main v-else>
      <nav class="secondary">
        <nuxt-link
          v-for="scope in Object.values(scopes)"
          :key="scope.type"
          :to="{name: 'orgs', hash: `#${scope.type}`}"
        >{{ scope.name }}</nuxt-link>
      </nav>
      <h1>Aid organisations active in Somalia</h1>
      <p>
        The following organisations are associated with 3W and IATI
        activities from 2020 onwards.
      </p>

      <client-only>
        <Treemap
          :data="orgsSummary"
          summarise-by="organisations"
          class="mb-4"
          :clickable="false"
          :colors="orgTypeColors" />
      </client-only>
      <OrgsList
        :orgs="orgs"
        :source.sync="source" />
    </main>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import OrgsList from '~/components/orgs_list.vue'
import Treemap from '~/components/treemap.vue'
export default {
  data() {
    return {
      busy: true,
      scopes: {
        'local': {
          'name': 'Local and national actors',
          'type': 'local',
          'organisations': 0
        },
        'regional': {
          'name': 'Regional actors',
          'type': 'regional',
          'organisations': 0
        },
        'international': {
          'name': 'International actors',
          'type': 'international',
          'organisations': 0
        },
        'unknown': {
          'name': 'Undetermined actors',
          'type': 'unknown',
          'organisations': 0
        }
      },
      source: 'all',
      orgTypeColors: {
        'Local and national actors': '#CF3D1E',
        'Regional actors': '#F15623',
        'International actors': '#F68B1F',
        'Undetermined actors': '#FFC60B'
      }
    }
  },
  components: {
    OrgsList, Treemap
  },
  computed: {
    orgsSummary() {
      return Object.values(
        Object.values(this.orgs).reduce((summary, item) => {
          if (this.source == 'all') {
            summary[item.info.scope].organisations += 1
          } else if (item.sources.includes(this.source)) {
            summary[item.info.scope].organisations += 1
          }
          return summary
        }, {
          'local': {
            'name': 'Local and national actors',
            'type': 'local',
            'organisations': 0
          },
          'regional': {
            'name': 'Regional actors',
            'type': 'regional',
            'organisations': 0
          },
          'international': {
            'name': 'International actors',
            'type': 'international',
            'organisations': 0
          },
          'unknown': {
            'name': 'Undetermined actors',
            'type': 'unknown',
            'organisations': 0
          }
        })
      )
    },...mapState(['orgs']),
  },
  methods: {
  },
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    this.busy = false
  }
}
</script>

<style>
</style>
