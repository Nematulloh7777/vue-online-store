<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все товары</h2>

        <div class="flex gap-4">
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
                <option value="name">По названию</option>
                <option value="price">По цене (дешевые)</option>
                <option value="-price">По цене (дорогие)</option>
            </select>

            <div class="relative">
                <img class="absolute left-4 top-3" src="/img/search.svg" alt="search">
                <input @input="onChangeSearchInput"
                    class="border  rounded-md outline-none py-2 pl-11 pr-4 focus:border-gray-400" placeholder="Поиск..."
                    type="text">
            </div>
        </div>
    </div>

    <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>

</template>

<script setup>
import { onMounted, ref, watch, reactive, inject } from 'vue'

import CardList from '../components/card-list.vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
})

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item)
    } else {
        removeFromCart(item)
    }
    console.log(cart)
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
                ...item
            }

            item.isFavorite = true

            const { data } = await axios.post(`https://e3bad24872a7511a.mokky.dev/favorites`, obj)

            item.favoriteId = data.id
        } else {
            item.isFavorite = false
            await axios.delete(`https://e3bad24872a7511a.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null
        }
    } catch (err) {
        console.log(err);
    }
}

const fetchFavorites = async () => {
    try {

        const { data: favorites } = await axios.get(`https://e3bad24872a7511a.mokky.dev/favorites`)

        items.value = items.value.map(item => {
            const favorite = favorites.find(favorite => favorite.parentId === item.id)

            if (!favorite) {
                return item
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }
        })
    } catch (err) {
        console.log(err);
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

        const { data } = await axios.get(`https://e3bad24872a7511a.mokky.dev/items`, {
            params
        })
        items.value = data.map(obj => ({
            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false,
        }))
    } catch (err) {
        console.log(err);
    }
}

onMounted(async () => {
    const loacalCart = localStorage.getItem('cart')
    cart.value = loacalCart ? JSON.parse(loacalCart) : []

    await fetchItems()
    await fetchFavorites()

    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))

})

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

watch(filters, fetchItems)
</script>