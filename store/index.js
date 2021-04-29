import Vue from 'vue'

export const state = () => ({
  orgs: {},
  sectors: {},
  activities: {},
  locations: {}
})

export const mutations = {
  setOrgs (state, orgs) {
    state.orgs = orgs
  },
  setSectors (state, sectors) {
    state.sectors = sectors
  },
  setActivities (state, activities) {
    state.activities = activities
  },
  setLocations (state, locations) {
    state.locations = locations
  }
}

export const actions = {
  async loadOrgs({ commit, state }) {
    if (Object.keys(state.orgs).length > 0) {
      return true
    }
    const { data } = await this.$axios
      .get(`org-index.json`)
    commit("setOrgs", data)
  },
  async loadSectors({ commit, state }) {
    if (Object.keys(state.sectors).length > 0) {
      return true
    }
    const { data } = await this.$axios
      .get(`sector-index.json`)
    commit("setSectors", data)
  },
  async loadLocations({ commit, state }) {
    if (Object.keys(state.locations).length > 0) {
      return true
    }
    const { data } = await this.$axios
      .get(`location-index.json`)
    commit('setLocations', data)
  },
  async loadActivities({ commit, state }) {
    if (Object.keys(state.activities).length > 0) {
      return true
    }
    const { data } = await this.$axios
      .get(`activities.json`)
    commit('setActivities', data)
  }
}
