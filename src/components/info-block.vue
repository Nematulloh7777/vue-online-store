<template>
    <div class="flex flex-col items-center text-center w-72 mx-auto">
        <img height="80" width="80" :src="imageUrl" alt="info image">
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400 mt-2 mb-5">{{ description }}</p>
        <router-link to="/" v-if="isBtnBack">
            <div class="relative">
                <img class="absolute left-4 top-4 rotate-180" src="/img/arrow-left.svg" alt="arrow-next">

                <button
                    class="bg-[#9DD458]  w-64 rounded-xl items-center hover:bg-lime-600 transition  py-3 text-white active:bg-lime-700 focus:border-gray-400">Вернуться
                    назад</button>
            </div>
        </router-link>
    </div>

</template>

<script setup>
defineProps({
    title: String,
    description: String,
    imageUrl: String,
    isBtnBack: Boolean,
})
</script>