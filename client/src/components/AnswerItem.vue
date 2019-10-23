<template>
  <div>
    <div v-html="answer.body"></div>
  </div>
</template>

<script>
export default {
  name: 'AnswerItem',
  props: ['answer']
}
</script>
