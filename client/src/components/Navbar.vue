<template>
  <q-header bordered class="text-black" style="background: #fff">
    <q-toolbar>
      <router-link to="/">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="all_inclusive"
        />
      </router-link>

      <q-toolbar-title>
        <router-link style="text-decoration: none; color: #3F89E4" to="/">
          <span style="font-weight: bold">
            Stuckoverlow
          </span>
        </router-link>
      </q-toolbar-title>

      <q-input
        style="width: 55%"
        class="bg-white"
        dense
        standout="bg-primary"
        v-model="search"
        placeholder="Search"
      >
        <template v-slot:prepend>
          <q-icon v-if="search === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
        </template>
      </q-input>

      <q-space />

      <router-link to="/users/signin">
        <q-btn
          v-if="!isLogin"
          no-wrap
          color="primary"
          outline
          no-caps
          unelevated
          label="Sign in"
          class="q-ml-sm q-px-md primary"
        />
      </router-link>

      <router-link to="/users/signup">
        <q-btn
          v-if="!isLogin"
          no-wrap
          color="primary"
          no-caps
          unelevated
          label="Sign up"
          class="q-ml-sm q-px-md primary"
        />
      </router-link>

      <router-link v-if="isLogin" to="/questions/ask">
        <q-btn
          flat
          dense
          no-wrap
          color="white"
          icon="add"
          no-caps
          label="Ask a question"
          class="q-ml-sm q-px-md bg-primary"
        >
          <q-menu anchor="top right" self="top right">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem">
                  Ask a question
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </router-link>

      <div style="margin-left: 0.4rem" class="q-gutter-sm row items-center no-wrap">
        <q-btn v-if="isLogin" no-caps flat>
          {{ name }}
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState('users', ['isLogin', 'name'])
  },
  mounted() {
    this.$store.commit('users/IS_LOGIN')
  }
}
</script>
