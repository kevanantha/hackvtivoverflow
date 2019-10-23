<template>
  <div style="margin: 0 4rem">
    <div v-if="isLoading">loading...</div>
    <div v-if="!isLoading && questions.length">
      <h3>All Questions</h3>

      <QuestionItem v-for="question in questions" :key="question._id" :question="question" />

      <!-- <q-separator inset /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionItem from '@/components/QuestionItem'

export default {
  name: 'HomeContainer',
  components: {
    QuestionItem
  },
  computed: {
    ...mapState('questions', ['questions', 'isLoading'])
  },
  mounted() {
    this.$store.dispatch('questions/findAll')
  }
}
</script>
