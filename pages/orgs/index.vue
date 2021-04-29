<template>
  <div class="container">
    <main>
      <nav class="secondary">
        <a href="#local">Local and national actors</a>
        <a href="#regional">Regional actors</a>
        <a href="#international">International actors</a>
        <a href="#unknown">Undetermined actors</a>
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
        <template v-for='scope in ["local", "regional", "international", "unknown"]'>
          <section :id="scope">
            <h2>{{ scope | scope | capitalize }}s</h2>
            <div class="inline-list">
              <Org
                v-for="org in orgs"
                v-if="org.info.scope==scope"
                :org="org"
                :activity_count="org.total_activities"
                root=".." />
            </div>
          </section>
        </template>
        <p class="loading">Loading…</p>
      </section>
    </main>

  </div>
</template>

<script>
import Org from '~/components/org.vue'
export default {
  data() {
    return {
      orgs: []
    }
  },
  components: {
    Org
  },
  methods: {
    loadOrgs() {
      this.$axios
        .get(`org-index.json`)
        .then(response => {
          this.orgs = response.data
        })
    }
  },
  mounted() {
    this.loadOrgs()
  }
}
</script>

<style>
</style>
