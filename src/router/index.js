import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/pages/home')
const Login = () => import('@/pages/login')
const Register = () => import('@/pages/register')

const SystemSetup = () => import('@/pages/SystemSetup/index')
const PersonManage = () => import('@/pages/SystemSetup/PersonManage')
const ProductStorage = () => import('@/pages/ProductStorage/index')
const ProductExit = () => import('@/pages/ProductExit/index')
const ProductCheck = () => import('@/pages/ProductCheck/index')
const SystemQuery = () => import('@/pages/SystemQuery/index')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/systemsetup',
          component: SystemSetup,
          redirect: '/systemsetup/default',
          children: [
            {
              path: '/systemsetup/default',
              component: SystemSetup
            },
            {
              path: '/systemsetup/personmanage',
              name: 'personmanage',
              component: PersonManage
            }
          ]
        },
        {
          path: '/productstorage',
          name: 'productstorage',
          component: ProductStorage
        },
        {
          path: '/productexit',
          name: 'productexit',
          component: ProductExit
        },
        {
          path: '/productcheck',
          name: 'productcheck',
          component: ProductCheck
        },
        {
          path: '/systemquery',
          name: 'systemquery',
          component: SystemQuery
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
