<template>
  <div class="box">
    <div class="tb_box">
      <p class="tb_box_title" style="margin-top:0;">投保人(即被保险人)基本信息</p>
      <ul class="tb_box_content">
        <li class="tb_box_li hasline">
          <p>姓名</p>
          <div class="tb_box_date_two">
            <input type="text" maxlength="10" v-model="plicyName" placeholder="请输入" v-focus="true" >
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件类型</p>
          <div class="tb_box_date">
              <p style="color: #333;padding:0;">身份证</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件号码</p>
          <div class="tb_box_date_two">
            <input v-model="plicyCardNm" @change="birthdayContent" maxlength="30" type="text" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件有效期</p>
          <div class="tb_box_date three" @click="isIdentity=!isIdentity">
              <p :class="identityTimeData=='请选择'?'color-cacaca':''">{{ identityTimeData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生日期</p>
          <div class="tb_box_date">
            <!-- <input type="date"> -->
            <p class="ph_date">{{ phbirthdayData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>性别</p>
          <div class="tb_box_date ph_sex">
            <p :class="adsexMFOne">男</p>
            <p :class="adsexMFTwo">女</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>职业</p>
          <div class="tb_box_date three" @click="isShowOccupation=!isShowOccupation">
            <p :class="occuptionName=='请选择'?'color-cacaca':''">{{ occuptionName }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>所在地区</p>
          <div class="tb_box_date three">
            <p @click="nowAddress=!nowAddress" :class="nowAddressData=='请选择'?'color-cacaca':''">{{ nowAddressData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
            <textarea  maxlength="30" name="" v-model="addressData" placeholder="请填写详细地址，不少于5个字" id="" cols="30" rows="10"></textarea>
          <!-- <p>交费金额</p>
          <div class="tb_box_date_two">
            <input type="text" placeholder="请输入">&nbsp;&nbsp;元
          </div> -->
        </li>
        <li class="tb_box_li hasline">
          <p>邮政编码</p>
          <div class="tb_box_date_two">
            <input v-model="zipData" type="text" maxlength="10" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>电子邮箱</p>
          <div class="tb_box_date_two">
            <input v-model="EmailData" maxlength="30" type="text" placeholder="用于接收电子保单等后续服务">
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
            <input v-model="phoneNm" maxlength="50" type="text" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>验证码</p>
          <div class="yz_code">
            <div>
              <input type="number" v-model="vcCode" placeholder="请输入" oninput="if(value.length>6)value=value.slice(0,6)" >
            </div>
            <button :disabled="isSendBtn" @click="sendtepyFn" >{{ sendData }}</button>
          </div>
        </li>
      </ul>
      <p class="tb_box_title">服务方式</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <p>续期缴费成功通知方式</p>
          <div class="tb_box_date">
            <p style="color: #333;padding:0;">短信</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>各类通知书查询方式</p>
          <div class="tb_box_date">
              <p style="color: #333;padding:0;">自助查询</p>
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
          <li  v-for="(item, index) in alloccupation" :key="index" :class="item.classStyle" @click="selectJob(index)">
            <p>{{ item.occupationName }}</p>
          </li>
        </ul>
        <ul class="occupation_ul occupation_ul_two" v-if="isBigClass">
          <li v-for="(occupationItem, index) in alloccupationData" :key="index" @click="bigClassFn(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationItem.job_name }}</hgroup>
            </div>
            <!-- <div class="occuption_img">
              <img v-if="occupationData.isChecked" :src="selectIconImga" alt="">
            </div> -->
          </li>
        </ul>
        <ul class="occupation_ul occupation_ul_two" v-if="isCenterClass">
          <li v-for="(occupationItem, index) in centerClassName" :key="index" @click="centerClassFn(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationItem.job_name }}</hgroup>
            </div>
            <!-- <div class="occuption_img">
              <img v-if="occupationData.isChecked" :src="selectIconImga" alt="">
            </div> -->
          </li>
        </ul>
        <ul class="occupation_ul occupation_ul_two" v-if="isMinClass">
          <li v-for="(occupationItem, index) in minClassName" :key="index" @click="minClassFn(index)">
            <div class="occuption_content">
              <hgroup>{{ occupationItem.job_name }}</hgroup>
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
import { Toast } from "vant";
export default {
  data() {
    return {
      sendData: "发送验证码", //发送验证码
      isSendBtn: false,
      addressData: "", //详细地址
      plicyName: "", //客户姓名
      plicyCardNm: "", //客户证件号码
      phoneNm: "", //手机号码
      zipData: "", //邮政编码
      EmailData: "", //电子邮箱
      vcCode: "", //验证码
      vcCodeNow: "",
      menorwomen: true, //男女选择
      sexMF: "M", //男是M 女是F
      adsexMFOne: "", //性别
      adsexMFTwo: "", //性别
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
          interCode: "（一般-机关团体公司）",
          interCodeTwo: "010101",
          isChecked: false
        },
        {
          internal: "外勤",
          interCode: "（一般-机关团体公司）",
          interCodeTwo: "010102",
          isChecked: false
        },
        {
          internal: "教师",
          interCode: "（文教机关-教育机构）",
          interCodeTwo: "140101",
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
      taxPlaceCode: "",
      provinceName: "",
      provinceCode: "",
      cityName: "",
      cityCode: "",
      districtName: "",
      districtCode: "",
      //所在地区
      AddressDataListTwo: {
        province_list: {
          310000: "上海市",
          320000: "江苏省",
          350000: "福建省"
        },
        city_list: {
          310100: "市辖区、县",
          320500: "苏州市",
          350100: "福州市",
          350200: "厦门市",
          350300: "莆田市",
          350400: "三明市",
          350500: "泉州市",
          350600: "漳州市",
          350700: "南平市",
          350800: "龙岩市",
          350900: "宁德市"
        },
        county_list: {
          320599: "苏州工业园区"
        }
      }
    };
  },
  components: { alertWrong },
  mounted() {
    this.saveContent();
  },
  methods: {
    ...mapActions({
      sendTepy: "SENDTEPY", //答题提交答案页面
      policyholderFn: "POLICYHOLDER", //投保人信息录入提交
      getJobCode: "GETJOBCODE" //投保人信息录入提交
    }),
    adsexMFN(num) {
      if (num == "1") {
        this.adsexMF = "M";
        this.adsexMFOne = "sex_checked";
        this.adsexMFTwo = "";
      } else if (num == "2") {
        this.adsexMF = "F";
        this.adsexMFOne = "";
        this.adsexMFTwo = "sex_checked";
      }
      console.log(this.adsexMF);
    },
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
      this.jobCode = this.inCommonUseOccupation[index].interCodeTwo;
      this.isShowOccupation = false;
    },
    //自动填写生日
    birthdayContent() {
      this.phbirthdayData =
        this.plicyCardNm.slice(6, 10) +
        "-" +
        this.plicyCardNm.slice(10, 12) +
        "-" +
        this.plicyCardNm.slice(12, 14);
        console.log(this.plicyCardNm.slice(16, 17)%2)
        if(this.plicyCardNm.slice(16, 17)%2 == '0'){
          this.adsexMFN(2)
        }else{
          this.adsexMFN(1)
        }
        
    },
    //查看全部职业
    lookAll() {
      for (let item of this.inCommonUseOccupation) {
        item.isChecked = false;
      }
      this.isShowOccupation = false;
      this.isShowAll = true;
      this.isMinClass = false; //隐藏小类
      this.isCenterClass = false; //隐藏中类
      this.isBigClass = true; //显示大类
      //  清楚小类的下横线
      for (let item of this.alloccupation) {
        item.classStyle = "";
      }
      this.alloccupation[0].classStyle = "checkedSelect";
      let jobCodeData = new FormData();
      jobCodeData.append("level", "1");
      jobCodeData.append("jobName", "");
      this.getJobCode({
        jobCodeData,
        successCallback: result => {
          this.alloccupationData = result;
          // this.$router.push({ path: "/buypage" })
        },
        failCallback: () => {}
      });
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
      let jobCodeData = new FormData();
      jobCodeData.append("level", "2");
      jobCodeData.append("jobName", this.alloccupationData[mun].job_name);
      this.getJobCode({
        jobCodeData,
        successCallback: result => {
          this.centerClassName = result;
        },
        failCallback: () => {}
      });
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
      let jobCodeData = new FormData();
      jobCodeData.append("level", "3");
      jobCodeData.append("jobName", this.centerClassName[muntwo].job_name);
      this.getJobCode({
        jobCodeData,
        successCallback: result => {
          this.minClassName = result;
        },
        failCallback: () => {}
      });
    },
    //小类的方法
    minClassFn(munthree) {
      //每次点击小类，清除其他类
      for (let item of this.minClassName) {
        item.minClassChecked = false;
      }
      this.minClassName[munthree].minClassChecked = true; //勾选
      //给页面上面复制选择的职业
      this.occuptionName = this.minClassName[munthree].job_name;
      this.jobCode = this.minClassName[munthree].job_code;
      this.isShowAll = false; //全职业隐藏
    },
    //职业大类中类小类切换
    selectJob(index) {
      console.log(index);

      if (index == "1") {
        if (this.centerClassName == "") {
          return false;
        }
        for (let item of this.alloccupation) {
          item.classStyle = "";
        }
        this.isBigClass = false;
        this.isCenterClass = true;
        this.isMinClass = false; //隐藏小类
        this.alloccupation[1].classStyle = "checkedSelect";
      }
      if (index == "0") {
        // if (this.minClassName == "") {
        //   return false;
        // }
        for (let item of this.alloccupation) {
          item.classStyle = "";
        }
        this.isMinClass = false; //隐藏小类
        this.isCenterClass = false; //隐藏中类
        this.isBigClass = true; //显示大类
        this.alloccupation[0].classStyle = "checkedSelect";
      }
      if (index == "2") {
        if (this.minClassName == "") {
          return false;
        }
        for (let item of this.alloccupation) {
          item.classStyle = "";
        }
        this.isMinClass = true; //隐藏小类
        this.isCenterClass = false; //隐藏中类
        this.isBigClass = false; //显示大类
        this.alloccupation[2].classStyle = "checkedSelect";
      }
    },
    //地址选择方法
    addressFn(item) {
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
      this.taxPlaceCode =
        item[0].code + "," + item[1].code + "," + item[2].code;
      this.provinceName = item[0].name;
      this.provinceCode = item[0].code;
      this.cityName = item[1].name;
      this.cityCode = item[1].code;
      this.districtName = item[2].name;
      this.districtCode = item[2].code;
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
      let month = item.getMonth() - 0 + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let today = item.getDate();
      if (today < 10) {
        today = "0" + today;
      }
      this.phbirthdayData = item.getFullYear() + "-" + month + "-" + today;
      // if (this.sexMF == "M") {
      //   if (
      //     new Date().getFullYear() - item.getFullYear() > 60 ||
      //     new Date().getFullYear() - item.getFullYear() < 16
      //   ) {
      //     this.$refs.alertFn.isworngFn("被保险人(男)年龄须为16周岁-60周岁");
      //     this.phbirthdayData = "";
      //     return false;
      //   }
      // } else {
      //   if (
      //     new Date().getFullYear() - item.getFullYear() > 55 ||
      //     new Date().getFullYear() - item.getFullYear() < 16
      //   ) {
      //     this.$refs.alertFn.isworngFn("被保险人(女)年龄须为16周岁-55周岁");
      //     this.phbirthdayData = "";
      //     return false;
      //   }
      // }
      this.phShwoDate = false;
    },
    //时间插件确认按钮身份证时间
    ltdateFn(item) {
      let month = item.getMonth() - 0 + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let today = item.getDate();
      if (today < 10) {
        today = "0" + today;
      }
      this.identityTimeData = item.getFullYear() + "-" + month + "-" + today;
      this.ltShwoDate = false;
    },
    miuFnOne(miu) {
      let miuFn = setTimeout(() => {
        miu--;
        this.sendData = "消息发送中(" + miu + ")";
        if (miu == 1) {
          return false;
        }
        this.miuFnOne(miu);
      }, 1000);
    },
    //发送验证码
    sendtepyFn() {
      let openidList = JSON.parse(window.localStorage.getItem("openidList"));
      let tepagentB = JSON.stringify(openidList.openId);
      if (this.phoneNm == "") {
        this.$refs.alertFn.isworngFn(" 手机号码不能为空！");
        return false;
      }
      if (!this.$toolsTwo.phoneFn(this.phoneNm)) {
        this.$refs.alertFn.isworngFn(" 手机号码格式不对！");
        return false;
      }
      this.isSendBtn = true;
      this.miuFnOne(60);

      setTimeout(() => {
        this.sendData = "重新发送";
        this.isSendBtn = false;
      }, 60000);
      let sendTEPYzmData = new FormData();
      sendTEPYzmData.append("phoneNm", this.phoneNm);
      sendTEPYzmData.append("openId", tepagentB);
      this.sendTepy({
        sendTEPYzmData,
        successCallback: result => {
          this.vcCodeNow = result;
          this.vcCode = result;
        },
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
      if (!this.$toolsTwo.codeCrad(this.plicyCardNm)) {
        this.$refs.alertFn.isworngFn(" 证件号码格式不对！");
        return false;
      }
      if (this.identityTimeData == "" || this.identityTimeData == "请选择") {
        this.$refs.alertFn.isworngFn(" 证件有效期不能为空！");
        return false;
      }
      if (this.phbirthdayData == "") {
        this.$refs.alertFn.isworngFn(" 出生日期不能为空！");
        return false;
      }
      if (this.adsexMF == "") {
        this.$refs.alertFn.isworngFn(" 请选择性别！");
        return false;
      }
      if (this.occuptionName == "" || this.occuptionName == "请选择") {
        this.$refs.alertFn.isworngFn(" 职业不能为空！");
        return false;
      }
      if (this.nowAddressData == "" || this.nowAddressData == "请选择") {
        this.$refs.alertFn.isworngFn(" 所在地区不能为空！");
        return false;
      }
      if (this.addressData == "" || this.addressData == "请选择") {
        this.$refs.alertFn.isworngFn(" 所在输入地区不能为空！");
        return false;
      }
      if (this.addressData.length < 5) {
        this.$refs.alertFn.isworngFn(" 所在地区输入不能少于5个字！");
        return false;
      }
      if (this.zipData == "") {
        this.$refs.alertFn.isworngFn(" 邮政编码不能为空！");
        return false;
      }
      if (!this.$toolsTwo.zipFn(this.zipData)) {
        this.$refs.alertFn.isworngFn(" 邮政编码格式不对！");
        return false;
      }
      if (this.EmailData == "") {
        this.$refs.alertFn.isworngFn(" 邮箱不能为空！");
        return false;
      }
      if (!this.$toolsTwo.emailFn(this.EmailData)) {
        this.$refs.alertFn.isworngFn(" 邮箱格式不对！");
        return false;
      }
      if (this.phoneNm == "") {
        this.$refs.alertFn.isworngFn(" 手机号码不能为空！");
        return false;
      }
      if (this.vcCode == "") {
        this.$refs.alertFn.isworngFn(" 验证码填不能为空！");
        return false;
      }
      // if (this.vcCode != this.vcCodeNow) {
      //   this.$refs.alertFn.isworngFn(" 验证码填写错误！");
      //   return false;
      // }
      console.log("--------消息通过--------");
      const toast1 = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 0
      });
      let timeData = "";
      if (this.identityTimeData == "长期有效") {
        timeData = "9999-09-09";
      } else {
        timeData = this.identityTimeData;
      }
      console.log(timeData);

      let policyDataList = {
        realName: this.plicyName, //客户真实姓名
        certiCode: this.plicyCardNm, //证件号码
        certiType: "1", //证件类型身份证 传1
        birthday: this.phbirthdayData, //客户生日
        certiValidate: timeData, //证件有效期
        gender: this.adsexMF, //客户性别
        jobCode: this.jobCode, //职业代码
        jobName: this.occuptionName, //职业代码
        livingAddress: this.nowAddressData, //住所地
        taxPlaceCode: this.taxPlaceCode, //纳税地代码
        addressData: this.addressData, //详细地址
        zip: this.zipData, // 邮政编码
        Email: this.EmailData, //电子邮箱
        phoneNm: this.phoneNm, //手机号码
        vcCode: this.vcCode, //验证码
        smsData: "3", //短信通知
        selfHelp: "1", //自主查询
        provinceName: this.provinceName,
        provinceCode: this.provinceCode,
        cityName: this.cityName,
        cityCode: this.cityCode,
        districtName: this.districtName,
        districtCode: this.districtCode
      };
      let policyDataB = JSON.stringify(policyDataList);
      window.localStorage.setItem("policyDataList", policyDataB);
      console.log(policyDataB);
      // return false;
      let policyData = new FormData();
      policyData.append("policyData", policyDataB);
      policyData.append("messageData", messageDataListB);
      this.policyholderFn({
        policyData,
        successCallback: () => {
          toast1.clear();
          this.$router.push({ path: "/beneficiarypag" });
        },
        failCallback: result => {
          toast1.clear();
          this.$refs.alertFn.isworngFn(result);
        }
      });
      // this.setTitle("页面标题");
      // this.$router.meta.title = '11111'
      // this.$router.push({ path: "/beneficiarypag" });
    },
    //保存页面数据
    saveContent() {
      let policyDataList = JSON.parse(
        window.localStorage.getItem("policyDataList")
      );
      if (policyDataList != "" && policyDataList != null) {
        console.log(policyDataList);
        this.plicyName = policyDataList.realName;
        this.plicyCardNm = policyDataList.certiCode;
        // certiType: "1", //证件类型身份证 传1
        this.phbirthdayData = policyDataList.birthday;
        if (policyDataList.certiValidate == "9999-09-09") {
          this.identityTimeData = "长期有效";
        } else {
          this.identityTimeData = policyDataList.certiValidate;
        }
        this.adsexMF = policyDataList.gender;
        if (policyDataList.gender == "M") {
          this.adsexMFOne = "sex_checked";
          this.adsexMFTwo = "";
        } else {
          this.adsexMFOne = "";
          this.adsexMFTwo = "sex_checked";
        }
        this.jobCode = policyDataList.jobCode;
        this.occuptionName = policyDataList.jobName;
        this.nowAddressData = policyDataList.livingAddress;
        this.taxPlaceCode = policyDataList.taxPlaceCode;
        this.addressData = policyDataList.addressData;
        this.zipData = policyDataList.zip;
        this.EmailData = policyDataList.Email;
        this.phoneNm = policyDataList.phoneNm;
        // this.jobCom = policyDataList.jobCom ;
        // vcCode: this.vcCode, //验证码
        // smsData: "3", //短信通知
        // selfHelp: "1", //自主查询
        this.provinceName = policyDataList.provinceName;
        this.provinceCode = policyDataList.provinceCode;
        this.cityName = policyDataList.cityName;
        this.cityCode = policyDataList.cityCode;
        this.districtName = policyDataList.districtName;
        this.districtCode = policyDataList.districtCode;
      }
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
        // flex: 0.8;
        .ph_date {
          line-height: $heightline;
          height: $heightline;
          padding-right: 0.8rem;
          width: 100%;
          font-size: $fontsize;
          background: url(../../static/img/dateicon.svg) no-repeat right center;
          min-width: 6rem;
        }
        p {
          text-align: right;
          padding-right: 0.3rem;
          box-sizing: border-box;
          height: 1.4rem;
          overflow-x: auto;
          width: 100%;
          white-space: nowrap;
          max-width: 6.5rem;
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
        button {
          flex: 0.8;
          text-align: right !important;
          padding-right: 15px;
          box-sizing: border-box;
          text-align: center;
          border-left: 1px solid #dddddd;
          color: #02ad4d;
          background-color: transparent;
          width: 3rem;
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
  .occupation_ul_two {
    height: 90%;
    overflow: auto;
  }
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



