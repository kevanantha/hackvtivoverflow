<template>
  <div>
    <q-card-section style="">
      <h5 style="margin-bottom: 1rem">{{ totalAnswers }}</h5>
      <q-separator inset />
    </q-card-section>
    <AnswerItem v-for="answer in answers" :key="answer._id" :answer="answer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AnswerItem from '@/components/AnswerItem'

export default {
  name: 'AnswersList',
  props: ['answers'],
  components: {
    AnswerItem
  },
  computed: {
    ...mapGetters('questions', ['totalAnswers'])
  }
}
</script>
