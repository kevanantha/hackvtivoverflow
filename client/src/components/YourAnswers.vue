<template>
  <div style="margin: 0 4rem">
    <div style="text-align: center" v-if="isLoading">
      <h2>Loading...</h2>
    </div>
    <div v-if="!isLoading && !answers.length" style="text-align: center">
      <h3>No Data</h3>
    </div>
    <div v-if="!isLoading && answers.length">
      <h3>Your Answers</h3>

      <AnswerItem
        v-for="answer in answers"
        :isMyAnswers="true"
        :key="answer._id"
        :answer="answer"
      />

      <!-- <q-separator inset /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AnswerItem from '@/components/AnswerItem'

export default {
  name: 'YourAnswers',
  components: {
    AnswerItem
  },
  computed: {
    ...mapState('answers', ['answers', 'isLoading'])
  },
  mounted() {
    this.$q.loadingBar.start()
    this.$store
      .dispatch('answers/answersUser', this.$route.params)
      .then(_ => {
        this.$q.loadingBar.stop()
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
}
</script>
