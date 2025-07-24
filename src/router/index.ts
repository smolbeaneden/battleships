import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import PlayerWaitingRoom from '@/views/game views/PlayerWaitingRoom.vue'
import HostWaitingRoom from '@/views/game views/HostWaitingRoom.vue'
import PlacingShips from '@/views/game views/PlacingShips.vue'
import GameCourse from '@/views/game views/GameCourse.vue'
import {roomID} from '../data/DataStore'
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
    },
  ],
})

export default router
