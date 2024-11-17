import { createRouter, createWebHistory } from 'vue-router';

import index from './view/index.vue';
import UserPage from './view/UserPage.vue';
import HomePage from './view/HomePage.vue';
import UserInfo from './view/UserInfo.vue';
import CartPage from './view/CartPage.vue';


const routes = [
                { path: '/', component: index},
                { path: '/HomePage', component: HomePage},
                { path: '/UserPage', component: UserPage},
                { path: '/UserInfo', component: UserInfo},
                { path: '/CartPage', component: CartPage},
                //{ path: '/:pathMatch(.*)*', component: NotFound },  // NotFound is a placeholder for 404 page
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;