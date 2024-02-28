<template>
    <input type="text" v-model="searchQuery" @input="handleInput" placeholder="Rechercher..." />
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';
  
  export default defineComponent({
    name: 'SearchBar',
    props: {
      onSearch: {
        type: Function as PropType<(query: string) => void>,
        required: true
      }
    },
    setup(props) {
      const searchQuery = ref('');
  
      const handleInput = () => {
        props.onSearch(searchQuery.value.trim());
      };
  
      return {
        searchQuery,
        handleInput
      };
    }
  });
  </script>
  