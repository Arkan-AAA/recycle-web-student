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
    },
    {
        path: '/aichat',
        name: 'AIChat',
        component: () => import('../pages/AIPage.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/AuthPage.vue')
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: () => import('../pages/AdminPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router