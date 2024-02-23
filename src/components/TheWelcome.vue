<template>
  <div className="homeContainer">
    <h1>Bienvenue sur le Projet Marvel</h1>
    <div className="homeContainer__pictures">
      <RouterLink to="/characters" className="homeContainer__pictures__pic"
        ><img src="../assets/pictures/picture_charac.jpg" alt="charac"
      /></RouterLink>
      <RouterLink to="/series" className="homeContainer__pictures__pic"
        ><img src="../assets/pictures/picture_series.jpg" alt="series"
      /></RouterLink>
      <RouterLink to="/comics" className="homeContainer__pictures__pic"
        ><img src="../assets/pictures/picture_comics.jpg" alt="comics"
      /></RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../assets/style/base.css'
</script>

<style scoped lang="scss">
.homeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  &__pictures {
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    &__pic {
      width: 200px;
      border: solid 5px var(--black);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
