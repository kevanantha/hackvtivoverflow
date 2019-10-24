<template>
  <div style="margin: 0 4rem">
    <div style="text-align: center" v-if="isLoading">
      <h2>Loading...</h2>
    </div>
    <div v-if="!isLoading && !questions.length" style="text-align: center">
      <h3>No Data</h3>
    </div>
    <div v-if="!isLoading && questions.length">
      <h3>Your Questions</h3>

      <QuestionItem v-for="question in questions" :key="question._id" :question="question" />

      <!-- <q-separator inset /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionItem from '@/components/QuestionItem'

export default {
  name: 'YourQuestions',
  components: {
    QuestionItem
  },
  computed: {
    ...mapState('questions', ['questions', 'isLoading'])
  },
  mounted() {
    this.$q.loadingBar.start()
    this.$store
      .dispatch('questions/questionsUser', this.$route.params)
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
