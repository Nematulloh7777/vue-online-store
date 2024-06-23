import {defineStore} from 'pinia'
import {ref, reactive, watch, inject, onMounted} from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

export const useItemStore = defineStore('item', () => {
  const items = ref([])
  const {cart, addToCart, removeFromCart} = inject('cart')

  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
  })

  const onClickAddPlus = (item) => {
    if (!item.isAdded) {
      addToCart(item)
    } else {
      removeFromCart(item)
    }
  }

  const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
  }

  const onChangeSearchInput = debounce((event) => {
    filters.searchQuery = event.target.value
  }, 300)

  const addToFavorite = async (item) => {
    try {
      if (!item.isFavorite) {
        const obj = {
          parentId: item.id,
          ...item,
        }

        item.isFavorite = true

        const {data} = await axios.post(`https://e3bad24872a7511a.mokky.dev/favorites`, obj)

        item.favoriteId = data.id
      } else {
        item.isFavorite = false
        await axios.delete(`https://e3bad24872a7511a.mokky.dev/favorites/${item.favoriteId}`)
        item.favoriteId = null
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFavorites = async () => {
    try {
      const {data: favorites} = await axios.get(`https://e3bad24872a7511a.mokky.dev/favorites`)

      items.value = items.value.map((item) => {
        const favorite = favorites.find((favorite) => favorite.parentId === item.id)

        if (!favorite) {
          return item
        }
        return {
          ...item,
          isFavorite: true,
          favoriteId: favorite.id,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchItems = async () => {
    try {
      const params = {
        sortBy: filters.sortBy,
      }
      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`
      }

      const {data} = await axios.get(`https://e3bad24872a7511a.mokky.dev/items`, {
        params,
      })
      items.value = data.map((obj) => ({
        ...obj,
        isFavorite: false,
        favoriteId: null,
        isAdded: false,
      }))
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(async () => {
    const loacalCart = localStorage.getItem('cart')
    cart.value = loacalCart ? JSON.parse(loacalCart) : []

    await fetchItems()
    await fetchFavorites()

    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
    }))
  })

  watch(cart, () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: false,
    }))
  })

  watch(filters, fetchItems)

  return {
    items,
    cart,
    filters,
    fetchItems,
    fetchFavorites,
    addToFavorite,
    onChangeSelect,
    addToCart,
    removeFromCart,
    onClickAddPlus,
    onChangeSearchInput,
  }
})
