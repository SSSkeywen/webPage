import 'es6-promise/auto'
import axios from 'axios'
import qs from 'qs'

const HOMEDATA = 'HOMEDATA' //初始传人值
const CHECKPT = 'CHECKPT' //投保信息录入
const TESTASWER = 'TESTASWER' //投保信息录入
const SENDTEPY = 'SENDTEPY' //投保人验证码
const POLICYHOLDER = 'POLICYHOLDER' //投保人信息提交
const ADDPOLICY = 'ADDPOLICY' //添加受益人
const UPLOADCRADIMG = 'UPLOADCRADIMG' //上传身份证方法
const TEPSUBMITINFO = 'TEPSUBMITINFO' // 消息提交
const TEPTOPAY = 'TEPTOPAY' // 支付
const TEPTOPAYTWO = 'TEPTOPAYTWO' // 支付
const GETJOBCODE = 'GETJOBCODE' // 获取职业
const BANKLIST = 'BANKLIST' // 获取职业WXDATAFN
const CERTLIST = 'CERTLIST' //赵盼获取证件号码
const WXDATAFN = 'WXDATAFN' // 微信
const APPLIST = 'APPLIST' // 历史记录页面INSURANCE
const INSURANCE = 'INSURANCE' // 产品内容
const FOURJQ = 'FOURJQ' // 产品内容FOURJQCODE
const FOURJQCODE = 'FOURJQCODE' // 产品内容FOURJQCODE
const GET_NATIONALITY_ALL = 'GET_NATIONALITY_ALL' //获取国家码表
const CRS_INDEX = 'CRS_INDEX' //信息录入完提交接口
const CRS_EXEMPT = 'CRS_EXEMPT' //是否用CRS
const NEED_AUTH = 'NEED_AUTH' //是否启用四要素鉴权
const GET_CHINA_CITY_ALL = 'GET_CHINA_CITY_ALL' //是否启用四要素鉴权

const state = {
    aswerData: '',
    // ulrData: '/wxqhbcloud/'
    ulrData: '/wxqhb/'
}

const mutations = {

}

