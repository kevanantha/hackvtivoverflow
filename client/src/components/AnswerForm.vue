<template>
  <div class="q-pa-md" style="min-width: 600px">
    <h5>Your answer</h5>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-editor v-model="body" min-height="5rem" />
      <div>
        <q-btn :loading="loadingBtn" label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'AnswerForm',
  data() {
    return {
      body: '',
      loadingBtn: false
    }
  },
  methods: {
    onSubmit() {
      this.loadingBtn = true
      this.$store
        .dispatch('questions/answerSubmit', {
          body: this.body,
          questionId: this.$route.params.questionId
        })
        .then(_ => {
          this.$store.dispatch('questions/detailQuestion', this.$route.params)
          this.loadingBtn = false
          this.body = ''
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'mood',
            position: 'top',
            message: `Success add question`
          })
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
  }
}
</script>
