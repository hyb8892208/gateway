import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale'
import {get_language} from './assets/js/lang'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import axios from 'axios'
import form_item from "./components/form_item";
import {request} from "./network/request";

Vue.config.productionTip = false
Vue.prototype.$axios = axios
let _lang = get_language()
locale.use(_lang)
Vue.use(ElementUI)
Vue.component('form_item',form_item)

//请求放到原型中
Vue.prototype.request = new request()

//设置cookie,增加到vue实例方便全局调用
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//获取cookie
Vue.prototype.getCookie = (name) => {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
    return (arr[2])
  else
    return null
}

//删除cookie
Vue.prototype.delCookie =(name) => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = this.getCookie(name)
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')