const actions = {

    //初始传入客户信息
    [HOMEDATA]({ commit }, { homedata, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'toTaxExtensionPensionIndex.html',
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
            url: state.ulrData + 'tep/checkProjectTerms.html',
            data: messageData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                // window.localStorage.setItem('tepagent', JSON.stringify(result.result.tep_agent))
                successCallback()
            } else {
                console.log(result.msg)
                failCallback(result.msg)
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
            url: state.ulrData + 'tep/tepQuestionnaire.html',
            data: testAswerData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                state.aswerData = result.result
                let resultTwo = JSON.stringify(result)
                window.localStorage.setItem('questScore', resultTwo)
                successCallback()
            } else if (result.responseCode == '1'){
                failCallback(result.msg)
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
            url: state.ulrData + 'tep/sendTEPYzm.html',
            data: sendTEPYzmData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            // console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.result)
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
            url: state.ulrData + 'tep/checkApplicantTerms.html',
            data: policyData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else if (result.responseCode == '1') {
                failCallback(result.msg)
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
            url: state.ulrData + 'tep/checkBbeneficiary.html',
            data: policyBenesData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.result)
            } else if (result.responseCode == '1') {
                failCallback(result.msg)
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
            url: state.ulrData + 'tep/tepCheckCredentialsPhotos.html',
            data: cardListData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else if (result.responseCode == '1') {
                failCallback(esult.msg)
                console.error('上传身份证接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('上传身份证接口未通')
        })
    },
    //提交数据方法
    [TEPSUBMITINFO]({ commit }, { tepsubmitData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tep/tepSubmitInfo.html',
            data: tepsubmitData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                let resultTwo = JSON.stringify(result)
                window.localStorage.setItem('buyList', resultTwo)
                successCallback()
            } else{
                failCallback(result.msg)
                console.error('提交数据接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('提交数据接口未通')
        })
    },
    //支付
    [TEPTOPAY]({ commit }, { payListData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tep/tepToPay.html',
            data: payListData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else {
                failCallback(result.msg)
                console.error('提交数据接口报错' + result.msg)
            }

        }).catch((err) => {
            failCallback()
            console.error('提交数据接口未通111111')
        })
    },
    //支付2
    [TEPTOPAYTWO]({ commit }, { payListDataTwo, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tax/taxpay.html',
            data: payListDataTwo,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else {
                failCallback(result.msg)
                console.error('提交数据接口报错2222' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('提交数据接口未通222222')
        })
    },
    //获取职业
    [GETJOBCODE]({ commit }, { jobCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tep/getJobCode.html',
            data: jobCodeData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.result)
            } else {
                failCallback()
                console.error('获取职业接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('获取职业接口未通')
        })
    },
    //获取职业
    [BANKLIST]({ commit }, { bankListData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'tax/banklist.html',
            data: bankListData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.result)
            } else {
                failCallback(result.msg)
                console.error('获取职业接口报错' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('获取职业接口未通')
        })
    },
    // 赵盼获取证件接口
    [CERTLIST]({ commit }, { certListData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'tax/certlist.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.result)
            } else {
                failCallback(result.msg)
                console.error('获取证件接口报错' + result.msg)
            }

        }).catch((err) => {
            console.error('获取职业接口未通')
        })
    },
    // 是否启用四要素鉴权 NEED_AUTH
    [NEED_AUTH]({ commit }, {  successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tax/needAuth.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.responseCode)
            } else if (result.responseCode == '1'){
                successCallback(result.responseCode)
                // failCallback(result.msg, result.responseCode)
                
            }else{
                console.error('是否启用四要素鉴权' + result.msg)
            }

        }).catch((err) => {
            console.error('是否启用四要素鉴权未通')
        })
    },
    // 四要素鉴权 NEED_AUTH
    [FOURJQ]({ commit }, { FourJqData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tax/judgeAuth.html',
            data: FourJqData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback()
            } else {
                failCallback(result.msg, result.responseCode)
                console.error('四要素鉴权' + result.msg)
            }

        }).catch((err) => {
            console.error('四要素鉴权接口未通')
        })
    },
    // 四要素鉴权验证码
    [FOURJQCODE]({ commit }, { FourJqCodeData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tax/doAuth.html',
            data: FourJqCodeData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.msg)
            } else {
                failCallback(result.msg)
                console.error('四要素鉴权验证码' + result.msg)
            }

        }).catch((err) => {
            console.error('四要素鉴权验证码权接口未通')
        })
    },
    //调微信的接口
    [WXDATAFN]({ commit }, { WxData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tep/wxConfig.html',
            data: WxData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '1') {
                successCallback(result.result)
            } else {
                failCallback(result.msg)
                console.error('调微信的接口' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('调微信的接口')
        })
    },
    //历史记录页面
    [APPLIST]({ commit }, { applistData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'tax/applist.html',
            data: applistData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.responseCode == '0') {
                successCallback(result.result)
            } else {
                failCallback(result.msg)
                console.error('历史记录' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('历史记录')
        })
    },
    //产品内容
    [INSURANCE]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'accountIndex.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            let result = res.data
            console.log(result)
            if (result.code == '9999') {
                window.localStorage.removeItem("account");
                console.error('产品内容' + result.message)
            } else if (result.code == '9998'){
                window.localStorage.removeItem("account");
                failCallback(result.message)
            } else{
                
                
                window.localStorage.setItem("account", JSON.stringify(result));
                successCallback()

            }

        }).catch((err) => {
            window.localStorage.removeItem("account");
            // failCallback()
            console.error('产品内容')
        })
    },
    //获取国家码表
    [GET_NATIONALITY_ALL]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'crs/getNationalityAll.html',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            // console.log(res)
            let result = res.data
            if (result.state == '0000') {
                // console.log(result.data)
                successCallback(result.data)
            } else {
                failCallback(result.msg)
                // console.error('历史记录' + result.msg)
            }

        }).catch((err) => {
            // failCallback()
            console.error('获取国家码表')
        })
    },
    //CRS_INDEX信息录入提交方法
    [CRS_INDEX]({ commit }, {crsIndexData, successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'post',
            url: state.ulrData + 'crs/crsIndex.html',
            data: crsIndexData,
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            if (result.state == '0000') {
                successCallback(result.result)
            } else {
                failCallback(result.message)
                // console.error('历史记录' + result.msg)
            }

        }).catch((err) => {
            failCallback()
            console.error('信息录入提交方法')
        })
    },

    //获取中国所有地区
    [GET_CHINA_CITY_ALL]({ commit }, { successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'crs/getChinaCityAll.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            // console.log(res)
            let result = res.data
            if (result.state == '0000') {
                successCallback(result.data)
            } else {
                failCallback(result.message)
                // console.error('历史记录' + result.msg)
            }

        }).catch((err) => {
            failCallback()
            console.error('获取中国所有地区')
        })
    },

    //CRS_EXEMPT 判断是否加载CRS
    [CRS_EXEMPT]({ commit }, {  successCallback = () => { }, failCallback = () => { } }) {
        axios({
            method: 'get',
            url: state.ulrData + 'crs/isCrsExempt.html',
            data: '',
            "Content-Type": "multipart/form-data"
        }).then((res) => {
            console.log(res)
            let result = res.data
            window.localStorage.removeItem("account");
            window.localStorage.setItem("isCrsExempt", JSON.stringify(result));
            // if (result.state == '0000') {
            //     successCallback(result.result)
            // } else {
            //     failCallback(result.message)
            // }

        }).catch((err) => {
            failCallback()
            console.error('判断是否加载CRS')
        })
    },
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