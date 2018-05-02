// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import vuex from 'vuex'
import router from './router'
import store from './store'

//rem转换
import '../static/js/flexible.js'
import toolsTwo from '../static/js/toolsTwo.js'

Vue.prototype.$toolsTwo = toolsTwo
//vant框架
import {
  Popup,
  Uploader,
  Actionsheet,
  Toast,
  Dialog,
  DatetimePicker,
  Radio,
  Area
} from 'vant';

Vue.use(Popup)
  .use(Uploader)
  .use(Actionsheet)
  .use(Dialog)
  .use(DatetimePicker)
  .use(Radio)
  .use(Area)


Vue.config.productionTip = false

//更改titile的方法
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
