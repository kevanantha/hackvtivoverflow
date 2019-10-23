<template>
  <div class="q-pa-md" style="max-width: 600px; margin: auto">
    <q-form @submit.prevent="onSubmit" style="margin-top: 30%" class="q-gutter-md">
      <q-input
        v-model="title"
        label="Title"
        lazy-rules
        outlined
        dense
        :rules="[val => (val && val.length > 0) || 'Please enter your title']"
      />

      <q-editor v-model="description" min-height="5rem" />

      <q-input v-model="tag" label="Tags" lazy-rules outlined dense @keyup.space="addTags" />
      <q-btn
        v-if="tags.length"
        v-for="(tag, i) in tags"
        color="primary"
        icon="local_offer"
        :key="i"
        outline
        dense
        :label="tag"
      />

      <div>
        <q-btn :loading="loadingBtn" label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'AskQuestion',
  data() {
    return {
      title: '',
      description: '',
      tag: null,
      tags: [],
      loadingBtn: false
    }
  },
  methods: {
    addTags() {
      this.tags.push(this.tag)
      this.tag = null
    },
    onSubmit() {
      this.loadingBtn = true
      this.$store
        .dispatch('questions/create', {
          title: this.title,
          description: this.description,
          tags: this.tags
        })
        .then(data => {
          this.loadingBtn = false
          this.title = null
          this.description = null
          this.tags = []
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'mood',
            position: 'top',
            message: `Success add question`
          })
          this.$router.push('/').catch(err => {})
        })
        .catch(err => {
          this.loadingBtn = false
          this.title = null
          this.description = null
          this.tags = []
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
