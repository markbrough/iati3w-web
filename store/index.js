import Vue from 'vue'
import axios from 'axios'

const baseURL = 'https://davidmegginson.github.io/iati3w-data'

export const state = () => ({
  orgs: {},
  sectors: {},
  activities: {},
  locations: {},
  geoJSONData: {},
  source: 'all'
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
  },
  setGeoJSONData (state, data) {
    state.geoJSONData = data
  },
  setSource (state, newSource) {
    state.source = newSource
  }
}

export const actions = {
  async loadOrgs({ commit, state }) {
    if (Object.keys(state.orgs).length > 0) {
      return true
    }
    const { data } = await axios
      .get(`${baseURL}/org-index.json`)
    commit("setOrgs", data)
  },
  async loadSectors({ commit, state }) {
    if (Object.keys(state.sectors).length > 0) {
      return true
    }
    const { data } = await axios
      .get(`${baseURL}/sector-index.json`)
    commit("setSectors", data)
  },
  async loadLocations({ commit, state }) {
    if (Object.keys(state.locations).length > 0) {
      return true
    }
    const { data } = await axios
      .get(`${baseURL}/location-index.json`)
    commit('setLocations', data)
  },
  async loadActivities({ commit, state }) {
    if (Object.keys(state.activities).length > 0) {
      return true
    }
    const { data } = await axios
      .get(`${baseURL}/activities.json`)
    commit('setActivities', data)
  },
  async loadMapData({ commit, state }) {
    if (Object.keys(state.geoJSONData).length > 0) {
      return true
    }
    const { data } = await axios.get('https://brough.io/somalia-3w-iati/somalia-adm1.geojson')
    commit('setGeoJSONData', data)
  }
}
