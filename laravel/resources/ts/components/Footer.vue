<template>
  <footer class="footer">
    <button class="button button--link">Logout</button>
    <RouterLink class="button button--link" to="/login">
      Login / Register
    </RouterLink>
  </footer>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Footer extends Vue {
    }
</script>

<style scoped>

</style>
