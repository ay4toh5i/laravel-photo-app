<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Navbar from  "./components/Navbar.vue";
    import Footer from "./components/Footer.vue";

    @Component({
      components: {Navbar, Footer}
    })
    export default class App extends Vue {
    }
</script>

<style scoped>

</style>
