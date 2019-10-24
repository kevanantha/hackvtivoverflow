<template>
  <div class="q-pa-md" style="width: 85%; margin: auto">
    <div style="text-align: center" v-if="isLoading">
      <h2>Loading...</h2>
    </div>
    <q-form v-if="!isLoading" style="margin-top: 10%" class="q-gutter-md">
      <div class="text-h4">
        Edit Question
      </div>
      <q-input :value="question.title" @input="updateTitle" label="Title" outlined dense />

      <q-editor :value="question.description" @input="updateDescription" min-height="5rem" />

      <q-input v-model="tag" label="Tags" lazy-rules outlined dense @keyup.enter="addTags" />
      <q-btn
        v-if="question.tags.length"
        v-for="(tag, i) in question.tags"
        @click="remove(tag)"
        color="primary"
        icon="local_offer"
        :key="i"
        outline
        dense
        :label="tag"
      />

      <div>
        <q-btn :loading="loadingBtn" label="Submit" @click.prevent="onSubmit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditQuestion',
  data() {
    return {
      title: '',
      description: '',
      tag: null,
      tags: [],
      loadingBtn: false
    }
  },
  computed: {
    ...mapState('questions', ['question', 'isLoading'])
  },
  methods: {
    remove(target) {
      const filter = this.tags.filter(tag => tag !== target)
      this.tags = filter
    },
    updateTitle(title) {
      this.$store.commit('questions/CHANGE_FORM_EDIT_VALUE_TITLE', title)
    },
    updateDescription(description) {
      this.$store.commit('questions/CHANGE_FORM_EDIT_VALUE_DESCRIPTION', description)
    },
    updateTags(tags) {
      this.$store.commit('questions/CHANGE_FORM_EDIT_VALUE_TAGS', tags)
    },
    addTags() {
      this.tags.push(this.tag)
      this.this.tag = null
    },
    onSubmit() {
      this.loadingBtn = true
      this.$store
        .dispatch('questions/update', {
          title: this.question.title,
          description: this.question.description,
          tags: this.question.tags,
          questionId: this.$route.params.questionId
        })
        .then(data => {
          this.loadingBtn = false
          this.title = ''
          this.description = ''
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
          this.title = ''
          this.description = ''
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
  },
  mounted() {
    this.$store.dispatch('questions/detailQuestion', this.$route.params)
  }
}
</script>
