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
            :to="{name: 'orgs', hash: '#local'}"
        >Local and national actors</nuxt-link>
        <nuxt-link
            :to="{name: 'orgs', hash: '#regional'}"
        >Regional actors</nuxt-link>
        <nuxt-link
            :to="{name: 'orgs', hash: '#international'}"
        >International actors</nuxt-link>
        <nuxt-link
            :to="{name: 'orgs', hash: '#unknown'}"
        >Undetermined actors</nuxt-link>
      </nav>
      <h1>Aid organisations active in Somalia</h1>
      <!--
      <div id="map">
        Loading map...
      </div>
      -->
      <p>
        These are all the organisations associated with 3W and IATI
        activities from 2020 forward on a single page. You can use
        your browser search function to look for a specific
        organisation.
      </p>
      <section id="content">
        <div
          v-for='scope in ["local", "regional", "international", "unknown"]'
          :key="scope">
          <section :id="scope">
            <h2>{{ scope | scope | capitalize }}s</h2>
            <div class="inline-list">
              <Org
                v-for="org in orgs"
                :key="org.info.name"
                v-if="org.info.scope==scope"
                :org="org"
                :activity_count="org.total_activities"
                root=".." />
            </div>
          </section>
        </div>
        <p class="loading">Loading…</p>
      </section>
    </main>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Org from '~/components/org.vue'
export default {
  data() {
    return {
      busy: true
    }
  },
  components: {
    Org
  },
  computed: mapState(['orgs']),
  async mounted() {
    await this.$store.dispatch('loadOrgs')
    this.busy = false
  }
}
</script>

<style>
</style>
