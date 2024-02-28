<template>
  <div v-if="!loading" class="seriesDetail">
    <h1>{{ seriesDetail.title }}</h1>
    <div class="seriesDetail__picture">
      <img
        :src="getThumbnail(seriesDetail.thumbnail.path, 'incredible')"
        :alt="seriesDetail.title"
      />
    </div>
    <p>Description des événements :</p>
    <p class="seriesDetail__description">{{ seriesDetail.description }}</p>
    <div class="seriesDetail__creators">
      <p>Personnes ayant travaillé sur la série :</p>
      <div class="creators-list">
        <p v-for="creator in seriesCreatorState" :key="creator.id">{{ creator.fullName }}</p>
      </div>
    </div>
    <h2>On peut retrouver ces personnages dans la série :</h2>
    <div class="characters">
      <RouterLink
        :to="`/characters/${character.id}`"
        v-for="character in seriesCharactersState"
        :key="character.id"
        class="character"
      >
        <div class="character__thumbnail">
          <img :src="getThumbnail(character.thumbnail.path, 'xlarge')" alt="thumbnail" />
        </div>
        <p>{{ character.name }}</p>
      </RouterLink>
    </div>
    <h2>On peut retrouver les comics suivant dans la série:</h2>
    <div class="comics">
      <RouterLink
        :to="`/comics/${comics.id}`"
        v-for="comics in seriesComicsState"
        :key="comics.id"
        class="comic"
      >
        <div class="serie__thumbnail">
          <img :src="getThumbnail(comics.thumbnail.path, 'fantastic')" alt="thumbnail" />
        </div>
        <p>{{ comics.title }}</p>
      </RouterLink>
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
import { marvelAPI } from '@/helpers/MarvelApi'
import '../assets/style/base.css'
import { getThumbnail } from '@/helpers/AppGetThumbnail'
import type { Character } from '@/types/CharacterType'
import type { Comics, Creators } from '@/types/ComicsType'
import type { SeriesDetails } from '@/types/SeriesType'

export default defineComponent({
  setup() {
    const route = useRoute()
    const seriesId = route.params.serieId
    const seriesDetail = ref<SeriesDetails | undefined>()
    const seriesCharactersState = ref<Character[] | undefined>()
    const seriesComicsState = ref<Comics[] | undefined>()
    const seriesCreatorState = ref<Creators[] | undefined>()
    const loading = ref(true)
    const fetchMarvelSeries = async () => {
      try {
        if (seriesId !== undefined && typeof seriesId === 'string') {
          const series = await marvelAPI.getSerie(seriesId)
          seriesDetail.value = series
          const seriesCharacter = await marvelAPI.getSeriesCharacters(seriesId)
          seriesCharactersState.value = seriesCharacter
          const seriesComics = await marvelAPI.getSeriesComics(seriesId)
          seriesComicsState.value = seriesComics
          const seriesCreators = await marvelAPI.getSeriesCreators(seriesId)
          seriesCreatorState.value = seriesCreators
        } else {
          console.log('Series id is undefined')
        }
        loading.value = false
      } catch (error) {
        console.error('Error while fetching series:', error)
      }
    }

    onMounted(fetchMarvelSeries)

    return {
      seriesDetail,
      seriesCharactersState,
      seriesComicsState,
      seriesCreatorState,
      loading,
      getThumbnail
    }
  }
})
</script>

<style scoped lang="scss">
.seriesDetail {
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
      border: 4px solid var(--black);
    }
  }
  &__creators {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-size: 25px;
    line-height: 35px;
    margin-bottom: 15px;
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
    max-width: 800px;
    font-size: 25px;
    line-height: 35px;
    margin-bottom: 20px;
    margin-top: 20px;
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

  .comics {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    .comic {
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
