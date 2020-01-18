<template>
  <div class="projbar">
    <h2>Projects</h2>
    <b-button v-on:click="addProject()" variant="success" id="addbtn">New project</b-button>
    <b-list-group class="ownedprojects">
      <b-list-group-item v-for="oProject in ownedProjects" :key="oProject">
        {{oProject.name}}
        <b-button v-on:click="gotoProject(oProject)" variant="success" style="float: right" size="sm">Join</b-button>
        <b-button v-on:click="deleteProject(oProject)" variant="danger" style="float: right" size="sm">Delete</b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios.get("http://localhost:2000/rest/user/getownedprojects")
      .then(response => {
        this.ownedProjects = response.data
      })

    axios.get("http://localhost:2000/rest/user/getjoinedprojects")
      .then(response => {
        this.joinedProjects = response.data
      })
  },
  data() {
    return {
      ownedProjects: Object,
      joinedProjects: Object
    }
  },
  methods: {
    addProject() {
      var project = {
        name: "My New Project",
        requiredSkills: [
          {
            name: "ML",
            sPercentage: 30
          },
          {
            name: "Python",
            sPercentage: 30
          }
        ]
      }
      axios.post('http://localhost:2000/rest/user/createproject', project)
      .then(() => {
        axios.get('http://localhost:2000/rest/user/getownedprojects')
        .then(response => {
          this.ownedProjects = response.data
        })
      })
    },
    gotoProject(project) {
      this.$router.push({ name: 'project', params: { projectuuid: project.uuid } })
    }
  }
}
</script>

<style>
.projbar {
  background-color: #f92672;
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 50%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
.projbar > h2 {
  color: #1e1f1c;
}
#addbtn {
  margin-bottom: 20px;
  width: 70%;
}
</style>