import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/news',
        name: 'News',
        component: () => import('../pages/NewsPage.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../pages/ProfilePage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router