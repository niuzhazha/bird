// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
axios.defaults.withCredentials = true
// import Qs from 'qs'
Vue.use(ElementUI)
Vue.use(VueJsonp)

Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.proptype.Qs = Qs
// Vue.proptype.HOST = 'http://192.168.0.107:8080'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
