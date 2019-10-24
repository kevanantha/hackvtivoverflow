import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import questions from './modules/questions'
import answers from './modules/answers'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    users,
    questions,
    answers
  }
})
