<template>

    <div v-if="!favorites.length" class="flex h-full items-center">
        <InfoBlock title="Закладок нет :(" description="Вы ничего не добавляли в закладки" imageUrl="/img/emoji-1.png"
            isBtnBack />
    </div>

    <div v-else>
        <div class="flex items-center gap-5 mb-8 ">
            <router-link to="/">
                <svg class="opacity-30 cursor-pointer transition hover:-translate-x-1 rotate-180 hover:opacity-100"
                    width="20" height="18" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </router-link>

            <h2 class="text-3xl font-bold  ">Мои Закладки </h2>
        </div>

        <div class="mt-10">
            <CardList :items="favorites" is-favorites />
        </div>
    </div>

</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import CardList from '../components/card-list.vue'
import InfoBlock from '../components/info-block.vue'

const favorites = ref([])

onMounted(async () => {
    try {
        const { data } = await axios.get(`https://e3bad24872a7511a.mokky.dev/favorites`)

        favorites.value = data

    } catch (err) {
        console.log(err)
    }
})
</script>