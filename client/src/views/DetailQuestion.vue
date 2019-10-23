<template>
  <div>
    <div v-if="isLoading">Loading...</div>

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
              <div v-html="question.description"></div>
            </q-card-section>

            <Tag v-for="(tag, i) in question.tags" :key="i" :tag="tag" />
          </div>
        </div>
      </q-card>
    </div>

    <div>
      <q-separator inset />
      <q-card flat>
        <q-card-section style="padding-left: 0">
          <h2>hello</h2>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Tag from '@/components/Tag'

export default {
  name: 'DetailQuestion',
  components: {
    Tag
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
