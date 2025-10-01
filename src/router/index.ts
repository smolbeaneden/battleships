import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import { ownID } from '@/data/DataStore.ts'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: `/:roomID`,
      name: 'game',
      component: GameView,
      meta: { requireAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Assume an `isAuthenticated()` function that checks user's login status
    if (!authorizeOrAddUser(to.toString(), ownID.value)) {
      // If not authenticated, redirect to the login page
      next('/')
    } else {
      // If authenticated, proceed to the route
      next()
    }
  } else {
    // If the route doesn't require authentication, proceed
    next()
  }
})

export default router
