import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui'
import rate from 'vue-rate'
import MintUI from 'mint-ui'
import store from './store'
import global_ from './global'

import '@/assets/reset.css'
import 'muse-ui/dist/muse-ui.css'
import 'mint-ui/lib/style.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui-loading/dist/muse-ui-loading.css'

Vue.use(MintUI)
Vue.use(MuseUI)
Vue.use(rate)

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_
axios.defaults.baseURL = '/api'

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (JSON.parse(localStorage.getItem('JWT_TOKEN'))) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
