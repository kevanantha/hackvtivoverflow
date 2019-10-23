import Vue from 'vue'
import Router from 'vue-router'
// import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import LoginForm from './views/LoginForm.vue'
import RegisterForm from './views/RegisterForm.vue'
import AskQuestion from './views/AskQuestion.vue'
import HomeContainer from './components/HomeContainer.vue'
import TagsContainer from './components/TagsContainer.vue'
import DetailQuestion from './views/DetailQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'home container',
          component: HomeContainer
        },
        {
          path: '/tags',
          name: 'tags container',
          component: TagsContainer
        },
        {
          path: '/questions/:questionId/:questionTitle',
          name: 'question detail',
          component: DetailQuestion
        }
      ]
    },
    {
      path: '/users/signin',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/users/signup',
      name: 'signup',
      component: RegisterForm
    },
    {
      path: '/questions/ask',
      name: 'ask question',
      component: AskQuestion
    }
  ]
})
