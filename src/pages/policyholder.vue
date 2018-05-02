<template>
  <div class="box">
    <div class="tb_box">
      <p class="tb_box_title">投保人(即被保险人)基本信息</p>
      <ul class="tb_box_content">
        <li class="tb_box_li hasline">
          <p>姓名</p>
          <div class="tb_box_date_two">
            <input type="text" v-model="plicyName" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件类型</p>
          <div class="tb_box_date three">
              <p>身份证</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件号码</p>
          <div class="tb_box_date_two">
            <input v-model="plicyCardNm" type="text" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件有效期</p>
          <div class="tb_box_date three" @click="isIdentity=!isIdentity">
              <p>{{ identityTimeData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生日期</p>
          <div class="tb_box_date" @click="phShwoDate=!phShwoDate">
            <!-- <input type="date"> -->
            <p class="ph_date">{{ phbirthdayData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>性别</p>
          <div class="tb_box_date ph_sex">
            <p @click="menorwomen=true;sexMF = 'M'" :class="menorwomen?'sex_checked':''">男</p>
            <p @click="menorwomen=false;sexMF = 'F'" :class="menorwomen?'':'sex_checked'">女</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>职业</p>
          <div class="tb_box_date three" @click="isShowOccupation=!isShowOccupation">
            <p>{{ occuptionName }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>所在地区</p>
          <div class="tb_box_date three">
            <p @click="nowAddress=!nowAddress">{{ nowAddressData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
            <textarea name="" placeholder="请填写详细地址，不少于5个字" id="" cols="30" rows="10"></textarea>
          <!-- <p>交费金额</p>
          <div class="tb_box_date_two">
            <input type="text" placeholder="请输入">&nbsp;&nbsp;元
          </div> -->
        </li>
        <li class="tb_box_li hasline">
          <p>邮政编码</p>
          <div class="tb_box_date_two">
            <input v-model="zipData" type="text" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>电子邮箱</p>
          <div class="tb_box_date_two">
            <input v-model="EmailData" type="text" placeholder="用于接收电子保单等后续服务">
          </div>
        </li>
      </ul>
      <p class="tb_box_title">联系方式</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <div>
            <p>手机号码</p>
          </div>
          <div class="tb_box_date_two">
            <input v-model="phoneNm" type="text" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>验证码</p>
          <div class="yz_code">
            <div>
              <input type="number" v-model="vcCode" placeholder="请输入" oninput="if(value.length>6)value=value.slice(0,6)" >
            </div>
            <p @click="sendtepyFn">发送验证码</p>
          </div>
        </li>
      </ul>
      <p class="tb_box_title">验证码</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <p>续期缴费成功通知方式</p>
          <div class="tb_box_date three">
            <p>短信</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>各类通知书查询方式</p>
          <div class="tb_box_date three">
              <p>自助查询</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="tb_button">
      <button @click="nextpage">下一步</button>
    </div>
    <!-- 证件有效期 -->
    <van-actionsheet v-model="isIdentity" :actions="identityTime" cancel-text="取消" />
    <!-- 时间日期弹出框 -->
    <van-actionsheet v-model="phShwoDate">
    <van-datetime-picker
      v-model="phcurrentDate"
      type="date"
      :min-date="phminDate"
      :max-date="phmaxDate"
      @confirm="phdateFn"
      @cancel="phShwoDate = false"
    />
    </van-actionsheet>
    <!-- 时间日期弹出框身份证有效期 -->
    <van-actionsheet v-model="ltShwoDate">
    <van-datetime-picker
      v-model="ltcurrentDate"
      type="date"
      :min-date="ltminDate"
      :max-date="ltmaxDate"
      @confirm="ltdateFn"
      @cancel="ltShwoDate = false"
    />
    </van-actionsheet>
    <!-- 所在地区 -->
    <van-actionsheet v-model="nowAddress">
    <van-area 
    :area-list="AddressDataListTwo"
    :visible-item-count="3"
    @confirm="addressFn"
    @cancel="cancelAddress"
     />
    </van-actionsheet>
    <!-- 职业选择弹出层 -->
    <van-popup class="occupation_box" v-model="isShowOccupation" position="right" :overlay="true">
      <div class="occupation_style">
        <ul class="occupation_ul">
          <li v-for="(occupationData, index) in inCommonUseOccupation" :key="index" @click="selectCommon(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationData.internal }}</hgroup>
              <p>{{ occupationData.interCode }}</p>
            </div>
            <div class="occuption_img">
              <img v-if="occupationData.isChecked" :src="selectIconImga" alt="">
            </div>
          </li>
        </ul>
        <p class="openAll" @click="lookAll">查看全部职业</p>
      </div>
    </van-popup>
    <van-popup class="occupation_box" v-model="isShowAll" position="right" :overlay="true">
      <div class="occupation_style">
        <ul class="occupation_list">
          <li  v-for="(item, index) in alloccupation" :key="index" :class="item.classStyle">
            <p>{{ item.occupationName }}</p>
          </li>
        </ul>
        <ul class="occupation_ul" v-if="isBigClass">
          <li v-for="(occupationItem, index) in alloccupationData" :key="index" @click="bigClassFn(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationItem.bigClass }}</hgroup>
            </div>
            <!-- <div class="occuption_img">
              <img v-if="occupationData.isChecked" :src="selectIconImga" alt="">
            </div> -->
          </li>
        </ul>
        <ul class="occupation_ul" v-if="isCenterClass">
          <li v-for="(occupationItem, index) in centerClassName" :key="index" @click="centerClassFn(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationItem.centerClass }}</hgroup>
            </div>
            <!-- <div class="occuption_img">
              <img v-if="occupationData.isChecked" :src="selectIconImga" alt="">
            </div> -->
          </li>
        </ul>
        <ul class="occupation_ul" v-if="isMinClass">
          <li v-for="(occupationItem, index) in minClassName" :key="index" @click="minClassFn(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationItem.minClass }}</hgroup>
            </div>
            <div class="occuption_img">
              <img v-if="occupationItem.minClassChecked" :src="selectIconImga" alt="">
            </div>
          </li>
        </ul>
      </div>
    </van-popup>
    <alertWrong ref="alertFn"></alertWrong>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alertWrong from "../components/alertWrong.vue";
export default {
  data() {
    return {
      plicyName: "", //客户姓名
      plicyCardNm: "", //客户证件号码
      phoneNm: "", //手机号码
      zipData: "", //邮政编码
      EmailData: "", //电子邮箱
      vcCode: "", //验证码
      menorwomen: true, //男女选择
      sexMF: "M", //男是M 女是F
      phShwoDate: false, //时间日期插件
      phcurrentDate: new Date(), //时间插件
      phmaxDate: new Date(),
      phminDate: new Date(1900, 1, 1),
      ltShwoDate: false, //时间日期插件
      ltcurrentDate: new Date(), //时间插件
      ltmaxDate: new Date(2900, 1, 1),
      ltminDate: new Date(),
      phbirthdayData: "", //出生日期
      isIdentity: false, //是否显示身份证有效期限的选择
      identityTimeData: "请选择", //身份证有效期限默认值
      identityTime: [
        {
          name: "长期有效",
          callback: this.onClick
        },
        {
          name: "有效期至...",
          callback: this.clickHowLongTime
        }
      ],
      selectIconImga: require("../../static/img/checkedicon.png"), //绿色小对勾
      isShowOccupation: false, //是否显示职业弹出层
      occuptionName: "请选择", //职业默认选择
      inCommonUseOccupation: [
        //常用职业
        {
          internal: "内勤",
          interCode: "（一般-机关团体公司,010101）",
          isChecked: false
        },
        {
          internal: "外勤",
          interCode: "（一般-机关团体公司,010102）",
          isChecked: false
        },
        {
          internal: "教师",
          interCode: "（文教机关-教育机构,140101）",
          isChecked: false
        }
      ],
      isShowAll: false, //是否显示全部职业
      //全职业分类
      alloccupation: [
        {
          occupationName: "大类",
          classStyle: "checkedSelect"
        },
        {
          occupationName: "中类",
          classStyle: ""
        },
        {
          occupationName: "小类",
          classStyle: ""
        }
      ],
      isBigClass: true, //大类直接现象
      isCenterClass: false, //中类
      isMinClass: false, //小类
      bigMun: "", //大类下标
      centerMun: "", //中类下标
      centerClassName: "", //中类名称
      minClassName: "", //小类名称
      //大中小类
      alloccupationData: [
        {
          bigClass: "01一般",
          centerClassList: [
            {
              centerClass: "12旅游业",
              minClassList: [
                {
                  minClass: "123456一般内勤人员",
                  minClassChecked: false
                },
                {
                  minClass: "234567外务人员",
                  minClassChecked: false
                },
                {
                  minClass: "345678导游",
                  minClassChecked: false
                }
              ]
            }
          ]
        }
      ],
      nowAddress: false, //是否显示地区
      nowAddressData: "请选择", //是否显示地区
      //所在地区
      AddressDataListTwo: {
        province_list: {
          310000: "上海市",
          320000: "江苏省",
          350000: "福建省"
        },
        city_list: {
          310000: "市辖区、县",
          320500: "苏州市",
          350100: "福州市"
        },
        county_list: {
          320505: "虎丘区"
        }
      }
    };
  },
  components: { alertWrong },
  methods: {
    ...mapActions({
      sendTepy: "SENDTEPY", //答题提交答案页面
      policyholderFn: "POLICYHOLDER" //投保人信息录入提交
    }),
    //常用职业选择方法
    selectCommon(index) {
      for (let item of this.inCommonUseOccupation) {
        item.isChecked = false;
      }
      this.inCommonUseOccupation[index].isChecked = true;
      this.occuptionName = this.inCommonUseOccupation[index].internal;
      //清楚已经选择的全职业中的内容
      for (let itemOne of this.alloccupationData) {
        for (let itemTwo of itemOne.centerClassList) {
          for (let itemThree of itemTwo.minClassList) {
            itemThree.minClassChecked = false;
          }
        }
      }
      this.isShowOccupation = false;
    },
    //查看全部职业
    lookAll() {
      for (let item of this.inCommonUseOccupation) {
        item.isChecked = false;
      }
      this.isShowOccupation = false;
      this.isShowAll = true;
      this.isMinClass = false; //隐藏小类
      this.isBigClass = true; //显示大类
      //  清楚小类的下横线
      for (let item of this.alloccupation) {
        item.classStyle = "";
      }
      this.alloccupation[0].classStyle = "checkedSelect";
    },
    //点击大类的方法
    bigClassFn(mun) {
      this.bigMun = mun;
      //  清楚大类的下横线
      for (let item of this.alloccupation) {
        item.classStyle = "";
      }
      this.alloccupation[1].classStyle = "checkedSelect";
      this.isBigClass = false;
      this.isCenterClass = true;
      this.centerClassName = this.alloccupationData[mun].centerClassList;
    },
    //中类的方法「
    centerClassFn(muntwo) {
      this.centerMun = muntwo;
      //  清楚中类的下横线
      for (let item of this.alloccupation) {
        item.classStyle = "";
      }
      this.alloccupation[2].classStyle = "checkedSelect";
      this.isCenterClass = false;
      this.isMinClass = true;
      this.minClassName = this.alloccupationData[this.bigMun].centerClassList[
        muntwo
      ].minClassList;
    },
    //小类的方法
    minClassFn(munthree) {
      //每次点击小类，清除其他类
      for (let item of this.alloccupationData[this.bigMun].centerClassList[
        this.centerMun
      ].minClassList) {
        item.minClassChecked = false;
      }
      this.alloccupationData[this.bigMun].centerClassList[
        this.centerMun
      ].minClassList[munthree].minClassChecked = true; //勾选
      //给页面上面复制选择的职业
      this.occuptionName = this.alloccupationData[this.bigMun].centerClassList[
        this.centerMun
      ].minClassList[munthree].minClass;
      this.isShowAll = false; //全职业隐藏
    },
    //地址选择方法
    addressFn(item) {
      console.log(item);
      if (item[0].name == "选择省份") {
        return false;
      }
      if (item[1].name == "选择城市") {
        item[1].name = "";
      }
      if (item[2].name == "选择地区") {
        item[2].name = "";
      }
      this.nowAddressData =
        item[0].name + " " + item[1].name + " " + item[2].name;
      this.nowAddress = false;
    },
    //地址选择方法取消
    cancelAddress() {
      this.nowAddress = false;
    },
    //身份证有效期限的选择
    onClick(item) {
      this.identityTimeData = item.name;
      this.isIdentity = false;
    },
    clickHowLongTime() {
      this.isIdentity = false;
      this.ltShwoDate = true;
    },
    //时间插件确认按钮
    phdateFn(item) {
      this.phbirthdayData = item.toISOString().slice(0, 10);
      if (this.sexMF == "M") {
        if (
          new Date().getFullYear() - item.getFullYear() > 60 ||
          new Date().getFullYear() - item.getFullYear() < 16
        ) {
          this.$refs.alertFn.isworngFn("被保险人(男)年龄须为16周岁-60周岁");
          this.phbirthdayData = "";
          return false;
        }
      } else {
        if (
          new Date().getFullYear() - item.getFullYear() > 55 ||
          new Date().getFullYear() - item.getFullYear() < 16
        ) {
          this.$refs.alertFn.isworngFn("被保险人(女)年龄须为16周岁-55周岁");
          this.phbirthdayData = "";
          return false;
        }
      }

      // this.phbirthdayData = item.toISOString().slice(0, 10);
      this.phShwoDate = false;
    },
    //时间插件确认按钮身份证时间
    ltdateFn(item) {
      this.identityTimeData = item.toISOString().slice(0, 10);
      this.ltShwoDate = false;
    },
    //发送验证码
    sendtepyFn() {
      let openidList = JSON.parse(window.localStorage.getItem("openidList"));
      let tepagentB = JSON.stringify(openidList.openId);
      console.log(this.phoneNm);
      let sendTEPYzmData = new FormData();
      sendTEPYzmData.append("phoneNm", this.phoneNm);
      sendTEPYzmData.append("openId", tepagentB);
      this.sendTepy({
        sendTEPYzmData,
        successCallback: () => {},
        failCallback: () => {}
      });
    },
    nextpage() {
      let messageDataList = JSON.parse(
        window.localStorage.getItem("messageDataList")
      );
      let messageDataListB = JSON.stringify(messageDataList);
      // let tepagentB = JSON.stringify(openidList.openId);
      if (this.plicyName == "") {
        this.$refs.alertFn.isworngFn(" 用户名不能为空！");
        return false;
      }
      if (this.plicyCardNm == "") {
        this.$refs.alertFn.isworngFn(" 证件号码不能为空！");
        return false;
      }
      // if(!this.$toolsTwo.codeCrad(this.plicyCardNm)){
      //   this.$refs.alertFn.isworngFn(' 证件号码格式不对！')
      //   return false
      // }
      if (this.identityTimeData == "" || this.identityTimeData == "请选择") {
        this.$refs.alertFn.isworngFn(" 证件有效期不能为空！");
        return false;
      }
      if (this.phbirthdayData == "") {
        this.$refs.alertFn.isworngFn(" 出生日期不能为空！");
        return false;
      }
      if (this.occuptionName == "" || this.occuptionName == "请选择") {
        this.$refs.alertFn.isworngFn(" 职业不能为空！");
        return false;
      }
      console.log("--------消息通过--------");
      return false;
      let policyDataList = {
        realName: this.plicyName, //客户真实姓名
        certiCode: this.plicyCardNm, //证件号码
        certiType: "1", //证件类型身份证 传1
        birthday: this.phbirthdayData, //客户生日
        certiValidate: this.identityTimeData, //证件有效期
        gender: this.sexMF, //客户性别
        jobCode: this.jobCode, //职业代码
        livingAddress: this.nowAddressData, //住所地
        zip: this.zipData, // 邮政编码
        Email: this.EmailData, //电子邮箱
        phoneNm: this.phoneNm, //手机号码
        vcCode: this.vcCode, //验证码
        smsData: "1", //短信通知
        selfHelp: "1" //自主查询
      };
      let policyDataB = JSON.stringify(policyDataList);
      window.localStorage.setItem("policyDataList", policyDataB);
      console.log(policyDataB);
      let policyData = new FormData();
      policyData.append("policyData", policyDataB);
      policyData.append("messageData", messageDataListB);
      this.policyholderFn({
        policyData,
        successCallback: () => {
          this.$router.push({ path: "/beneficiarypag" });
        },
        failCallback: () => {}
      });
      // this.setTitle("页面标题");
      // this.$router.meta.title = '11111'
      // this.$router.push({ path: "/beneficiarypag" });
    },
    //单页面title修改方法
    setTitle(titleName) {
      document.title = titleName;
      var i = document.createElement("iframe");
      i.style.display = "none";
      i.onload = function() {
        setTimeout(function() {
          i.remove();
        }, 9);
      };
      document.body.appendChild(i);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
.box {
  background-color: rgb(231, 231, 245);
}
.tb_box {
  overflow: hidden;
  position: relative;
  .tb_box_title {
    color: #333333;
    background-color: #fafafa;
    height: 1.2rem;
    font-size: $fontsize;
    line-height: 1.2rem;
    text-align: center;
    margin-top: 0.24rem;
  }
  .tb_min_title {
    font-family: PingFangSC-Regular;
    font-size: 0.35rem;
    line-height: 0.58rem;
    color: #ff6333;
    text-align: center;
    background-color: rgba(255, 99, 51, 0.15);
  }
  .tb_box_content {
    background-color: #ffffff;
    .tb_box_li {
      height: $heightline;
      line-height: $heightline;
      font-size: $fontsize;
      color: $fontcolor;
      position: relative;
      padding-left: 15px;
      display: flex;
      justify-content: space-between;
      .tb_box_date {
        padding-right: 15px;
        line-height: $heightline;
        flex: 0.8;
        .ph_date {
          line-height: $heightline;
          height: $heightline;
          padding-right: 0.8rem;
          width: 100%;
          font-size: $fontsize;
          background: url(../../static/img/dateicon.svg) no-repeat right center;
        }
        p {
          text-align: right;
          padding-right: 0.3rem;
          box-sizing: border-box;
          height: 1.4rem;
        }
        .tb_box_select {
          line-height: $heightline;
          width: 100%;
          font-size: $fontsize;
          background-color: #fff;
          text-align: right;
          direction: rtl;
          padding-right: 20px;
        }
      }
      .tb_box_date_two {
        padding-right: 15px;
        line-height: $heightline;
        flex: 0.8;
        display: flex;
        justify-content: flex-end;
        input {
          line-height: $heightline;
          font-size: $fontsize;
          text-align: right;
          width: 100%;
        }
      }
      .ph_sex {
        display: flex;
        justify-content: flex-end;
        p {
          width: 1.6rem;
          border: 1px solid #dddddd;
          height: 0.8rem;
          text-align: center;
          padding: 0;
          line-height: 0.8rem;
          margin-top: 0.3rem;
          margin-left: 0.3rem;
          color: #999999;
          border-radius: 2px;
        }
        .sex_checked {
          background: rgba(2, 173, 77, 0.1);
          border: 1px solid rgba(2, 173, 77, 0.5);
          color: #02ad4d;
        }
      }
      textarea {
        outline: none;
        line-height: $heightline/2;
        font-size: $fontsize;
        width: 95%;
        border: none;
        outline: 0px;
        resize: none;
        padding: 5px;
      }
      //验证码样式
      .yz_code {
        display: flex;
        div {
          flex: 1;
          input {
            width: 100%;
            text-align: right;
            padding: 0 5px;
            box-sizing: border-box;
          }
        }
        p {
          flex: 1;
          text-align: center;
          border-left: 1px solid #dddddd;
          color: #02ad4d;
        }
      }
    }
    .hasline:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #dddddd;
      color: #dddddd;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
      z-index: 2;
    }
    .three:after {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      right: 15px;
      margin-top: -4px;
    }
  }
}
.tb_tk {
  padding: 15px 0 15px 15px;
  display: flex;
  .tb_checked {
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    img {
      width: 100%;
    }
  }
  .tb_tk_content {
    padding-left: 5px;
    color: #333333;
    a {
      color: #02ad4d;
    }
  }
}
.tb_button {
  margin-top: 0.24rem;
}
//职业弹出层样式
.occupation_box {
  width: 90%;
  height: 100%;
}
.occupation_style {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .occupation_ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      line-height: 0.7rem;
      .occuption_content {
        display: flex;
        hgroup {
          font-size: 0.4rem;
          color: #333333;
        }
        p {
          font-size: 0.37rem;
          color: rgb(145, 145, 145);
        }
      }
      .occuption_img {
        width: 0.35rem;
        img {
          width: 100%;
        }
      }
    }
  }
  .openAll {
    font-size: 0.4rem;
    color: #02ad4d;
    text-align: center;
    margin-top: 1.5rem;
  }
  //所有职业样式
  .occupation_list {
    display: flex;
    height: 1.32rem;
    color: #333333;
    font-size: 0.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    li {
      flex: 1;
      height: 1.32rem;
      padding: 10px 0;
      box-sizing: border-box;
      p {
        text-align: center;

        line-height: 0.8rem;
        border-right: 1px solid #ddd;
        box-sizing: border-box;
      }
    }
    li:last-child p {
      border-right: none;
    }
    li.checkedSelect {
      color: #02ad4d;
      border-bottom: 5px solid #02ad4d;
    }
  }
}
</style>



