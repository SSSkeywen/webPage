import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import tbmessage from '@/pages/tbmessage'
import assesspage from '@/pages/assesspage'
import testpage from '@/pages/testpage'
import resultpage from '@/pages/resultpage'
import beneficiarypag from '@/pages/beneficiarypag'
import policyholder from '@/pages/policyholder'
import policyholder2 from '@/pages/policyholder2'
import identitycardpage from '@/pages/identitycardpage'
import previewpage from '@/pages/previewpage'
import buypage from '@/pages/buypage'
import buypagetwo from '@/pages/buypageTwo'
import recordpage from '@/pages/recordpage'
import paypage from '@/pages/paypage'
import paypagetwo from '@/pages/paypageTwo'
import insuranceList from '@/pages/insuranceList'
import accountpage from '@/pages/accountPage'
import details from '@/pages/details'
import clausepage from '@/pages/clausePage'
import clausePageTwo from '@/pages/clausePageTwo'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '太平税延养老'
      }
    },{
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '太平税延养老'
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
        title: '身故受益人信息'
      }
    }, {
      path: '/policyholder',
      name: 'policyholder',
      component: policyholder,
      meta: {
        title: '投保信息'
      }
    }, {
      path: '/policyholder2',
      name: 'policyholder2',
      component: policyholder2,
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
      path: '/buypagetwo',
      name: 'buypagetwo',
      component: buypagetwo,
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
    }, {
      path: '/paypagetwo',
      name: 'paypagetwo',
      component: paypagetwo,
      meta: {
        title: '太平收银台'
      }
    }, {
      path: '/insuranceList',
      name: 'insuranceList',
      component: insuranceList,
      meta: {
        title: '保单服务'
      }
    }, {
      path: '/accountpage',
      name: 'accountpage',
      component: accountpage,
      meta: {
        title: '账户价值'
      }
    }, {
      path: '/details',
      name: 'details',
      component: details,
      meta: {
        title: '账户价值'
      }
    }, {
      path: '/clausepage',
      name: 'clausepage',
      component: clausepage,
      meta: {
        title: '保险条款'
      }
    }, {
      path: '/clausePageTwo',
      name: 'clausePageTwo',
      component: clausePageTwo,
      meta: {
        title: '投保须知'
      }
    }
  ]
})
