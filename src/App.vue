<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Nutrition />
</template>

<script>
import Nutrition from './components/Nutrition.vue'

export default {
  name: 'App',
  components: {
    Nutrition
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
