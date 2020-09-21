import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store";
import { cookies } from './api/api-utils';

import App from './App.vue';
import DashboardScreen from './screens/NewsScreen.vue';

import LoginScreen from "./screens/LoginScreen";
import { auth } from "@/api/firebase";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/cabinet' },
  { path: '/cabinet',
    component:  DashboardScreen,
    meta: {
      requiresAuth: true,
    }
  },
  { path: '/login', component: LoginScreen },
  { path: '*', redirect: '/cabinet' },
];

export const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeResolve((to, from, next) => {
  // const isAuthenticated = cookies.get('token');
  // if (!isAuthenticated && (to.path !== '/login')) next('/login');
  // else next();
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
});

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
})