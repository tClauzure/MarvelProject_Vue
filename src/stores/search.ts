import { defineStore } from "pinia";
import { ref} from "vue";

export const useSearchStore = defineStore('search',() => {
    const charac = ref("")
    function changeVal(newVal: string) {
        charac.value = newVal
        //console.log(charac.value)
    }
    return {charac, changeVal}
})