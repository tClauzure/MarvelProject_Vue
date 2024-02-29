<template>
  <div class="characterContainer">
    <h2>Liste des personnages Marvel</h2>
    <ul v-if="!loading" class="list">
      <CharacterItem
        v-for="character in characterState"
        :key="character.id"
        :character="character"
      />
      <span v-if="!characterState.length">Pas de perso</span>
    </ul>
    <div v-else class="loading">
      <h1>Chargement...</h1>
      <div class="loading__picture">
        <img src="@/assets/pictures/loading.png" alt="loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { marvelAPI } from '@/helpers/MarvelApi'
import CharacterItem from '@/components/AppCharacterItem.vue'
import type { Character } from '@/types/CharacterType'

export default {
  components: {
    CharacterItem
  },
  setup() {
    const characterState = ref<Character[]>([])
    const loading = ref(true)

    onMounted(async () => {
      try {
        const characters = await marvelAPI.getCharacters()
        characterState.value = characters
        loading.value = false
      } catch (error) {
        console.error('Erreur lors de la récupération des personnages :', error)
      }
    })

    return { characterState, loading }
  }
}
</script>

<style scoped lang="scss">
.characterContainer {
  margin-top: 20px;
  margin-bottom: 20px;
  h2 {
    font-size: 35px;
    line-height: 40px;
    margin-bottom: 15px;
    padding-left: 95px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
}
</style>
