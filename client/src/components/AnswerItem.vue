<template>
  <div>
    <div class="row">
      <div class="col-1" style="text-align: center">
        <!-- <q-icon -->
        <!--   @click="upvote" -->
        <!--   v-if="isAldUpVote" -->
        <!--   size="xl" -->
        <!--   color="primary" -->
        <!--   style="margin-top: 1rem; cursor: pointer" -->
        <!--   name="arrow_drop_up" -->
        <!-- /> -->
        <q-icon
          @click="upvote"
          size="xl"
          color="grey-5"
          style="margin-top: 1rem; cursor: pointer"
          name="arrow_drop_up"
        />
        <div style="color: grey">
          {{ answer.votes | total }}
        </div>
        <!-- <q-icon -->
        <!--   @click="downvote" -->
        <!--   v-if="isAldDownVote" -->
        <!--   size="xl" -->
        <!--   color="primary" -->
        <!--   style="cursor: pointer" -->
        <!--   name="arrow_drop_down" -->
        <!-- /> -->
        <q-icon
          @click="downvote"
          size="xl"
          color="grey-5"
          style="cursor: pointer"
          name="arrow_drop_down"
        />
      </div>
      <div class="col-11">
        <q-card-section v-if="isMyAnswers && answer.question">
          <router-link :to="answer.question | slug" style="text-decoration: none; color: #000">
            <div style="cursor: pointer" class="text-h6">
              {{ answer.question.title }}
            </div>
          </router-link>
        </q-card-section>

        <q-card-section style="">
          <div class="cursor-pointer">
            <div v-html="answer.body"></div>
            <q-popup-edit v-model="body">
              <!-- <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }"> -->
              <q-form @submit.prevent="onSubmit(answer._id)" class="q-gutter-md">
                <q-editor v-model="body" min-height="5rem" />
                <div>
                  <q-btn :loading="loadingBtn" label="Submit" type="submit" color="primary" />
                </div>
              </q-form>
              <!-- </template> -->
            </q-popup-edit>
          </div>
        </q-card-section>
      </div>
    </div>
    <q-separator inset />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AnswerItem',
  props: ['answer', 'isMyAnswers'],
  computed: {
    ...mapGetters('answers', ['isAldUpVote', 'isAldDownVote', 'total']),
    ...mapState('users', ['userId']),
    body: {
      get() {
        return this.$store.state.answers.answer.body
      },
      set(value) {
        this.$store.commit('answers/CHANGE_FORM_EDIT_VALUE_BODY', value)
      }
    }
  },
  data() {
    return {
      nickname: 'hello',
      loadingBtn: false
    }
  },
  filters: {
    total(v) {
      return v.map(vote => vote.voteType).reduce((acc, curr) => acc + curr, 0)
    },
    slug(v) {
      const title = v.title.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      return `/questions/${v._id}/${title}`
    }
  },
  methods: {
    upvote() {
      this.$store
        .dispatch('answers/upvote', this.answer._id)
        .then(_ => {
          return this.$store.dispatch('answers/findOne', this.answer._id)
        })
        .then(_ => {
          if (!this.isMyAnswers) {
            return this.$store.dispatch('questions/detailQuestion', this.$route.params)
          } else {
            this.$store.dispatch('answers/answersUser', this.$route.params)
          }
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'report_problem',
            position: 'top',
            message: `${err.response.data}`
          })
        })
    },
    downvote() {
      this.$store
        .dispatch('answers/downvote', this.answer._id)
        .then(_ => {
          return this.$store.dispatch('answers/findOne', this.answer._id)
        })
        .then(_ => {
          if (!this.isMyAnswers) {
            return this.$store.dispatch('questions/detailQuestion', this.$route.params)
          } else {
            this.$store.dispatch('answers/answersUser', this.$route.params)
          }
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'report_problem',
            position: 'top',
            message: `${err.response.data}`
          })
        })
    },
    updateBody(body) {
      this.$store.commit('answers/CHANGE_FORM_EDIT_VALUE_BODY', body)
    },
    onSubmit(id) {
      this.loadingBtn = true
      this.$store
        .dispatch('answers/update', {
          body: this.body,
          answerId: id
        })
        .then(data => {
          this.loadingBtn = false
          //this.body = ''
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'mood',
            position: 'top',
            message: `Success update answer`
          })
          this.$router.push('/').catch(err => {})
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'report_problem',
            position: 'top',
            message: `${err.response.data}`
          })
        })
    }
  },
  mounted() {
    //this.$store.commit('answers/SET_ANSWER', this.answer)
    this.$store.dispatch('answers/findOne', this.answer._id)
  }
}
</script>
