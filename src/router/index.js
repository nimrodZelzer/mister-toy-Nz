import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'toy-app',
      component: toyApp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
})

export default router
