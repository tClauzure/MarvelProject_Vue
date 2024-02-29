<template>
  <div v-if="!loading" class="detail">
    <h1>{{ characterDetail.name }}</h1>
    <div class="picture">
      <img
        :src="getThumbnailUrl(characterDetail.thumbnail.path, 'incredible')"
        :alt="characterDetail.name"
      />
    </div>
    <p class="description">{{ characterDetail.description }}</p>

    <h2>On peut retrouver ce personnage dans les comics :</h2>
    <div class="comics">
      <template v-for="comics in characterComicsState" :key="comics.id">
        <RouterLink :to="`/comics/${comics.id}`" class="comic">
          <div class="comic__thumbnail">
            <img :src="getThumbnailUrl(comics.thumbnail.path, 'xlarge')" alt="thumbnail" />
          </div>
          <p>{{ comics.title }}</p>
        </RouterLink>
      </template>
    </div>

    <h2>On peut retrouver ce personnage dans les séries :</h2>
    <div class="series">
      <template v-for="series in characterSeriesState" :key="series.id">
        <RouterLink :to="`/series/${series.id}`" class="serie">
          <div class="serie__thumbnail">
            <img :src="getThumbnailUrl(series.thumbnail.path, 'fantastic')" alt="thumbnail" />
          </div>
          <p>{{ series.title }}</p>
        </RouterLink>
      </template>
    </div>
  </div>

  <div v-else class="loading">
    <h1>Chargement...</h1>
    <div class="loading__picture">
      <img src="@/assets/pictures/loading.png" alt="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import '../assets/style/base.css'
import type { CharacterDetails } from '@/types/CharacterType'
import type { Comics } from '@/types/ComicsType'
import type { Series } from '@/types/SeriesType'
import { marvelAPI } from '@/helpers/MarvelApi'
import { getThumbnail } from '@/helpers/AppGetThumbnail'

export default defineComponent({
  setup() {
    const route = useRoute()
    const characterId = route.params.characterId
    const characterDetail = ref<CharacterDetails | undefined>()
    const characterComicsState = ref<Comics[] | undefined>()
    const characterSeriesState = ref<Series[] | undefined>()
    const loading = ref(true)

    const fetchMarvelCharacter = async () => {
      try {
        if (characterId !== undefined && typeof characterId === 'string') {
          const character = await marvelAPI.getCharacter(characterId)
          characterDetail.value = character
          const characterComics = await marvelAPI.getCharacterComics(characterId)
          characterComicsState.value = characterComics
          const characterSeries = await marvelAPI.getCharacterSeries(characterId)
          characterSeriesState.value = characterSeries
        } else {
          console.log('Character id is undefined')
        }
        loading.value = false
      } catch (error) {
        console.error('Erreur lors de la récupération du personnage :', error)
      }
    }

    onMounted(fetchMarvelCharacter)
    const getThumbnailUrl = (path: string, size: string) => {
      return getThumbnail(path, size)
    }

    return {
      characterDetail,
      characterComicsState,
      characterSeriesState,
      loading,
      getThumbnailUrl
    }
  }
})
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  .picture {
    width: 400px;
    margin-bottom: 40px;
    img {
      width: 100%;
      height: auto;
      border: 4px solid var(--black);
    }
  }
  .description {
    max-width: 650px;
    font-size: 25px;
    line-height: 35px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 30px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .comics {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;

    .comic {
      width: 150px;
      text-decoration: none;
      color: var(--black);
      border-radius: 5px;
      text-align: center;
      &__thumbnail {
        margin-bottom: 10px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .series {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    .serie {
      width: 170px;
      text-decoration: none;
      color: var(--black);
      &__thumbnail {
        margin-bottom: 10px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
