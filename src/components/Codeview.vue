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
      :onChange="onChange"
      name="editor"
      :editorProps="{$blockScrolling: true}"
    />
  </div>
</template>

<script>
// import Prism from 'vue-prism-component';
import { Ace as AceEditor } from 'vue2-brace-editor';
 
import 'brace/mode/javascript';
import 'brace/theme/monokai';

export default {
    mounted: function(){
      this.langs = [
        "Javascript"
      ]
    },
    components: {
      AceEditor,
    },
    methods: {
      onChange(newValue) {
        /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.warn('change', newValue)
      }
    },
    props: {
      langs: Object,
      projectName: String
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

