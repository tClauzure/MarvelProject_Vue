<template>
  <div class="characterContainer">
    <h2>Liste de comics Marvel</h2>
    <template v-if="!loading">
      <ul class="list">
        <template v-if="comicState && comicState.length">
          <ComicsItem v-for="comics in comicState" :key="comics.id" :comics="comics" />
        </template>
        <template v-else>
          <span>No comics</span>
        </template>
      </ul>
    </template>
    <template v-else>
      <div class="loading">
        <h1>Chargement...</h1>
        <div class="loading__picture">
          <img src="@/assets/pictures/loading.png" alt="loading" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { marvelAPI } from '@/helpers/MarvelApi'
import type { Comics } from '@/types/ComicsType'
import ComicsItem from '@/components/AppComicsItem.vue'

export default defineComponent({
  components: {
    ComicsItem
  },
  setup() {
    const comicState = ref<Comics[] | undefined>()
    const loading = ref(true)

    const fetchMarvelComics = async () => {
      try {
        const comics = await marvelAPI.getComics()
        comicState.value = comics
        loading.value = false
      } catch (error) {
        console.error('Erreur lors de la récupération des comics :', error)
      }
    }

    onMounted(fetchMarvelComics)

    return {
      comicState,
      loading
    }
  }
})
</script>

<style scoped lang="scss">
.characterContainer {
  margin-top: 20px;
  margin-bottom: 20px;
  h2 {
    font-size: 35px;
    line-height: 40px;
    margin-bottom: 15px;
    padding-left: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
}
</style>
