<template>
  <div>
    <codeview v-bind:projectUUID="$route.params.uuid" v-bind:projectName="$route.params.project.name"></codeview>
    <chatbar v-bind:projectUUID="$route.params.uuid"></chatbar>
  </div>
</template>

<script>
// @ is an alias to /src
import Chatbar from '../components/Chatbar.vue'
import Codeview from '../components/Codeview.vue'

export default {
  name: "home",
  components: {
    Chatbar,
    Codeview,
  },
  props: {
    projectName: {
      type: String,
      default: 'A project of unknown origin.'
    },
    User: {
      type: Object
    }
  },
};
</script>

<style scoped>
</style>
