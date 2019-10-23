import axios from '@/apis/api'

const state = {
  isLoading: true,
  questions: [],
  question: {}
}

const getters = {
  totalVotes() {
    if (state.question.votes) {
      return state.question.votes.map(vote => vote.voteType).reduce((acc, curr) => acc + curr, 0)
    }
    return 0
  }
}

const mutations = {
  PUSH_QUESTIONS(state, payload) {
    state.questions.push(payload)
  },
  SET_ALL_QUESTIONS(state, payload) {
    state.questions = payload
    state.isLoading = false
  },
  SET_QUESTION(state, payload) {
    state.question = payload
    state.isLoading = false
  }
}

const actions = {
  create({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(payload)
        const { data } = await axios({
          method: 'post',
          url: '/questions/create',
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: payload
        })
        console.log(data)
        commit('PUSH_QUESTIONS', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  async findAll({ commit }) {
    const { data: questions } = await axios({
      method: 'get',
      url: '/questions'
    })
    commit('SET_ALL_QUESTIONS', questions)
  },
  detailQuestion({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: question } = await axios({
          method: 'get',
          url: `http://localhost:3000/questions/${payload.questionId}`
        })
        commit('SET_QUESTION', question)
        console.log(question)
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
