<template>
    <div class="flex flex-col flex-1 gap-5" v-auto-animate>
        <CartItem v-for="item in cart" :key="item.id" :title="item.title" :price="item.price" :image-url="item.imageUrl"
            @on-click-remove="() => removeFromCart(item)" />

    </div>
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './cart-item.vue'

const { cart, removeFromCart } = inject('cart')
</script>