<script setup lang="ts">
import '../assets/style/base.css'
</script>

<template>
  <footer class="footerContainer">
    <RouterLink to="/about">
      Nous contacter
    </RouterLink>
    </footer>
</template>

<style>
.footerContainer {
  display: flex;
  justify-content: flex-end;
  background-color: var(--black);
  height: 50px;
  padding: 25px;

  a {
    color: var(--white);
    text-decoration: none;

    &:hover {
      color: var(--footer-background-color-hover);
    }
  }
}
</style>
