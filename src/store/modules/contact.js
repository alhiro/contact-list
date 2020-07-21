import * as types from '../mutation-types'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const contacts = {
  data: [{
    'id': 1,
    'name': 'Hero',
    'mobile': '0813123123',
    'address': 'Jl. Permata No. 1, Jawa Barat'
  }, {
    'id': 2,
    'name': 'Jowy',
    'mobile': '0857123123',
    'address': 'Jl. Matahari No. 11, Jakarta'
  }, {
    'id': 3,
    'name': 'Nanami',
    'mobile': '0819123123',
    'address': 'Jl. Mangga No. 10, Tangerang'
  }, {
    'id': 4,
    'name': 'Viktor',
    'mobile': '0887123123',
    'address': 'Jl. Simpang Empat No. 5, Bekasi'
  }, {
    'id': 5,
    'name': 'Matilda',
    'mobile': '0852123123',
    'address': 'Jl. Drakor No. 4, Bandung'
  }]
}

// state
export const state = {
  contact: contacts
}

// getters
export const getters = {
  contact: state => state.contact
}

// mutations
export const mutation = {
  [types.FETCH_CONTACT_SUCCESS] (state, { contact }) {
    state.contact = contact
  },

  [types.FETCH_CONTACT_FAILURE] (state) {
    state.contact = null
  }
}

// actions
export const actions = {
  async fetchContact ({ commit }) {
    try {
      const data = contacts

      commit(types.FETCH_CONTACT_SUCCESS, { contact: data.data })
    } catch (e) {
      commit(types.FETCH_CONTACT_FAILURE)
    }
  }
}
