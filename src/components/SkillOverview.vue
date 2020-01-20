<template>
  <div class="skillbar">
    <h2>Skills</h2>
    <b-button v-b-modal.modal-prevent-closin variant="success" id="addbtn">Add skill</b-button>

    <b-modal
      id="modal-prevent-closin"
      ref="modal"
      title="Add a project"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form">
        <b-form-group
          :state="nameState"
          label="Skill Name"
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
        <b-form-group
          :state="percentState"
          label="Skill percentage:"
          label-for="percentage-input"
          invalid-feedback="Your skill cant be zero."
        >
          <b-form-input
            id="percentage-input"
            type="range"
            min="0"
            max="100"
            step="1"
            v-model="percentage"
            :state="percentState"
            required
          >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    
    <b-list-group class="skill">
      <b-list-group-item v-for="skill in skills" :key="skill">
        {{skill.name}}
        <b-button v-on:click="removeSkill(skill)" variant="danger" style="float: right" size="sm">Remove</b-button>
        <b-badge variant="primary" pill>{{skill.sPercentage}}% proficiency</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios.get('http://localhost:2000/rest/user/getskills')
    .then(response => {
      this.skills = response.data
    })
  },
  data() {
    return {
      skills: Object,
      name: '',
      nameState: null,
      percentage: Number,
      percentState: null
    }
  },
  methods: {
    // MODAL SHIZZLE
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.percentState = valid
      return valid
    },
    handleOk(e){
      e.preventDefault()
      if(!this.checkFormValidity()){
        return
      }

      this.addSkill(this.name, Number(this.percentage))

      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closin')
      })
    },
    resetModal() {
      this.name = ''
      this.percentage = 50
    },

    removeSkill(skill) {
      axios.post('http://localhost:2000/rest/user/removeskill', skill)
      .then(() => {
        axios.get('http://localhost:2000/rest/user/getskills')
        .then(response => {
          this.skills = response.data
        })
      })
    },
    addSkill(name, percentage) {
      var skill = {
        name: name,
        sPercentage: percentage,
      }
      axios.post('http://localhost:2000/rest/user/addskill', skill)
      .then(() => {
        axios.get('http://localhost:2000/rest/user/getskills')
        .then(response => {
          this.skills = response.data
        })
      })
    }
  }
}
</script>

<style>
.skill{
  height: 50px;
  width: 70%;
  margin: auto;
  align-self: center;
  text-align: left;
  align-content: center;
  vertical-align: auto;
}
.skill > h2 {
  display: inline-block;
  vertical-align: middle;
  color: black;
  padding: 10px;
  padding-left: 20px;
}
.skill > button {
  float: right;
  height: 20px;
  width: 100px;
}
.skillbar {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 50%; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: #1e1f1c; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
.skillbar > h2 {
  color: #f92672;
}
#addbtn {
  margin-bottom: 20px;
  width: 70%;
}
</style>