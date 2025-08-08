<script setup>
import Main from './main/Main.vue'
import Menu from './menu/Menu.vue'
import Navigation from './navigation/Navigation.vue'
</script>

<template>
  <Navigation/>
  <div class="app-container">
    <Menu/>
    <Main/>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}

#app {
  min-height: 100vh;
}

.app-container {
  display: flex;
}
</style>