<template>
  <RouterLink :to="`/series/${series.id}`" class="cell">
    <div class="cell__picture">
      <img :src="getThumbnail(series.thumbnail.path, 'incredible')" alt="thumbnail" />
    </div>
    <div class="cell__name">{{ series.title }}</div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getThumbnail } from '@/helpers/AppGetThumbnail'
import { Series } from '@/types/SeriesType'

export default defineComponent({
  props: {
    series: {
      type: Object as () => Series,
      required: true
    }
  },
  setup(props) {
    return {
      getThumbnail
    }
  }
})
</script>

<style scoped lang="scss">
.cell {
  text-decoration: none;
  color: black;
  &__name {
    font-size: 25px;
    max-width: 216px;
  }
}
</style>
