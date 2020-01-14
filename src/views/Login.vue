<template>
  <div class="login">
    <h2>Please log in to continue.</h2>
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailures="onFailure">Login with google</GoogleLogin>
  </div>
</template>

<script>

import GoogleLogin from 'vue-google-login';

export default {
  data() {
    return {
      params: {
        client_id: "156633696944-p3ud87unloob34dobt770plf00hliqhu.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      result: Object
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess(googleUser) {
      this.$store.dispatch('login', googleUser)
      .then(() => {
        this.$router.push('/')
      })
    },
    onFailure() {
      alert("failure")
    }
  }
}
</script>

<style>
.login {
  align-content: center;
  background-color: whitesmoke;
}
.abcRioButton {
  margin: auto;
}
</style>