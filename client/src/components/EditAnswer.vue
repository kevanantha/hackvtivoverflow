<template>
  <div class="q-pa-md" style="width: 85%; margin: auto">
    <div style="text-align: center" v-if="isLoading">
      <h2>Loading...</h2>
    </div>
    <q-form v-if="!isLoading" style="margin-top: 10%" class="q-gutter-md">
      <div class="text-h4">
        Edit Answer
      </div>

      <q-editor :value="answer.body" @input="updateBody" min-height="5rem" />

      <div>
        <q-btn :loading="loadingBtn" label="Submit" @click.prevent="onSubmit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditAnswer',
  data() {
    return {
      body: '',
      loadingBtn: false
    }
  },
  computed: {
    ...mapState('answers', ['answer', 'isLoading'])
  },
  methods: {
    updateBody(body) {
      this.$store.commit('answers/CHANGE_FORM_EDIT_VALUE_BODY', body)
    },
    onSubmit() {
      this.loadingBtn = true
      this.$store
        .dispatch('answers/update', {
          body: this.answer.body,
          answerId: this.$route.params.answerId
        })
        .then(data => {
          this.loadingBtn = false
          this.body = ''
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'mood',
            position: 'top',
            message: `Success edit answer`
          })
          this.$router.push(`/users/${this.$route.params.userId}/answers`).catch(err => {})
        })
        .catch(err => {
          this.loadingBtn = false
          this.body = ''
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
    this.$store.dispatch('answers/findOne', this.$route.params.answerId)
  }
}
</script>
