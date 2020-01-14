<template>
  <div>
      <h2>Dashboard</h2>
      
  </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted: function() {
        alert("getting projs " + this.$store.state.token)
        let axiosConfig = {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.token
          }
        };

        axios.get('http://localhost:2000/rest/user/getprojects', axiosConfig)
        .then(response => {
            alert(response.data)
        })
    },
    data() {
        return {
            projects: [],
        }
    }
}
</script>

<style>

</style>