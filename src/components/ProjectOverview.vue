<template>
  <div class="projbar">
    <h2>Projects</h2>
    <b-button v-b-modal.modal-prevent-closing variant="success" id="addbtn">New project</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add a project"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
            >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-list-group class="ownedprojects">
      <b-list-group-item v-for="oProject in ownedProjects" :key="oProject">
      {{oProject.name}}
        <b-button-group style="float: right">
          <b-button v-on:click="gotoProject(oProject)" variant="success" size="sm">Join</b-button>
          <b-button v-on:click="deleteProject(oProject)" variant="danger" size="sm">Delete</b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group> 
    <b-button v-on:click="match()" variant="success" id="matchbtn">Match me with a project</b-button>

    <b-list-group class="joinedprojects">
      <b-list-group-item v-for="jProject in joinedProjects" :key="jProject">
      {{jProject.name}}
        <b-button-group style="float: right">
          <b-button v-on:click="gotoProject(jProject)" variant="success" size="sm">Join</b-button>
          <b-button v-on:click="leaveProject(jProject)" variant="danger" size="sm">Leave</b-button>
        </b-button-group>
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
      joinedProjects: Object,
      nameState: null,
      name: '',
    }
  },
  methods: {
    match() {
      axios.post("http://localhost:2000/rest/user/match").then(() => {
        axios.get("http://localhost:2000/rest/user/getjoinedprojects")
        .then(response => {
          this.joinedProjects = response.data
        })
      })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    handleOk(e){
      e.preventDefault()
      if(!this.checkFormValidity()){
        return
      }

      this.addProject(this.name)

      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    resetModal() {
      this.name = ''
    },
    addProject(name) {
      var project = {
        name: name
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
      this.$router.push({ name: 'project', params: { project: project, uuid: project.uuid } })
    },
    deleteProject(project) {
      axios.post('http://localhost:2000/rest/user/removeproject', project)
      .then(() => {
        axios.get('http://localhost:2000/rest/user/getownedprojects')
        .then(response => {
          this.ownedProjects = response.data
        })
      })
    }
  }
}
</script>

<style>
.ownedprojects {
  width: 70%;
  margin: auto;
  align-self: center;
  text-align: left;
  align-content: center;
  vertical-align: auto;
}
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
#matchbtn {
  margin-bottom: 20px;
  width: 70%;
  margin-top: 20px;
}
</style>