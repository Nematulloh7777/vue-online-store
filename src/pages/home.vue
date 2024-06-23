<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все товары</h2>

        <div class="flex gap-4">
            <select @change="itemStore.onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
                <option value="name">По названию</option>
                <option value="price">По цене (дешевые)</option>
                <option value="-price">По цене (дорогие)</option>
            </select>

            <div class="relative">
                <img class="absolute left-4 top-3" src="/img/search.svg" alt="search">
                <input @input="itemStore.onChangeSearchInput"
                    class="border  rounded-md outline-none py-2 pl-11 pr-4 focus:border-gray-400" placeholder="Поиск..."
                    type="text">
            </div>
        </div>
    </div>

    <div class="mt-10">
        <CardList :items="itemStore.items" @add-to-favorite="itemStore.addToFavorite"
            @add-to-cart="itemStore.onClickAddPlus" />
    </div>

</template>

<script setup>
import { useItemStore } from '@/stores/itemStore'
import CardList from '../components/card-list.vue'

const itemStore = useItemStore()
</script>