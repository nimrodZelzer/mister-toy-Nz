import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/toy',
      name: 'toy-app',
      component: toyApp
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
  ]
})

export default router
