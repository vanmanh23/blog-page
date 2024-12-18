import HomePage from "@/pages/HomePage.vue";
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { createRouter, createWebHistory } from "vue-router";
const routes  = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: HomePage
            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;