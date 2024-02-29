<script setup lang="ts">
import { useSearchStore } from '@/stores/search';

const { changeVal } = useSearchStore()
</script>

<template>
    <input type="text" @input="(e) => changeVal(e.target!.value)" placeholder="Rechercher..." />
</template>