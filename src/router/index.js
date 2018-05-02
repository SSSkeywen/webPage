import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/pages/home'
import tbmessage from '@/pages/tbmessage'
import assesspage from '@/pages/assesspage'
import testpage from '@/pages/testpage'
import resultpage from '@/pages/resultpage'
import beneficiarypag from '@/pages/beneficiarypag'
import policyholder from '@/pages/policyholder'
import identitycardpage from '@/pages/identitycardpage'
import previewpage from '@/pages/previewpage'
import buypage from '@/pages/buypage'
import recordpage from '@/pages/recordpage'
import paypage from '@/pages/paypage'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'tbmessage',
      component: tbmessage,
      meta: {
        title: '保障方案'
      }
    }, {
      path: '/tbmessage',
      name: 'tbmessage',
      component: tbmessage,
      meta: {
        title: '保障方案'
      }
    }, {
      path: '/assesspage',
      name: 'assesspage',
      component: assesspage,
      meta: {
        title: '评估问卷'
      }
    }, {
      path: '/testpage',
      name: 'testpage',
      component: testpage,
      meta: {
        title: '评估问卷'
      }
    }, {
      path: '/resultpage',
      name: 'resultpage',
      component: resultpage,
      meta: {
        title: '评估问卷'
      }
    }, {
      path: '/beneficiarypag',
      name: 'beneficiarypag',
      component: beneficiarypag,
      meta: {
        title: '身故受益人'
      }
    }, {
      path: '/policyholder',
      name: 'policyholder',
      component: policyholder,
      meta: {
        title: '投保信息'
      }
    }, {
      path: '/identitycardpage',
      name: 'identitycardpage',
      component: identitycardpage,
      meta: {
        title: '证件信息'
      }
    }, {
      path: '/previewpage',
      name: 'previewpage',
      component: previewpage,
      meta: {
        title: '投保预览'
      }
    }, {
      path: '/buypage',
      name: 'buypage',
      component: buypage,
      meta: {
        title: '太平收银台'
      }
    }, {
      path: '/recordpage',
      name: 'recordpage',
      component: recordpage,
      meta: {
        title: '我的购买记录'
      }
    }, {
      path: '/paypage',
      name: 'paypage',
      component: paypage,
      meta: {
        title: '太平收银台'
      }
    }
  ]
})
