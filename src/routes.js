import login from './pages/Login.vue';
import register from './pages/Register.vue';
import home from './pages/Home.vue';

export const routes = [
    {
        path: "/",
        component: home,
        meta: {
            auth: undefined
        }

    },
    {
        path: "/login",
        component: login,
        meta: {
            auth: false
        }

    },
    {
        path: "/register",
        component: register,
        meta: {
            auth: false
        }

    },
   /*  {
        // USER ROUTES
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    },
    {
    },
    // ADMIN ROUTES
    {
        path: '/admin',
        name: 'admin.dashboard',
        component: AdminDashboard,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
        }
    } */
    
];