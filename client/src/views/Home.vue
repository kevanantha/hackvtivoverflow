<template>
  <div>
    <Sidebar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Home',
  components: {
    Sidebar
  }
}
</script>
