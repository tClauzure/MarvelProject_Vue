<script setup lang="ts">
import '../assets/style/base.css'
</script>
<template>
  <header class="headerContainer">
    <RouterLink class="logo" to="/">
      <img src="../assets/pictures/logo.png" alt="logo" />
    </RouterLink>
    <nav class="nav">
      <div>Personnages</div>
      <div>Comics</div>
      <div>Séries</div>
      <RouterLink to="/about">About</RouterLink>
      <div class="connection"></div>
    </nav>
  </header>
</template>

<style>
.headerContainer {
  display: flex;
  gap: 30px;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  background-color: var(--black);
  font-size: 25px;
  padding-bottom: 10px;

  .logo {
    width: 120px;
    height: 40px;
    object-fit: cover;

    img {
      width: 100%;
      height: auto;
    }
  }

  .nav {
    display: flex;
    gap: 50px;

    a {
      color: var(--white);
      text-decoration: none;
      padding: 10px;

      &:hover {
        color: var(--blue);
        background-color: var(--header-background-color-hover);
        border-radius: 10px;
      }

      &.active {
        color: var(--blue);
        background-color: var(--header-background-color-hover);
        border-radius: 10px;
      }
    }
  }
}
</style>
