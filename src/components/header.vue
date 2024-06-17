<template>
    <header class=" flex  justify-between border-b shadow-md border-slate-300 px-10 py-8">
        <router-link to="/">
            <div class="flex items-center gap-4">
                <img src="/img/logo.png" alt="logo" class="w-10">
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue | Online Store</h2>
                    <p class="text-slate-400">Магазин лучших товаров</p>
                </div>
            </div>
        </router-link>
        <div>
            <button
                class="flex items-center justify-center w-48 h-12 gap-3 ml-5  rounded-lg  bg-amber-400 hover:bg-amber-500 transition py-2 px-3  "
                aria-label="Catalog">
                <span>
                    <svg class="md:-mr-0.75" height="20" width="20" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16">
                        </path>
                    </svg>
                </span>
                <span class="hidden md:inline">Каталог товаров</span>
            </button>
        </div>

        <div class="flex flex-1"></div>

        <ul class="flex items-center gap-6">
            <li class="grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black">
                <img src="/img/location.svg" alt="location">
                <span>Худжанд</span>
            </li>
            <li @click="() => emit('openDrawer')"
                class="grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black">
                <img src="/img/cart.svg" alt="cart">
                <b>{{ totalPrice }} с.</b>
            </li>
            <router-link to="/favorites">
                <li class="grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black">
                    <img src="/img/heart.svg" alt="cart">
                    <span>Закладки</span>
                </li>
            </router-link>

            <li class="grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black">
                <img src="/img/profile.svg" alt="cart">
                <span>Войти</span>
            </li>
        </ul>
    </header>
</template>

<script setup>
defineProps({
    totalPrice: Number
})

const emit = defineEmits(['openDrawer'])

</script>