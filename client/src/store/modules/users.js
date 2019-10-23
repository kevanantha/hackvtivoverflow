import axios from '@/apis/api'

const state = {
  isLogin: false,
  name: ''
}

const getters = {}

const mutations = {
  IS_LOGIN(state, name) {
    if (localStorage.getItem('token')) {
      state.isLogin = true
      state.name = localStorage.getItem('name')
    } else {
      state.isLogin = false
      state.name = ''
    }
  }
}

const actions = {
  signin({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'post',
          url: '/users/login',
          data: payload
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        commit('IS_LOGIN', data.name)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  signup({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'post',
          url: '/users/register',
          data: payload
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        commit('IS_LOGIN', data.name)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  signout({ commit }) {
    return new Promise((resolve, reject) => {
      localStorage.clear()
      commit('IS_LOGIN')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
