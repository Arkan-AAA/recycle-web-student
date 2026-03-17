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
        component: () => import('../pages/NewsPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../pages/ProfilePage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/aichat',
        name: 'AIChat',
        component: () => import('../pages/AIPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../pages/HomePage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: () => import('../pages/AdminPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/journal',
        name: 'Journal',
        component: () => import('../pages/JournalPageNew.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('../pages/SchedulePage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/transcript',
        name: 'Transcript',
        component: () => import('../pages/TranscriptPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/grades',
        name: 'Grades',
        component: () => import('../pages/GradesPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/diploma',
        name: 'Diploma',
        component: () => import('../pages/DiplomaPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: () => import('../pages/NotificationsPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/subject/:id',
        name: 'SubjectDetail',
        component: () => import('../pages/SubjectDetailPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/journal/:id',
        name: 'JournalDetail',
        component: () => import('../pages/SubjectDetailPage.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const { default: authService } = await import('../services/auth.service');
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else if (to.meta.requiresAdmin && !isAdmin) {
        next('/home');
    } else if (to.path === '/' && isAuthenticated) {
        next('/home');
    } else {
        next();
    }
});

export default router