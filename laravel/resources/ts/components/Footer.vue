<template>
  <footer class="footer">
    <button class="button button--link" @click="logout">Logout</button>
    <RouterLink class="button button--link" to="/login">
      Login / Register
    </RouterLink>
  </footer>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Footer extends Vue {
      async logout () {
        await this.$store.dispatch('auth/logout')

        this.$router.push('/login')
      }
    }
</script>

<style scoped>

</style>
