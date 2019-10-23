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
              size="xl"
              color="grey-5"
              style="margin-top: 1rem; cursor: pointer"
              name="arrow_drop_up"
            />
            <div style="color: grey">
              <!-- 1282 -->
              {{ totalVotes }}
            </div>
            <q-icon
              @click="downvote"
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
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DetailQuestion',
  computed: {
    ...mapState('questions', ['question', 'isLoading']),
    ...mapGetters('questions', ['totalVotes'])
  },
  methods: {
    upvote() {
      console.log('up')
    },
    downvote() {
      console.log('down')
    }
  },
  mounted() {
    this.$store
      .dispatch('questions/detailQuestion', this.$route.params)
      .then(_ => {})
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>
