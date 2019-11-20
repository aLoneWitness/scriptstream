<template>
  <div class="sidenav">
    <div class="messages" >

    </div>
		<input type="text" id="input" placeholder="Type your message..." v-model="newMessage">
		<button v-on:click="onMessageSend()">Send Message</button>
		<p id="presence"></p>
		<div id="output"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      newMessage: '',
      messages: [],
      typing: false,
      username: null,
    }
  },
  methods: {
    onType: function(event){
      return event
    },
    onMessageSend: function(){
      /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.warn(this.newMessage)
      return this.newMessage
    }
  }
}
</script>

<style scoped>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 350px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: #1e1f1c; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
button {
  position: relative;
  background-color: blueviolet;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  color: white;
  width: 310px;
  bottom: 0;
  align-self: center;
  margin: 20px 20px 20px 20px;
  border-radius: 4px;
}
#input {
  width: 310px;
  text-align: left;
  color: white;
}
.messages {
  height: 75vh;
  width: 310px;
  align-self: center;
  background-color: white;
  margin: 20px 2px 20px 20px;
  border-radius: 4px;
}
</style>