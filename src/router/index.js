import { createRouter, createWebHistory } from 'vue-router'

const login = () => import("../views/login.vue")
const semester =() => import("../views/selectseason.vue")

const routes = [
  {
    path: '/',
    redirect: '/login'   //重定向
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/semester',
    name: 'semester',
    component: semester
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManagerView.vue')
  },
  {
    path: '/student',
    name: 'student',

    component: () => import(/* webpackChunkName: "about" */ '../views/StudentView.vue')
  },
  {
    path: '/teacher',
    name: 'teacher',

    component: () => import(/* webpackChunkName: "about" */ '../views/TeacherView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
