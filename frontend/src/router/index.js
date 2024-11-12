import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/pages/Home.vue');
const Loan = () => import('@/pages/Loan.vue');
const Management = () => import('@/pages/Management.vue');
const Admin = () => import('@/pages/Admin.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      name: 'loan',
      component: Loan,
    },
    {
      path: '/',
      name: 'management',
      component: Management,
    },
    {
      path: '/',
      name: 'admin',
      component: Admin,
    },
  ],
});

export default router;
