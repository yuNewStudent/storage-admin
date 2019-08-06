// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Moment from 'moment'
import store from './store'
import App from './App'
var VueCookie = require('vue-cookie');
var Blob = require('blob');
// Tell Vue to use the plugin
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.moment = Moment
Vue.prototype.$http = Axios

// 路由拦截
const routers = ['login', 'forget']
router.beforeEach((to, from, next) => {
  // 如果未登录， 只能跳转至登录页面或者注册页面
  const loginUser = JSON.parse(VueCookie.get('user'))
  if(!loginUser && routers.indexOf(to.name) == -1){
    return next({ name: 'login' })
  }
  next()
})

// 添加请求头
Axios.interceptors.request.use(config => {
  const loginUser = JSON.parse(VueCookie.get('user'))
  const bol = config.url.indexOf('get') == -1 && config.url.indexOf('query') == -1 && config.url.indexOf('detail') == -1 && config.url.indexOf('login') == -1 && config.url.indexOf('forget') == -1 && config.url.indexOf('history') == -1 && config.url.indexOf('export')==-1
  if (bol) {
    if (config.data instanceof Array) {
      config.data.unshift({
        login_name: loginUser.name,
        login_email: loginUser.email
      })
    } else {
      config.data.login_name = loginUser.name
      config.data.login_email = loginUser.email
    }
  }
  return config
})

// 请求返回拦截
Axios.interceptors.response.use(
  res => {
    if (res.status === 401) {
      // app &&
      //   app.$message({
      //     type: 'warning',
      //     message: '登录身份过期，请重新登录。'
      //   })
      // sessionStorage.removeItem('token')
      // sessionStorage.removeItem('user')
      // router.push({ name: 'login' })
      return Promise.reject(new Error('身份过期'))
    } else {
      return res.data
    }
  }
)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
