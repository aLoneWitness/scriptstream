<template>
  <div>
    <project-overview></project-overview>
    <skill-overview></skill-overview>
  </div>
</template>

<script>
import axios from 'axios';
import SkillOverview from '../components/SkillOverview.vue'
import ProjectOverview from '../components/ProjectOverview.vue'

export default {
    mounted: function() {
        // let axiosConfig = {
        //   headers: {
        //     'Authorization': 'Bearer ' + this.$store.state.token
        //   }
        // };

        axios.get('http://localhost:2000/rest/user/getprojects')
        .then(response => {
          this.projects = response.data
        })
    },
    data() {
        return {
            projects: Object,
        }
    },
    components: {
      SkillOverview,
      ProjectOverview
    }
}
</script>

<style>

</style>