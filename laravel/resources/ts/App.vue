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
    import {Component, Watch, Vue} from "vue-property-decorator"
    import Navbar from  "./components/Navbar.vue"
    import Footer from "./components/Footer.vue"

    import { INTERNAL_SERVER_ERROR } from "./util"

    @Component({
      components: {Navbar, Footer}
    })
    export default class App extends Vue {
      get errorCode () {
        return this.$store.state.error.code
      }

      @Watch('errorCode', {deep: true, immediate: true})
      onErrorStatus (newValue: number) {
        if (newValue === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      }

      @Watch('$route', {deep: true, immediate: true})
      onUrlChange () {
        this.$store.commit('error/setCode', null)
      }
    }
</script>

<style scoped>

</style>
