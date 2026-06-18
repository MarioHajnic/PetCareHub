import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PetsView from '@/views/PetsView.vue'
import AddPetView from '@/views/AddPetView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import AddActivityView from '@/views/AddActivityView.vue'
import HistoryView from '@/views/HistoryView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { auth } from '@/firebase'

const routes = [
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/pets', name: 'pets', component: PetsView, meta: { requiresAuth: true } },
    { path: '/pets/add', name: 'addpet', component: AddPetView, meta: { requiresAuth: true } },
    {
        path: '/pets/edit/:id', name: 'EditPet', component: () => import('@/views/EditPetView.vue')
    },

    { path: '/activities', name: 'activities', component: ActivitiesView, meta: { requiresAuth: true } },
    { path: '/activities/add', name: 'addactivity', component: AddActivityView, meta: { requiresAuth: true } },
    { path: '/history', name: 'history', component: HistoryView, meta: { requiresAuth: true } },

    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView }
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
