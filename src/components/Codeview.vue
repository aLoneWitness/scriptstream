<template>
  <div class="codeview">
    <AceEditor
      height='100%'
      width='100%'
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
      
    },
    components: {
      AceEditor,
    },
    methods: {
      onChange(newValue) {
        /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.warn('change', newValue)
      }
    }
}
</script>

<style scoped>
.codeview{
  height: 100vh;
  width: 100vw;
}
</style>

