<template>
  <div class="login">
    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailures="onFailure">Login with google</GoogleLogin>
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
      this.$router.push('/')
      
    },
    onFailure() {
      alert("failure")
    }
  }
}
</script>

<style>
.login {
  height: 500px;
}
</style>