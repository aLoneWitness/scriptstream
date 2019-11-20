<template>
  <div class="sidenav">
    <div id="chat">
			<input type="text" id="input" placeholder="Type your message..." v-model="newMessage">
		</div>
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

<style>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 350px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: gray; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
button {
  background: #e6e6e6;
  text-shadow: 0 1px 0 #f3f3f3;
  margin: .5em 0 2em 0;
  width: 100%;
}
</style>