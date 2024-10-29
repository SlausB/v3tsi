import { createRouter, createWebHistory } from 'vue-router';
import PostList from '@/components/PostList.vue';

const routes = [
{
    path: '/',
    name: 'Posts',
    component: PostList,
},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
