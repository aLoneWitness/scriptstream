<template>
  <div class="home">
    <codeview></codeview>
    <chatbar>
    </chatbar>
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
    Codeview
  }
};
</script>

<style scoped>

</style>
