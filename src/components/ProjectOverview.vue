<template>
  <div class="projbar">
    <h2>Projects</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style>
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

</style>