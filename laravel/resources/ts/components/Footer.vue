<template>
  <footer class="footer">
    <button v-if="isLogin" class="button button--link" @click="logout">
      Logout
    </button>
    <RouterLink v-else class="button button--link" to="/login">
      Login / Register
    </RouterLink>
  </footer>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Footer extends Vue {
      public get isLogin () {
        return this.$store.getters['auth/check']
      }

      async logout () {
        await this.$store.dispatch('auth/logout')

        this.$router.push('/login')
      }
    }
</script>

<style scoped>

</style>
