<template>
  <div class="sidenav">
    <div class="messagecontainer" >
      <ul id="messages">
        <li v-for="msg in messages" v-bind:key="msg">
          {{ msg.from + ": " + msg.content }}
        </li>
      </ul>
    </div>
    <div class="inputcontainer">
      <input type="text" id="input" placeholder="Type your message..." v-model="newMessage">
    </div>
		<button v-on:click="onMessageSend()">// SEND MESSAGE //</button>
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
  props: {
    socket: Object,
    projectUUID: String,
  },
  mounted(){
    this.socket = new WebSocket("ws://localhost:8025/websockets/chat/" + this.projectUUID + "/" + this.$store.state.token)

    this.socket.onopen = function() {  
      alert("Connected")
    };

    this.socket.onmessage = this.onMessage
  },
  methods: {
    onType: function(event){
      return event
    },
    onMessageSend: function(){
      /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.warn(this.newMessage)
      var msg = {
        content: this.newMessage
      }
      this.socket.send(JSON.stringify(msg));
    },
    onMessage: function(event) {
      var msg = JSON.parse(event.data)
      this.messages.push(msg)
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
  background-color: #f92672;
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
}
#input {
  background-color: hsl(80, 6%, 21%);
  height: 50px;
  width: 310px;
  text-align: left;
  color: white;
  margin: 0;
}

.messagecontainer {
  height: 75vh;
  width: 310px;
  align-self: center;
  background-color: white;
  margin: 20px 2px 20px 20px;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-bottom: 40px;
  text-align: left;
}

#messages li {
  padding: 5px 10px;
}

#messages li:nth-child(odd) {
  background: #eee;
}

</style>