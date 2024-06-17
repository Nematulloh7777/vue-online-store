<template>
    <div
        class="relative bg-white border border-slte-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">

        <img v-if="onClickFavorite" @click="onClickFavorite" :src="!isFavorite ? '/img/like-1.svg' : '/img/like-2.svg'"
            alt="like1" class="absolute top-8 left-8">

        <div class="flex items-center justify-center">
            <img width="170" :src="imageUrl" alt="товары">
        </div>

        <router-link :to="{ name: 'DetailsCard', params: { id: id } }">
            <p class="mt-2 hover:text-[#ffb933]">{{ title }}</p>
        </router-link>

        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} с.</b>
            </div>

            <img v-if="onClickAdd" @click="onClickAdd" :src="!isAdded ? '/img/plus.svg' : '/img/checked.svg'"
                alt="plus">
        </div>
    </div>
</template>

<script setup>

defineProps({
    id: Number,
    imageUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function,
})

</script>