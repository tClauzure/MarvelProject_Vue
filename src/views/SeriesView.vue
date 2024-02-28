<template>
  <div class="characterContainer">
    <h2>Liste de séries Marvel</h2>
    <div v-if="!loading" class="list">
      <template v-if="serieState && serieState.length">
        <SeriesItem v-for="series in serieState" :key="series.id" :series="series" />
      </template>
      <span v-else>No series</span>
    </div>
    <div v-else class="loading">
      <h1>Chargement...</h1>
      <div class="loading__picture">
        <img src="@/assets/pictures/loading.png" alt="loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { marvelAPI } from '@/helpers/MarvelApi'
import { Series } from '@/types/SeriesType'
import SeriesItem from '@/components/AppSeriesItem.vue'

export default defineComponent({
  components: {
    SeriesItem
  },
  setup() {
    const serieState = ref<Series[] | undefined>()
    const loading = ref(true)

    const fetchMarvelSeries = async () => {
      try {
        const series = await marvelAPI.getSeries()
        serieState.value = series
        loading.value = false
      } catch (error) {
        console.error('Erreur lors de la récupération des séries :', error)
      }
    }

    onMounted(fetchMarvelSeries)

    return {
      serieState,
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
