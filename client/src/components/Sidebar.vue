<template>
  <q-drawer v-model="leftDrawerOpen" content-class="bg-grey-2">
    <q-list>
      <q-item-label header>Menu</q-item-label>
      <q-item to="/" exact>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/tags" disabled exact>
        <q-item-section avatar>
          <q-icon name="local_offer" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Tags (WIP)</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/users" disabled exact>
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Users (WIP)</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header>Dashboard</q-item-label>
      <q-item disabled exact>
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Profile (WIP)</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isLogin" :to="yourQuestionsPath" exact>
        <q-item-section avatar>
          <q-icon name="help" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Your questions</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="isLogin" :to="yourAnswersPath" exact>
        <q-item-section avatar>
          <q-icon name="question_answer" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Your answers</q-item-label>
        </q-item-section>
      </q-item>
      <q-item disabled exact>
        <q-item-section avatar>
          <q-icon name="settings_applications" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings (WIP)</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label v-if="isLogin" header>Actions</q-item-label>
      <q-item v-if="isLogin" clickable tag="a" @click="signout">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sign out</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState('users', ['userId', 'isLogin']),
    yourQuestionsPath() {
      return `/users/${this.userId}/questions`
    },
    yourAnswersPath() {
      return `/users/${this.userId}/answers`
    }
  },
  methods: {
    signout() {
      this.$store
        .dispatch('users/signout')
        .then(_ => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'mood',
            position: 'top',
            message: `Thank you`
          })
          this.$router.push('/').catch(err => {})
        })
        .catch(console.log)
    }
  }
}
</script>
