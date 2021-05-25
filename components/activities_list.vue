<template>
  <div>
    <b-row class="mb-2" v-if="totalRows > perPage">
      <b-col md="6"  class="my-1">
        <b-form-group
          label="Activities per page"
          label-for="per-page"
          label-class="mb-0"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page"
            v-model="perPage"
            size="sm"
            class="my-0"
            :options="[50, 100,200,500,1000]"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group
          label="Page"
          label-size="sm"
          label-class="mb-1"
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
      <div class="inline-list wide">
        <Activity
          v-for="activity_id in pageActivities"
          :key="activity_id"
          :activity="activities[activity_id]" />
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Activity from '~/components/activity.vue'
export default {
  data() {
    return {
      perPage: 50,
      page: 1
    }
  },
  components: {
    Activity
  },
  props: {
    activities: Object,
    activitiesList: Array
  },
  computed: {
    totalRows() {
      return this.filteredActivities.length
    },
    filteredActivities() {
      return this.activitiesList.filter(item => this.checkSource(item))
    },
    pageActivities() {
      return this.filteredActivities.slice((this.page-1)*this.perPage, (this.page)*this.perPage)
    },...mapState(['source'])
  },
  methods: {
    checkSource(activity) {
      if (this.source == 'all') {
        return true
      } else if ((this.source == '3w') && (activity.length == 8)) {
        return true
      } else if ((this.source == 'iati') && (activity.length != 8)) {
        return true
      }
      return false
    }
  },
  watch: {
    perPage() {
      this.page = 1
    }
  }
}
</script>