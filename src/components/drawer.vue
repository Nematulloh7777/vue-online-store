<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <drawerHead />

        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
            <InfoBlock v-if="!totalPrice && !orderId" title="Корзина пустая"
                description="Добавьте хотя бы одну таваров, чтобы сделать заказ." imageUrl="/img/package-icon.png" />
            <InfoBlock v-if="orderId" title="Заказ оформлен!"
                :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
                imageUrl="/img/order-success-icon.png" />
        </div>

        <div v-else>
            <CartItemList />

            <div class="flex flex-col gap-4 mt-7">
                <div class="flex gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dashed "></div>
                    <b>{{ totalPrice }} с.</b>
                </div>

                <div class="flex gap-2">
                    <span>Налог 5%:</span>
                    <div class="flex-1 border-b border-dashed "></div>
                    <b>{{ vatPrice }} с.</b>
                </div>

                <button :disabled="buttonDisabled" @click="createOrder"
                    class="bg-lime-500 mt-7 w-full rounded-xl py-3 text-white cursor-pointer disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700 ">
                    Оформить заказ
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'

import drawerHead from './drawer-head.vue'
import CartItemList from './cart-item-list.vue'
import InfoBlock from './info-block.vue'


const isCreating = ref(false)
const orderId = ref(null)

const props = defineProps({
    totalPrice: Number,
    vatPrice: Number,
})

const { cart } = inject('cart')

const createOrder = async () => {
    try {
        isCreating.value = true
        const { data } = await axios.post(`https://e3bad24872a7511a.mokky.dev/orders`, {
            items: cart.value,
            totalPrice: props.totalPrice,
        })

        cart.value = []

        orderId.value = data.id
    } catch (err) {
        console.log(err)
    } finally {
        isCreating.value = false
    }
}

const buttonDisabled = computed(() => isCreating.value ? true : props.totalPrice ? false : true)
</script>