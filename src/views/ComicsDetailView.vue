<template>
  <div v-if="!loading" class="comicsDetail">
    <h1>{{ comicsDetail.title }}</h1>
    <div class="comicsDetail__picture">
      <img
        :src="getThumbnail(comicsDetail.thumbnail.path, 'incredible')"
        :alt="comicsDetail.title"
      />
    </div>
    <div class="comicsDetail__creators">
      Personnes ayant travaillé sur le comics:
      <div class="creators-list">
        <div v-for="creator in comicsCreatorState" :key="creator.id">
          <p>{{ creator.fullName }}</p>
        </div>
      </div>
    </div>
    <p class="comicsDetail__description">{{ comicsDetail.description }}</p>
    <h2>On peut retrouver ces personnages dans le comics:</h2>
    <div class="characters">
      <template v-for="character in comicsCharactersState" :key="character.id">
        <RouterLink :to="`/characters/${character.id}`" class="character">
          <div class="character__thumbnail">
            <img :src="getThumbnail(character.thumbnail.path, 'xlarge')" alt="thumbnail" />
          </div>
          <p>{{ character.name }}</p>
        </RouterLink>
      </template>
    </div>
    <h2>On peut retrouver ce comics dans la série:</h2>
    <div class="series">
      <template v-for="series in comicsSeriesState" :key="series.id">
        <RouterLink :to="`/series/${series.id}`" class="serie">
          <div class="serie__thumbnail">
            <img :src="getThumbnail(series.thumbnail.path, 'fantastic')" alt="thumbnail" />
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
import type { ComicsDetails, Creators } from '@/types/ComicsType'
import type { Character } from '@/types/CharacterType'
import type { Series } from '@/types/SeriesType'
import { marvelAPI } from '@/helpers/MarvelApi'
import { getThumbnail } from '@/helpers/AppGetThumbnail'

export default defineComponent({
  setup() {
    const route = useRoute()
    const comicsId = route.params.comicsId
    const comicsDetail = ref<ComicsDetails | undefined>()
    const comicsCharactersState = ref<Character[] | undefined>()
    const comicsSeriesState = ref<Series[] | undefined>()
    const comicsCreatorState = ref<Creators[] | undefined>()
    const loading = ref(true)

    const fetchMarvelComics = async () => {
      try {
        if (comicsId !== undefined && typeof comicsId === 'string') {
          const comics = await marvelAPI.getComic(comicsId)
          comicsDetail.value = comics
          const comicsCharacters = await marvelAPI.getComicsCharacters(comicsId)
          comicsCharactersState.value = comicsCharacters
          const comicsSeries = await marvelAPI.getComicsSeries(comicsId)
          comicsSeriesState.value = comicsSeries
          const comicsCreators = await marvelAPI.getComicsCreators(comicsId)
          comicsCreatorState.value = comicsCreators
        } else {
          console.log('Comics id is undefined')
        }
        loading.value = false
      } catch (error) {
        console.error('Erreur lors de la récupération du comics:', error)
      }
    }

    onMounted(fetchMarvelComics)

    return {
      comicsDetail,
      comicsCharactersState,
      comicsSeriesState,
      comicsCreatorState,
      loading,
      getThumbnail
    }
  }
})
</script>

<style scoped lang="scss">
.comicsDetail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  text-align: center;
  font-size: 25px;
  &__picture {
    width: 350px;
    margin-bottom: 40px;
    img {
      width: 100%;
      height: auto;
      border: 4px solid black;
    }
  }
  &__creators {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-size: 25px;
    line-height: 35px;
    .creators-list {
      display: flex;
      flex-wrap: wrap;
      max-width: 1080px;
      gap: 5px;

      div {
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
  &__description {
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
  .characters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;

    .character {
      width: 150px;
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
      color: black;
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
