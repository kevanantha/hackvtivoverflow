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
import io from 'socket.io-client'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      socket: io.connect('http://localhost:3000')
    }
  },
  created() {
    this.socket.on('getQuotes', data => {
      console.log(data)
      this.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'mood',
        position: 'top',
        message: `${data.body}`
      })
    })
  }
}
</script>
