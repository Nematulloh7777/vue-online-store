import {defineStore} from 'pinia'
import {ref, computed, inject} from 'vue'
import axios from 'axios'

export const useCartStore = defineStore('cart', () => {
  const {cart} = inject('cart')

  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
  const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
  const orderId = ref(null)
  const isCreating = ref(false)

  const createOrder = async () => {
    try {
      isCreating.value = true
      const {data} = await axios.post(`https://e3bad24872a7511a.mokky.dev/orders`, {
        items: cart.value,
        totalPrice: totalPrice.value,
      })

      cart.value = []
      orderId.value = data.id
    } catch (err) {
      console.log(err)
    } finally {
      isCreating.value = false
    }
  }

  const addItem = (item) => {
    cart.value.push(item)
  }

  const removeItem = (index) => {
    cart.value.splice(index, 1)
  }

  return {
    cart,
    totalPrice,
    vatPrice,
    orderId,
    isCreating,
    createOrder,
    addItem,
    removeItem,
  }
})
