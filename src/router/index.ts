import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '../views/PageNotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue')
    },
    {
      path: '/characters/:characterId',
      name: 'characterDetails',
      component: () => import('../views/CharacterDetailView.vue')
    },
    {
      path: '/comics',
      name: 'comics',
      component: () => import('../views/ComicsView.vue')
    },
    {
      path: '/comics/:comicsId',
      name: 'comicsDetails',
      component: () => import('../views/ComicsDetailView.vue')
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('../views/SeriesView.vue')
    },
    {
      path: '/series/:serieId',
      name: 'serieDetails',
      component: () => import('../views/SerieDetailView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
})

export default router
