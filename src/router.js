import { createRouter, createWebHistory } from 'vue-router';


import TheLanding from './views/TheLanding.vue';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import MainContent from './components/MainContent.vue';

import store from './store/index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TheLanding },
        { path: '/main/:boardID', component: MainContent, meta: { requiresAuth: true } },
        { path: '/signin', component: SignIn },
        { path: '/signup', component: SignUp }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
});

// Function called before the user enter each route (page)
router.beforeEach(function (to, _, next) {
    // Redirect user to sign in page if not authenticated
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/signin')
    } else {
        next();
    }
});


export default router;