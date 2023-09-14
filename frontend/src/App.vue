<template>
  <kit-search class='center'/>
</template>

<script>
import kitSearch from './components/kitSearch.vue'

export default {
  name: 'App',
  components: {
    kitSearch,
  },
  setup() {
  }
}
</script>

<!-- default vue styles, not changing much -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
}
</style>
