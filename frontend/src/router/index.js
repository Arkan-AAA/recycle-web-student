import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../pages/AuthPage.vue')
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
        path: '/home',
        name: 'Home',
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: () => import('../pages/AdminPage.vue')
    },
    {
        path: '/journal',
        name: 'Journal',
        component: () => import('../pages/JournalPageNew.vue')
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('../pages/SchedulePage.vue')
    },
    {
        path: '/transcript',
        name: 'Transcript',
        component: () => import('../pages/TranscriptPage.vue')
    },
    {
        path: '/grades',
        name: 'Grades',
        component: () => import('../pages/GradesPage.vue')
    },
    {
        path: '/diploma',
        name: 'Diploma',
        component: () => import('../pages/DiplomaPage.vue')
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: () => import('../pages/NotificationsPage.vue')
    },
    {
        path: '/subject/:id',
        name: 'SubjectDetail',
        component: () => import('../pages/SubjectDetailPage.vue')
    },
    {
        path: '/journal/:id',
        name: 'JournalDetail',
        component: () => import('../pages/SubjectDetailPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router