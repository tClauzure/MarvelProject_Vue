<template>
  <RouterLink :to="`/Characters/${character.id}`" :key="character.id" class="cell">
    <div class="cell__picture">
      <img :src="thumbnailUrl" alt="Character Thumbnail" />
    </div>
    <div class="cell__name">{{ character.name }}</div>
  </RouterLink>
</template>

<script lang="ts">
import '../assets/style/base.css'
import { computed } from 'vue'
import type { Character } from '@/types/CharacterType'
import { getThumbnail } from '@/helpers/AppGetThumbnail'

export default {
  props: {
    character: {
      type: Object as () => Character,
      required: true
    }
  },
  setup(props) {
    const thumbnailUrl = computed(() => {
      return getThumbnail(props.character.thumbnail.path, 'incredible')
    })

    return {
      thumbnailUrl
    }
  }
}
</script>

<style scoped lang="scss">
.cell {
    text-decoration: none;
    color: var(--black);
    &__name {
        font-size: 25px;
        max-width: 216px;
    }
}
</style>
