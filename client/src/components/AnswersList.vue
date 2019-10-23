<template>
  <div>
    <q-separator inset />
    <q-card-section style="">
      <h5>{{ totalAnswers }}</h5>
    </q-card-section>
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
        <q-card-section style="">
          <AnswerItem v-for="answer in answers" :key="answer._id" :answer="answer" />
        </q-card-section>
      </div>
    </div>
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
  },
  methods: {
    upvote() {},
    downvote() {}
  }
}
</script>
