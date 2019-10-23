<template>
  <div class="q-pa-md" style="max-width: 400px; margin: auto">
    <q-form @submit.prevent="onSubmit" @reset="onReset" style="margin-top: 30%" class="q-gutter-md">
      <q-input v-model="name" label="Name" lazy-rules outlined dense />

      <q-input v-model="email" label="Email" type="email" lazy-rules outlined dense />

      <q-input
        v-model="password"
        outlined
        lazy-rules
        dense
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        hint="Min 6 characters"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn :loading="loadingBtn" label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      isPwd: true,
      loadingBtn: false
    }
  },
  methods: {
    onSubmit() {
      this.loadingBtn = true
      this.$store
        .dispatch('users/signup', {
          email: this.email,
          name: this.name,
          password: this.password
        })
        .then(_ => {
          this.email = null
          this.name = null
          this.password = null
          this.loadingBtn = false
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'mood',
            position: 'top',
            message: `Welcome back`
          })
          this.$router.push('/').catch(err => {})
        })
        .catch(err => {
          this.email = null
          this.name = null
          this.password = null
          this.loadingBtn = false
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'report_problem',
            position: 'top',
            message: `${err.response.data.join(', ')}`
          })
        })
    },
    onReset() {
      this.email = null
      this.name = null
      this.password = null
    }
  }
}
</script>
