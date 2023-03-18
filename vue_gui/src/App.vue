<template>
  <navbar></navbar>
 
  <router-view/>

  <myfooter></myfooter>
</template>
<script>
// @ is an alias to /src
import navbar from '@/components/Navbar.vue'
import accountLink from '@/components/AccountLink.vue'
import myfooter from '@/components/Footer.vue'

export default {
  components: {
    navbar,
    accountLink,
    myfooter
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
  
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
