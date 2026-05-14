import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetsView.vue'),
    },
    {
      path: '/pets/add',
      name: 'add-pet',
      component: () => import('../views/AddPetView.vue'),
    },
    {
      path: '/pets/edit/:id',
      name: 'edit-pet',
      component: () => import('../views/EditPetView.vue'),
      props: true,
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue'),
    },
    {
      path: '/activities/add',
      name: 'add-activity',
      component: () => import('../views/AddActivityView.vue'),
    },
    {
      path: '/activities/edit/:id',
      name: 'edit-activity',
      component: () => import('../views/EditActivityView.vue'),
      props: true,
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
