import 'es6-promise/auto'
import axios from 'axios'

const HOMEDATA = 'HOMEDATA' //初始传人值
const CHECKPT = 'CHECKPT' //投保信息录入
const TESTASWER = 'TESTASWER' //投保信息录入
const SENDTEPY = 'SENDTEPY' //投保人验证码
const POLICYHOLDER = 'POLICYHOLDER' //投保人信息提交
const ADDPOLICY = 'ADDPOLICY' //添加受益人
const UPLOADCRADIMG = 'UPLOADCRADIMG' //上传身份证方法

const state = {
    aswerData: ''
}

const mutations = {

}

const actions = {

    //初始传入客户信息
    [HOMEDATA]({ commit }, { homedata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: '/wxqhbcloud/tep/toTaxExtensionPensionIndex.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                window.localStorage.setItem('openidList', JSON.stringify(result.result))
                successCallback()
            }else {
                console.error('tepagent接口报错')
            }

        }).catch((err) => {
            // failCallback()
            console.error('tepagent接口未通')
        })
    },
    //投保信息录入
    [CHECKPT]({ commit }, { messageData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: '/wxqhbcloud/tep/checkProjectTerms.html',
            data: messageData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                // window.localStorage.setItem('tepagent', JSON.stringify(result.result.tep_agent))
                successCallback()
            } else {
                console.error('投保信息录入接口报错')
            }

        }).catch((err) => {
            // failCallback()
            console.error('投保信息录入接口未通')
        })
    },
    //答题完提交答案
    [TESTASWER]({ commit }, { testAswerData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: '/wxqhbcloud/tep/tepQuestionnaire.html',
            data: testAswerData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                state.aswerData = result.result
                successCallback()
            } else if (result.responseCode == '1'){
                console.error('答题接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('答题接口未通')
        })
    },
    //发送验证码
    [SENDTEPY]({ commit }, { sendTEPYzmData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: '/wxqhbcloud/tep/sendTEPYzm.html',
            data: sendTEPYzmData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else if (result.responseCode == '1') {
                console.error('验证码接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('验证码接口未通')
        })
    },
    //投保人基本信息
    [POLICYHOLDER]({ commit }, { policyData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: '/wxqhbcloud/tep/checkApplicantTerms.html',
            data: policyData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else if (result.responseCode == '1') {
                failCallback()
                console.error('投保人基本信息接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('投保人基本信息接口未通')
        })
    },
    //添加受益人的
    [ADDPOLICY]({ commit }, { policyBenesData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: '/wxqhbcloud/tep/checkBbeneficiary.html',
            data: policyBenesData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else if (result.responseCode == '1') {
                failCallback()
                console.error('添加受益人接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('添加受益人接口未通')
        })
    },
    //上传身份证
    [UPLOADCRADIMG]({ commit }, { cardListData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: '/wxqhbcloud/tep/tepCheckCredentialsPhotos.html',
            data: cardListData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else if (result.responseCode == '1') {
                failCallback()
                console.error('上传身份证接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('上传身份证接口未通')
        })
    }
}

const getters = {
    aswerData(state) {
        return state.aswerData
    },
}


export default {
    state,
    mutations,
    actions,
    getters
}