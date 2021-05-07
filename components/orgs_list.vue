<template>
  <div>
    <b-row class="mb-2">
      <b-col lg="6" class="my-1">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to search organisations..."
        ></b-form-input>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Organisations per page"
          label-for="per-page"
          label-cols-sm="5"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-select
            id="per-page"
            v-model="perPage"
            :options="[100,200,500,1000]"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="totalRows > perPage">
      <b-col offset="md-6">
        <b-form-group
          label="Page"
          label-cols-sm="5"
          label-align-sm="right"
          class="mb-0">
          <b-pagination
            v-model="page"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-form-group>
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
      perPage: 100,
      filter: null,
      page: 1
    }
  },
  components: {
    Org
  },
  props: {
    orgs: Object
  },
  computed: {
    filterStub() {
      return this.filter.toLowerCase().replace(/[\W_]+/g,"-")
    },
    filterOrgs() {
      const entries = Object.entries(this.orgs)
      if ([null, ''].includes(this.filter)) { return entries }
      return entries.filter(item => {
        return item[0].includes(this.filterStub)
      })
    },
    totalRows() {
      return this.filterOrgs.length
    },
    filteredOrgs() {
      return Object.fromEntries(
        this.filterOrgs.slice((this.page-1)*this.perPage, this.perPage*(this.page)))
    }
  },
  watch: {
    perPage() {
      this.page = 1
    }
  }
}
</script>