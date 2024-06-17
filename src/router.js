import {createWebHistory, createRouter} from 'vue-router'

import Home from './pages/home.vue'
import Favorites from './pages/favorites.vue'
import DetailsCard from './pages/details-card.vue'

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/favorites', name: 'Favorites', component: Favorites},
  {path: '/details-card/:id', name: 'DetailsCard', component: DetailsCard},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
