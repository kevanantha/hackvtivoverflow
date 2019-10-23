<template>
  <div id="app">
    <q-layout class="bg-grey-1" view="hHh lpR lFf">
      <Navbar />
      <router-view />
    </q-layout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
