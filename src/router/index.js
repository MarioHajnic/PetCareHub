import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/pets',
        name: 'pets',
        component: () => import('@/views/PetsView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/pets/add',
        name: 'addpet',
        component: () => import('@/views/AddPetView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/pets/edit/:id',
        name: 'EditPet',
        component: () => import('@/views/EditPetView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/activities',
        name: 'activities',
        component: () => import('@/views/ActivitiesView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/activities/add',
        name: 'addactivity',
        component: () => import('@/views/AddActivityView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/history',
        name: 'history',
        component: () => import('@/views/HistoryView.vue'),
        meta: { requiresAuth: true }
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegisterView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const user = auth.currentUser
    if (to.meta.requiresAuth && !user) {
        return '/login'
    }
})


export default router
