<template>
  <div class="projbar">
    <h2>Projects</h2>
    <h4 style="margin-top: 50px">Private</h4>
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
        <b-badge v-for="skill in oProject.requiredSkills" :key="skill" variant="primary" pill>{{skill.name}}</b-badge>
        <b-button-group style="float: right">
          <b-button v-on:click="showNewSkillModal(oProject)" variant="warning" size="sm">Add skill</b-button>
          <b-button v-if="oProject.isPublic" v-on:click="togglePrivacy(oProject)" variant="warning" size="sm">Make private</b-button>
          <b-button v-else v-on:click="togglePrivacy(oProject)" variant="warning" size="sm">Make public</b-button>
          <b-button v-on:click="gotoProject(oProject)" variant="success" size="sm">Join</b-button>
          <b-button v-on:click="deleteProject(oProject)" variant="danger" size="sm">Delete</b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group> 
    <h4 style="margin-top: 50px">Public</h4>
    <b-button v-on:click="match()" variant="success" id="matchbtn">Match me with a project</b-button>

    <b-list-group class="joinedprojects">
      <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>There are no projects available that fit your style. Consider adding more skills.</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
      <b-list-group-item v-for="jProject in joinedProjects" :key="jProject">
      {{jProject.name}}
        <b-button-group style="float: right">
          <b-button v-on:click="gotoProject(jProject)" variant="success" size="sm">Join</b-button>
          <b-button v-on:click="leaveProject(jProject)" variant="danger" size="sm">Leave</b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group> 


    <b-modal
      ref="skill-add-modal"
      id="skill-add-modal"
      title="Add a skill."
      @ok="addSkill"
    >
      <form ref="skillform">
        <b-form-group
          :state="skillNameState"
          label="Name"
          label-for="skill-name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="skill-name-input"
            v-model="skillName"
            :state="skillNameState"
            required
            >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios.get("http://localhost:2000/rest/project/getowned")
      .then(response => {
        this.ownedProjects = response.data
      })

    axios.get("http://localhost:2000/rest/project/getjoined")
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
      skillName: '',
      skillNameState: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      selectedProject: Object
    }
  },
  methods: {
    showNewSkillModal(proj){
      this.$refs['skill-add-modal'].show()
      this.selectedProject = proj
    },
    addSkill(){
      var skill = {
        name: this.skillName
      }
      axios.post("http://localhost:2000/rest/project/addskill?projectuuid=" + this.selectedProject.uuid, skill).then(() => {
        axios.get("http://localhost:2000/rest/project/getowned")
        .then(response => {
          this.ownedProjects = response.data
        })
      })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    togglePrivacy(project){
      axios.post("http://localhost:2000/rest/project/toggleprivacy", project).then(() => {
        axios.get("http://localhost:2000/rest/project/getjoined")
        .then(response => {
          this.joinedProjects = response.data
        })
        axios.get("http://localhost:2000/rest/project/getowned")
        .then(response => {
          this.ownedProjects = response.data
        })
      })
    },
    match() {
      axios.post("http://localhost:2000/rest/user/match").then(() => {
        axios.get("http://localhost:2000/rest/project/getowned")
        .then(response => {
          this.joinedProjects = response.data
        })
      }).catch(() => {
        this.showAlert()
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
      axios.post('http://localhost:2000/rest/project/create', project)
      .then(() => {
        axios.get('http://localhost:2000/rest/project/getowned')
        .then(response => {
          this.ownedProjects = response.data
        })
      })
    },
    gotoProject(project) {
      this.$router.push({ name: 'project', params: { project: project, uuid: project.uuid } })
    },
    deleteProject(project) {
      axios.post('http://localhost:2000/rest/project/remove', project)
      .then(() => {
        axios.get('http://localhost:2000/rest/project/getowned')
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
.joinedprojects {
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
}
</style>