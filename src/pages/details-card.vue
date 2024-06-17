<template>
    <div class="flex items-center gap-5 mb-8 ">
        <router-link to="/">
            <svg class="opacity-30 cursor-pointer transition hover:-translate-x-1 rotate-180 hover:opacity-100"
                width="20" height="18" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </router-link>

        <h2 class="text-3xl font-bold  ">Подробности о товара </h2>
    </div>

    <div class="flex justify-center p-6 gap-20 m-10">
        <img width="250" :src="product?.imageUrl" alt="Product Image">

        <div class="w-1/3">
            <h1 class="text-2xl mb-3">{{ product?.title }}</h1>
            <span class="text-base text-slate-500 ">Код товара: {{ product?.id }}000010 </span>

            <div class="mt-5 border-b pb-5 mb-5">
                <b class="text-4xl">{{ product?.price }}с.</b>
            </div>

            <div>
                <h1 class="text-2xl  text-blue-600/100 font-bold"> Все характеристики</h1>
                <p class="mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit est eaque
                    debitis molestiae
                    corrupti placeat obcaecati atque odio Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorem mollitia iure tenetur ducimus quasi vel accusantium totam at ipsa dolorum animi qui minus id
                    nam accusamus nesciunt, ad voluptatibus! Rerum?</p>
            </div>
        </div>

    </div>

</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, onMounted, watchEffect } from 'vue'

const product = ref(null);

async function fetchProductById(productId) {
    try {
        const res = await axios.get(`https://e3bad24872a7511a.mokky.dev/items/${productId}`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const route = useRoute();
const productId = ref(route.params.id);

onMounted(async () => {
    product.value = await fetchProductById(productId.value);
});

watchEffect(async () => {
    if (productId.value) {
        product.value = await fetchProductById(productId.value);
    }
});

</script>
