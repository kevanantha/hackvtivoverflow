<template>
  <q-card flat>
    <q-card-section>
      <router-link :to="question | slug" style="text-decoration: none; color: #000">
        <div style="cursor: pointer" class="text-h6">
          {{ question.title }}
        </div>
      </router-link>
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

import Tag from '@/components/Tag'

export default {
  name: 'QuestionList',
  props: ['question'],
  components: {
    Tag
  },
  filters: {
    truncateDesc(v) {
      return truncate(v, 100, { decodeEntities: true, stripTags: true, ellipsis: '' })
    },
    slug(v) {
      return `/questions/${v._id}/${v.title
        .split(' ')
        .join('-')
        .toLowerCase()}`
    }
  }
}
</script>
