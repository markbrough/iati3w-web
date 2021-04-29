<template>
  <div class="container">
    <main v-if="busy!=true">
      <section id="content">
        <h2>Activity: {{ activity.title }}</h2>
        <table>
          <tbody>
            <tr>
              <th>Identifier ({{ activity.source }})</th>
              <td>{{ activity.identifier }}</td>
            </tr>
            <tr>
              <th>Reported by</th>
              <td>{{ activity.reported_by }} ({{ activity.source }})</td>
            </tr>
            <template v-if="activity.dates.start">
              <tr>
                <th>Start</th>
                <td>{{ activity.dates.start }}</td>
              </tr>
            </template>
            <template v-if="activity.dates.end">
              <tr>
                <th>End</th>
                <td>{{ activity.dates.end }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <p class="pre">{{ activity.description }}</p>
        <section id="orgs">
          <h3>Who is working on this activity?</h3>
          <p v-if="activity.orgs.implementing">
            <b>Implementing:</b>
            <nuxt-link
              v-for="org in activity.orgs.implementing"
              :key="org"
              :to="{name: 'orgs-stub', params: { stub: orgs[org].info.stub }}">{{ orgs[org].info.name }}</nuxt-link>
          </p>
          <p v-if="activity.orgs.programming">
            <b>Programming:</b>
            <nuxt-link
              v-for="org in activity.orgs.programming"
              :key="org"
              :to="{name: 'orgs-stub', params: { stub: orgs[org].info.stub }}">{{ orgs[org].info.name }}</nuxt-link>
          </p>
          <p v-if="activity.orgs.funding">
            <b>Funding:</b>
            <nuxt-link
              v-for="org in activity.orgs.funding"
              :key="org"
              :to="{name: 'orgs-stub', params: { stub: orgs[org].info.stub }}">{{ orgs[org].info.name }}</nuxt-link>
          </p>
        </section>
        <section id="sectors">
          <h3>What sectors does the activity target?</h3>
          <p v-if="activity.sectors.humanitarian">
            <b>Humanitarian clusters:</b>
            <LocationLink
              v-for="sector in activity.sectors.humanitarian"
              :key="sector"
              type="humanitarian"
              :name="sector" />
          </p>
          <p v-if="activity.sectors.humanitarian">
            <b>OECD sectors:</b>
            <LocationLink
              v-for="sector in activity.sectors.dac"
              :key="sector"
              type="dac"
              :name="sector" />
          </p>
        </section>
        <section id="locations">
          <h3>Where is the activity happening?</h3>
          <p>
            <b>Admin 1:</b>
            <nuxt-link
              v-for="location in activity.locations.admin1"
              :key="location"
              :to="{name: 'locations-type-locationname', params: { type: 'admin1', locationname: location }}">
              {{ location }}
            </nuxt-link>
          </p>
          <p>
            <b>Admin 2:</b>
            <nuxt-link
              v-for="location in activity.locations.admin2"
              :key="location"
              :to="{name: 'locations-type-locationname', params: { type: 'admin2', locationname: location }}">
              {{ location }}
            </nuxt-link>
          </p>
          <p>
            <b>Unclassified:</b>
            <nuxt-link
              v-for="location in activity.locations.unclassified"
              :key="location"
              :to="{name: 'locations-type-locationname', params: { type: 'unclassified', locationname: location }}">
              {{ location }}
            </nuxt-link>
          </p>
        </section>
      </section>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import LocationLink from '~/components/location_link.vue'
export default {
  data() {
    return {
      activity: {},
      busy: true
    }
  },
  components: {
    LocationLink
  },
  computed: {
    ...mapState(['activities', 'orgs']),
  },
  async mounted() {
    await this.$store.dispatch('loadActivities')
    await this.$store.dispatch('loadOrgs')
    this.activity = this.activities[this.$route.params.identifier]
    this.busy = false
  }
}
</script>
