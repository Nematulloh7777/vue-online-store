<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

  <Header :total-price="totalPrice" @open-drawer="openDrawer" />

  <div>

    <div class="p-10">

      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, provide, computed } from 'vue'

import Header from './components/header.vue'
import Drawer from './components/drawer.vue'

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const drawerOpen = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
},
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
})

</script>
