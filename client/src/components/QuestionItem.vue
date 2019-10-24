<template>
  <q-card flat>
    <q-card-section style="display: flex">
      <router-link :to="question | slug" style="text-decoration: none; color: #000">
        <div style="cursor: pointer; " class="text-h6">
          {{ question.title }}
        </div>
      </router-link>
      <div v-if="isOwner" style="margin-left: auto">
        <router-link :to="question | slugEdit">
          <q-btn flat round>
            <q-icon size="17px" color="primary" name="edit" />
          </q-btn>
        </router-link>

        <q-btn @click="destroy(question._id)" flat round>
          <q-icon size="17px" color="negative" name="delete" />
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section>
      {{ question.description | truncateDesc }}
    </q-card-section>

    <q-card-section style="display: flex ">
      <div style="">
        <Tag v-for="(tag, i) in question.tags" :key="i" :tag="tag" />
      </div>
      <div style="margin-left: auto; display: flex">
        <div style="margin-left: 1rem; color: grey; font-weight: bold">
          <span v-if="question.votes.length > 1">{{ question.votes.length }} votes</span>
          <span v-else>{{ question.votes.length }} vote</span>
        </div>
        <div style="margin-left: 1rem; color: grey; font-weight: bold">
          <span v-if="question.answerId.length > 1">{{ question.answerId.length }} answers</span>
          <span v-else>{{ question.answerId.length }} answer</span>
        </div>
        <div style="margin-left: 1rem; color: grey; font-weight: bold">
          <span>{{ Math.floor(Math.random() * 100) }} views</span>
        </div>
      </div>
    </q-card-section>
    <q-separator inset />
  </q-card>
</template>

<script>
import truncate from 'truncate-html'
import { mapState } from 'vuex'

import Tag from '@/components/Tag'

export default {
  name: 'QuestionList',
  props: ['question'],
  components: {
    Tag
  },
  computed: {
    ...mapState('users', ['userId']),
    isOwner() {
      if (this.question.userId == this.userId) return true
      else return false
    }
  },
  filters: {
    truncateDesc(v) {
      return truncate(v, 100, { decodeEntities: true, stripTags: true, ellipsis: '' })
    },
    slug(v) {
      const title = v.title.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      return `/questions/${v._id}/${title}`
    },
    slugEdit(v) {
      const title = v.title.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      return `/questions/${v._id}/${title}/edit`
    }
  },
  methods: {
    destroy(id) {
      this.$q
        .dialog({
          title: 'Delete Question',
          message: 'Are you sure want to delete this question?',
          cancel: true,
          persist: true
        })
        .onOk(() => {
          this.$q.loadingBar.start()
          this.$store
            .dispatch('questions/delete', id)
            .then(_ => {
              this.$q.loadingBar.stop()
              this.$q.notify({
                color: 'positive',
                textColor: 'white',
                icon: 'mood',
                position: 'top',
                message: `Deleted`
              })
              this.$store.dispatch('questions/findAll')
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
        })
    }
  }
}
</script>
