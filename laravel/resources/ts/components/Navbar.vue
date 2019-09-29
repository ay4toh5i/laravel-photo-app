<template>
  <nav class="navbar">
    <RouterLink class="navbar__brand" to="/">
      Vuesplash
    </RouterLink>
    <div class="navbar__menu">
      <div v-if="isLogin" class="navbar__item">
        <button class="button">
          <i class="icon ion-md-add"></i>
          Submit a photo
        </button>
      </div>
      <span v-if="isLogin" class="navbar__item">
        {{ username }}
      </span>
      <div v-else class="navbar__item">
        <RouterLink class="button button--link" to="/login">
          Login / Register
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component
  export default class Navbar extends Vue {
    public get isLogin () {
      return this.$store.getters['auth/check']
    }

    public get username () {
      return this.$store.getters['auth/username']
    }
  }
</script>

<style scoped>

</style>
