<template>
  <div>
    <b-row class="mb-2">
      <b-col lg="12" class="my-1">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to search organisations..."
        ></b-form-input>
      </b-col>
    </b-row>
    <hr />
    <section id="content">
      <div
        v-for='scope in ["local", "regional", "international", "unknown"]'
        :key="scope">
        <section :id="scope">
          <h2>{{ scope | scope | capitalize }}s</h2>
          <div class="inline-list">
            <Org
              v-for="org in filteredOrgs"
              :key="org.info.name"
              v-if="org.info.scope==scope"
              :org="org"
              :activity_count="org.total_activities"
              />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
import Org from '~/components/org.vue'
export default {
  data() {
    return {
      filter: null,
    }
  },
  components: {
    Org
  },
  props: {
    orgs: Object
  },
  computed: {
    filterOrgs() {
      const entries = Object.entries(this.orgs)
      if ([null, ''].includes(this.filter)) { return entries }
      return entries.filter(item => {
        return item[1].info.name.includes(this.filter)
      })
    },
    filteredOrgs() {
      return Object.fromEntries(
        this.filterOrgs)
    }
  },
  watch: {
  }
}
</script>