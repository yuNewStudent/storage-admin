import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/pages/home')
const Login = () => import('@/pages/login')
const Register = () => import('@/pages/register')
const SystemSetup = () => import('@/pages/SystemSetup/SystemSetup')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/systemsetup/home',
          name: 'systemsetup',
          component: SystemSetup
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
