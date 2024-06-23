import './assets/main.css'

import {createApp} from 'vue'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import {createPinia} from 'pinia'
import router from './router.js'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)

app.use(pinia)
app.mount('#app')
