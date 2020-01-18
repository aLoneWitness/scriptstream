<template>
  <div class="skillbar">
    <h2>Skills</h2>
    <b-button v-on:click="addSkill()" variant="success" id="addbtn">Add skill</b-button>
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
      skills: Object
    }
  },
  methods: {
    removeSkill(skill) {
      axios.post('http://localhost:2000/rest/user/removeskill', skill)
      .then(() => {
        axios.get('http://localhost:2000/rest/user/getskills')
        .then(response => {
          this.skills = response.data
        })
      })
    },
    addSkill() {
      var skill = {
        name: "Machine Learning",
        sPercentage: 30,
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