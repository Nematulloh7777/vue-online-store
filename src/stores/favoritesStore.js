import {defineStore} from 'pinia'
import {ref, onMounted} from 'vue'
import axios from 'axios'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  onMounted(async () => {
    try {
      const {data} = await axios.get(`https://e3bad24872a7511a.mokky.dev/favorites`)

      favorites.value = data
    } catch (err) {
      console.log(err)
    }
  })
  return {
    favorites,
  }
})
