<template>
  <div class="codeview">
    <div class="settingsbar">
      <h1>ScriptStream - {{this.projectName}}</h1>
       <select>
        <option value="javascript">JS</option>
        <option value="powershell">PS</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
      </select> 
    </div>
    <AceEditor
      width='100%'
      height='calc(100% - 50px)'
      :fontSize="20"
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      mode="javascript"
      theme="monokai"
      :onChange="onOurChange"
      name="editor"
      :editorProps="{$blockScrolling: true}"
      :value="this.codeInput"
    />
  </div>
</template>

<script>
// import Prism from 'vue-prism-component';
import { Ace as AceEditor } from 'vue2-brace-editor';
// import Loading from 'vue-loading-overlay'
// import "vue-loading-overlay/dist/vue-loading.css";

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import axios from 'axios';

export default {
    mounted: function(){
      this.langs = [
        "Javascript"
      ]

      axios.get('http://localhost:2000/rest/user/getskills')
      .then(response => {
        this.skills = response.data
      })

      this.socket = new WebSocket("ws://localhost:8025/websockets/codestream/" + this.projectUUID + "/" + this.$store.state.token)

      let loader = this.$loading.show({
        container: this.$refs.sidenav,
        canCancel: false,
      });

      this.socket.onopen = function() {  
        loader.hide()
      };


      let router = this.$router
      this.socket.onclose = function() {
        router.push('/')
      }

      this.socket.onmessage = this.onExternalChange
    },
    components: {
      AceEditor,
    },
    methods: {
      onOurChange: function(newValue) {
        var msg = {
          content: newValue
        }
        this.socket.send(JSON.stringify(msg));
      },
      onExternalChange: function(event) {
        var msg = JSON.parse(event.data)
        this.codeInput = msg.content
      }
    },
    props: {
      langs: Object,
      projectName: String,
      codeInput: String,
      socket: Object,
      projectUUID: String
    },
    data() {
      return {
      }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

.codeview{
  height: 100vh;
  width: 100vw;
}
.settingsbar{
  height: 50px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  background-color: #1e1f1c;
}

.settingsbar > h1 {
  display: inline;
  float: left;
  color: #f92672;
  padding-top: 10px;
  padding-left: 20px;
  font-style: italic;
  height: 20px;
}

.settingsbar > select {
  float: left;
  display: inline;
  margin-top: 18px;
  width: 100px;
  padding-top: 5px;
  margin-left: 50px;
  padding-left: 20px;
  align-self: left;
  text-align: center;
  background-color: hsl(80, 6%, 21%);
  color: #f92672;
  font-family: 'Roboto', sans-serif;
}

</style>

