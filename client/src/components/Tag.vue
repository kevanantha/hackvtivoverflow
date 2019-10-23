<template>
  <q-btn
    size="11px"
    color="blue-1"
    textColor="blue"
    no-caps
    style="margin-right: 0.7rem"
    unelevated
  >
    {{ tag }}
  </q-btn>
</template>

<script>
export default {
  name: 'Tag',
  props: ['tag']
}
</script>
