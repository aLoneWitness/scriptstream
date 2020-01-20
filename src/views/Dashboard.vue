<template>
  <div>
    <project-overview></project-overview>
    <skill-overview></skill-overview>
  </div>
</template>

<script>
import SkillOverview from '../components/SkillOverview.vue'
import ProjectOverview from '../components/ProjectOverview.vue'

export default {
    mounted: function() {
        // let axiosConfig = {
        //   headers: {
        //     'Authorization': 'Bearer ' + this.$store.state.token
        //   }
        // };

        
    },
    components: {
      SkillOverview,
      ProjectOverview
    }
}
</script>

<style>

</style>