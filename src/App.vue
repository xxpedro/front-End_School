<template>
  <div id="nav">
    <navBarComponent></navBarComponent>
    <router-view/>
  </div>
</template>

<script>
import navBarComponent from '../src/components/navBarComponent.vue'
export default {
  components: {
    navBarComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
