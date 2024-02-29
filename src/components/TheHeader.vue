<script lang="ts">
import '../assets/style/base.css'
import { defineComponent, ref } from 'vue';
import SearchBar from './TheSearchBar.vue';

export default defineComponent({
  components: {
    SearchBar
  },
  setup() {
    const searchTerm = ref('')

    const handleSearch = (searchQuery: string) => {
      searchTerm.value = searchQuery
    }

    return { handleSearch }
  }
});

</script>
<template>
  <header class="headerContainer">
    <RouterLink class="logo" to="/">
      <img src="../assets/pictures/logo.png" alt="logo" />
    </RouterLink>
    <div>
    <SearchBar :onSearch="handleSearch" />
    </div>
    <nav class="nav">
      <RouterLink to="/characters">Personnages</RouterLink>
      <RouterLink to="/comics">Comics</RouterLink>
      <RouterLink to="/series">Séries</RouterLink>
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
