<template>
  <RouterLink :to="`/comics/${comics.id}`" :key="comics.id" class="cell">
    <div class="cell__picture">
      <img :src="thumbnailUrl" alt="Thumbnail" />
    </div>
    <div class="cell__name">{{ comics.title }}</div>
  </RouterLink>
</template>

<script lang="ts">
import '../assets/style/base.css'
import { computed } from 'vue'
import type { Comics } from '@/types/ComicsType'
import { getThumbnail } from '@/helpers/AppGetThumbnail'

export default {
  props: {
    comics: {
      type: Object as () => Comics,
      required: true
    }
  },
  setup(props) {
    const thumbnailUrl = computed(() => {
      return getThumbnail(props.comics.thumbnail.path, 'incredible')
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
  border-radius: 5px;
  text-align: center;
  &__name {
    font-size: 25px;
    max-width: 216px;
  }
}
</style>
