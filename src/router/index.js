import HomePage from "@/pages/HomePage.vue";
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { createRouter, createWebHistory } from "vue-router";
import BlogDetail from "@/pages/BlogDetail.vue";
const routes  = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: HomePage
            },
            {
                path: '/blog/:id',
                name: 'BlogDetail',
                component: BlogDetail,
            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;