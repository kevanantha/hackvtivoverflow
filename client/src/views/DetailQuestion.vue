<template>
  <div>
    <div style="text-align: center" v-if="isLoading">
      <h2>Loading...</h2>
    </div>

    <div v-if="!isLoading">
      <q-card flat>
        <q-card-section>
          <div class="text-h4">
            {{ question.title }}
          </div>
          <div style="margin-top: 1rem">
            Asked today
          </div>
        </q-card-section>

        <q-separator inset />

        <div class="row">
          <div class="col-1" style="text-align: center">
            <q-icon
              @click="upvote"
              v-if="isAldUpVote"
              size="xl"
              color="primary"
              style="margin-top: 1rem; cursor: pointer"
              name="arrow_drop_up"
            />
            <q-icon
              @click="upvote"
              v-if="!isAldUpVote"
              size="xl"
              color="grey-5"
              style="margin-top: 1rem; cursor: pointer"
              name="arrow_drop_up"
            />
            <div style="color: grey">
              {{ totalVotes }}
            </div>
            <q-icon
              @click="downvote"
              v-if="isAldDownVote"
              size="xl"
              color="primary"
              style="cursor: pointer"
              name="arrow_drop_down"
            />
            <q-icon
              @click="downvote"
              v-if="!isAldDownVote"
              size="xl"
              color="grey-5"
              style="cursor: pointer"
              name="arrow_drop_down"
            />
          </div>
          <div class="col-11">
            <q-card-section style="padding-left: 0">
              <div style="display: inline-block">
                <div v-html="question.description"></div>
              </div>
            </q-card-section>

            <div style="display: flex; margin-bottom: 2rem">
              <div>
                <Tag v-for="(tag, i) in question.tags" :key="i" :tag="tag" />
              </div>
              <div style="margin-left: auto; margin-right: 1rem">
                <q-btn
                  size="15px"
                  color="blue-1"
                  textColor="blue"
                  no-caps
                  style="margin-right: 0.7rem"
                  unelevated
                >
                  Asked by: {{ question.userId.name }}
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <div>
      <q-card flat>
        <AnswersList
          v-if="question.answerId && question.answerId.length && !isLoading"
          :answers="question.answerId"
        />

        <q-card-section style="">
          <AnswerForm />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Tag from '@/components/Tag'
import AnswersList from '@/components/AnswersList'
import AnswerForm from '@/components/AnswerForm'

export default {
  name: 'DetailQuestion',
  components: {
    Tag,
    AnswerForm,
    AnswersList
  },
  computed: {
    ...mapState('questions', ['question', 'isLoading']),
    ...mapGetters('questions', ['totalVotes', 'isAldUpVote', 'isAldDownVote'])
  },
  methods: {
    upvote() {
      this.$store
        .dispatch('questions/upvote', this.$route.params)
        .then(_ => {
          return this.$store.dispatch('questions/detailQuestion', this.$route.params)
        })
        .then(_ => {})
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
        .dispatch('questions/downvote', this.$route.params)
        .then(_ => {
          return this.$store.dispatch('questions/detailQuestion', this.$route.params)
        })
        .then(_ => {})
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
    this.$store.dispatch('questions/detailQuestion', this.$route.params).catch(err => {
      this.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'report_problem',
        position: 'top',
        message: `${err.response.data}`
      })
    })
  }
}
</script>
