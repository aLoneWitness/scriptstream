<template>
  <div>
    <div v-for="skill in skills" :key="skill" class="skill">
      <h2>{{skill.name}}</h2>
      <button v-on:click="removeSkill(skill)"></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios.get('http://localhost:2000/rest/user/getskills')
    .then(response => {
      alert(response.data)
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
      alert(skill)
    }
  }
}
</script>

<style>
.skill{
  background-color: burlywood;
  height: 50px;
  width: 70%;
  margin: auto;
  align-self: center;
  border-radius: 25px;
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
</style>