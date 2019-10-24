import axios from '@/apis/api'
import { verifyToken } from '@/helpers/jwt'

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
  },
  isAldUpVote() {
    if (localStorage.getItem('token')) {
      const decode = verifyToken(localStorage.getItem('token'))
      const filter = state.question.votes.filter(vote => vote.userId == decode.id)
      if (filter.length) {
        if (filter[0].voteType == 1) return true
        return false
      }
      return false
    }
  },
  isAldDownVote() {
    if (localStorage.getItem('token')) {
      const decode = verifyToken(localStorage.getItem('token'))
      const filter = state.question.votes.filter(vote => vote.userId == decode.id)
      if (filter.length) {
        if (filter[0].voteType == -1) return true
        return false
      }
      return false
    }
  },
  totalAnswers() {
    if (state.question.answerId) {
      if (state.question.answerId.length > 1) {
        return state.question.answerId.length + ' answers'
      } else {
        return state.question.answerId.length + ' answer'
      }
    }
    return 0
  }
  // totalVotesAnswer() {
  //   if (state.question.answerId) {
  //     console.log(state.question.answerI)
  //     return state.question.answerId.map(vote => vote.voteType).reduce((acc, curr) => acc + curr, 0)
  //   }
  //   return 0
  // }
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
  },
  CHANGE_FORM_EDIT_VALUE_TITLE(state, title) {
    state.question.title = title
  },
  CHANGE_FORM_EDIT_VALUE_DESCRIPTION(state, description) {
    state.question.description = description
  },
  CHANGE_FORM_EDIT_VALUE_TAGS(state, tags) {
    state.question.tags = tags
  }
}

const actions = {
  create({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'post',
          url: '/questions/create',
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: payload
        })
        commit('PUSH_QUESTIONS', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  findAll({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: questions } = await axios({
          method: 'get',
          url: '/questions'
        })
        commit('SET_ALL_QUESTIONS', questions)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  detailQuestion({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: question } = await axios({
          method: 'get',
          url: `/questions/${payload.questionId}`
        })
        commit('SET_QUESTION', question)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  upvote({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `/questions/${payload.questionId}/upvote`,
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
  downvote({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `/questions/${payload.questionId}/downvote`,
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
  answerSubmit({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'post',
          url: `/questions/${payload.questionId}/answer/submit`,
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: payload
        })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  questionsUser({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/questions/${payload.userId}/myquestions`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        commit('SET_ALL_QUESTIONS', data)
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
          method: 'put',
          url: `/questions/${payload.questionId}/update`,
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            description: payload.description,
            tags: payload.tags
          }
        })
        commit('SET_QUESTION', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  delete({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `/questions/${id}/delete`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
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
