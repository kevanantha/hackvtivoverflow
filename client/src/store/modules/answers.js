import axios from '@/apis/api'
import { verifyToken } from '@/helpers/jwt'

const state = {
  isLoading: true,
  answers: [],
  answer: {}
}

const getters = {
  total() {
    if (Object.keys(state.answer).length) {
      return state.answer.votes.map(vote => vote.voteType).reduce((acc, curr) => acc + curr, 0)
    }
  },
  isAldUpVote() {
    if (localStorage.getItem('token')) {
      const decode = verifyToken(localStorage.getItem('token'))
      if (Object.keys(state.answer).length) {
        const filter = state.answer.votes.filter(vote => vote.userId == decode.id)
        if (filter.length) {
          if (filter[0].voteType == 1) return true
          return false
        }
        return false
      }
    }
  },
  isAldDownVote() {
    if (localStorage.getItem('token')) {
      const decode = verifyToken(localStorage.getItem('token'))
      if (Object.keys(state.answer).length) {
        const filter = state.answer.votes.filter(vote => vote.userId == decode.id)
        if (filter.length) {
          if (filter[0].voteType == -1) return true
          return false
        }
        return false
      }
    }
  }
}

const mutations = {
  SET_ANSWER(state, answer) {
    state.answer = answer
    state.isLoading = false
  },
  SET_ALL_ANSWERS(state, payload) {
    state.answers = payload
    state.isLoading = false
  },
  CHANGE_FORM_EDIT_VALUE_BODY(state, body) {
    state.answer.body = body
  }
}

const actions = {
  findOne({ commit }, answerId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/answers/${answerId}`
        })
        commit('SET_ANSWER', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  upvote({ commit }, answerId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `/answers/${answerId}/upvote`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  downvote({ commit }, answerId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `/answers/${answerId}/downvote`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  answersUser({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/answers/${payload.userId}/myanswers`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        commit('SET_ALL_ANSWERS', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },

  update({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `/answers/${payload.answerId}/update`,
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: {
            body: payload.body
          }
        })
        commit('SET_ANSWER', data)
        resolve()
      } catch (err) {
        reject(err)
      }
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
