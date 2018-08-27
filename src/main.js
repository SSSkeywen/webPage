// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import vuex from 'vuex'
import router from './router'
import store from './store'
// import wx from 'weixin-js-sdk'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

//rem转换
import '../static/js/flexible.js'
// import wx from 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
// import '../static/js/tools.js'
import toolsTwo from '../static/js/toolsTwo.js'

Vue.prototype.$toolsTwo = toolsTwo

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// Vue.prototype.$wx = wx
//vant框架
import {
  Popup,
  Uploader,
  Actionsheet,
  Toast,
  Icon,
  Dialog,
  DatetimePicker,
  Radio,
  Area,
  Picker,
  Button
} from 'vant';

Vue.use(Popup)
  .use(Uploader)
  .use(Picker)
  .use(Actionsheet)
  .use(Dialog)
  .use(DatetimePicker)
  .use(Radio)
  .use(Area)
  .use(Icon)
  .use(Button)


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
