import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import LoginForm from './views/LoginForm.vue'
import RegisterForm from './views/RegisterForm.vue'
import AskQuestion from './views/AskQuestion.vue'
import HomeContainer from './components/HomeContainer.vue'
import TagsContainer from './components/TagsContainer.vue'
import DetailQuestion from './views/DetailQuestion.vue'
import YourQuestions from './components/YourQuestions.vue'
import YourAnswers from './components/YourAnswers.vue'
import EditQuestion from './components/EditQuestion.vue'
import EditAnswer from './components/EditAnswer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'home',
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
        },
        {
          path: '/questions/:questionId/:questionTitle/edit',
          name: 'question edit',
          component: EditQuestion
        },
        {
          path: '/users/:userId/questions',
          name: 'your questions',
          component: YourQuestions
        },
        {
          path: '/users/:userId/answers',
          name: 'your answers',
          component: YourAnswers
        },
        {
          path: '/users/:userId/answers/:answerId/edit',
          name: 'edit answers',
          component: EditAnswer
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
