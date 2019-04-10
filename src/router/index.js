import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('@/pages/home')
const Login = () => import('@/pages/login')
const Register = () => import('@/pages/register')
const Forget = () => import('@/pages/Forget')


// const suppliermanagement =() => import('@/pages/SystemSetup/suppliermanagement')
const SystemSetup = name => () => import('@/pages/SystemSetup/' + name)
const SystemQuery = name => () => import('@/pages/SystemQuery/' + name)
const ProductCheck = name => () => import('@/pages/ProductCheck/' + name)
const ProductExit = name => () => import('@/pages/ProductExit/' + name)
const ProductStorage = name => () => import('@/pages/ProductStorage/' + name)



export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/systemsetup',
          name: 'systemsetup',
          redirect: '/systemsetup/personmanage',
          component: SystemSetup('index'),
          children: [
            {
              path: '/systemsetup/personmanage',
              name: 'personmanage',
              component: SystemSetup('personmanage')
            },
            {
              path: '/systemsetup/goodsmanage',
              name: 'goodsmanage',
              component: SystemSetup('goodsmanage')
            },
            {
              path: '/systemsetup/storemanage',
              name: 'storemanage',
              component: SystemSetup('storemanage')
            },
            {
              path: '/systemsetup/suppliermanagement',
              name: 'suppliermanagement',
              component: SystemSetup('suppliermanagement')
            },
            {
              path: '/systemsetup/customermanage',
              name: 'customermanage',
              component: SystemSetup('customermanage')
            },
            {
              path: '/systemsetup/repositorymap',
              name: 'repositorymap',
              component: SystemSetup('repositorymap')
            }
          ]
        },
        {
          path: '/productstorage',
          name: 'productstorage',
          redirect: '/productstorage/writeorder',
          component: ProductStorage('index'),
          children: [
            {
              path: '/productstorage/writeorder',
              name: 'writeorder',
              component: ProductStorage('writeorder')
            },
            {
              path: '/productstorage/outorderaudit',
              name: 'outorderaudit',
              component: ProductStorage('outorderaudit')
            },
            {
              path: '/productstorage/purchase',
              name: 'purchase',
              component: ProductStorage('purchase')
            },
            {
              path: '/productstorage/historyorder',
              name: 'historyorder',
              component: ProductStorage('historyorder')
            },
            {
              path: '/productstorage/reverseretirement',
              name: 'reverseretirement',
              component: ProductStorage('reverseretirement')
            }
          ]
        },
        {
          path: '/productexit',
          name: 'productexit',
          component: ProductExit('index'),
          redirect: '/productexit/writewarehousereceipt',
          children: [
            {
              path: '/productexit/writewarehousereceipt',
              name: 'writewarehousereceipt',
              component: ProductExit('writewarehousereceipt')
            },
            {
              path: '/productexit/exithistory',
              name: 'exithistory',
              component: ProductExit('exithistory')
            },
            {
              path: '/productexit/exitorderaudit',
              name: 'exitorderaudit',
              component: ProductExit('exitorderaudit')
            },
            {
              path: '/productexit/goodsout',
              name: 'goodsout',
              component: ProductExit('goodsout')
            }
          ]
        },
        {
          path: '/productcheck',
          name: 'productcheck',
          component: ProductCheck('index'),
          redirect: '/productcheck/goodscounting',
          children: [
            {
              path: '/productcheck/goodscounting',
              name: 'goodscounting',
              component: ProductCheck('goodscounting')
            },
            {
              path: '/productcheck/goodsmove',
              name: 'goodsmove',
              component: ProductCheck('goodsmove')
            },
            {
              path: '/productcheck/repertoryenvironment',
              name: 'repertoryenvironment',
              component: ProductCheck('repertoryenvironment')
            }
          ]
        },
        {
          path: '/systemquery',
          name: 'systemquery',
          component: SystemQuery('index'),
          redirect: '/SystemQuery/purchaseordersquery',
          children: [
            {
              path: '/systemquery/purchaseordersquery',
              name: 'purchaseordersquery',
              component: SystemQuery('purchaseordersquery')
            },
            {
              path: '/systemquery/returnquery',
              name: 'returnquery',
              component: SystemQuery('returnquery')
            },
            {
              path: '/systemquery/outorderquery',
              name: 'outorderquery',
              component: SystemQuery('outorderquery')
            },
            {
              path: '/systemquery/stockquery',
              name: 'stockquery',
              component: SystemQuery('stockquery')
            },
            {
              path: '/systemquery/goodsmovequery',
              name: 'goodsmovequery',
              component: SystemQuery('goodsmovequery')
            }
          ]
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
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
  ]
})
