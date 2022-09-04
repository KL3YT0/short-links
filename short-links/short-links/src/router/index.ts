import { createRouter, createWebHistory } from 'vue-router';
import * as PAGES from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/auth',
    name: 'auth',
    component: PAGES.Auth
  }, {
    path: '/register',
    name: 'register',
    component: PAGES.Register
  }, {
    path: '/',
    name: 'statistics',
    component: PAGES.Statistics
  }],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'statistics') {
    const isAuthenticated = !!localStorage.getItem('access_token')
      && !!localStorage.getItem('token_type');

    if (!isAuthenticated) {
      next({ name: 'auth' })
    }

    next();
  }

  next()
})

export default router;
