<template>
  <div class="box">
    <div class="tb_box">
      <p class="tb_box_title">投保信息</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <p>投保人出生日期</p>
          <div class="tb_box_date">
            <p class="tb_date_content" @click="showDate=!showDate">{{ birthdayData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>交费年期</p>
          <div class="tb_box_date">
            <p>交至国家规定退休年龄</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>交费方式</p>
          <div class="tb_box_date three">
            <p @click="isWay = !isWay" class="tb_box_date three">{{ wayData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>交费金额</p>
          <div class="tb_box_date_two">
            <input v-model="numbermony" type="number" @change="numAFn" placeholder="请输入">&nbsp;&nbsp;元
          </div>
        </li>
      </ul>
      <p class="tb_box_title">保费分配</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <div class="tb_premium_left">
            <div class="tb_premium_icon">
              <div><img :src="selectIconImgb" alt="" srcset=""></div>
            </div>
            <p class="tb_premium_a">税延养老A款</p>
            <p class="tb_premium_num"><input type="number" disabled v-model="numA" placeholder="0" name="" id=""> 元</p>
          </div>
          <div class="tb_premium_right">
            <p><input type="number" v-model="numAPer" oninput="if(value.length>2)value=value.slice(0,2)" @change="numAFn" placeholder="0" name="" id=""> %</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <div class="tb_premium_left">
            <div class="tb_premium_icon">
              <div><img :src="selectIconImgb" alt="" srcset=""></div>
            </div>
            <p class="tb_premium_a">税延养老B款</p>
            <p class="tb_premium_num"><input type="number" disabled v-model="numB" placeholder="0" name="" id=""> 元</p>
          </div>
          <div class="tb_premium_right">
            <p><input type="number" v-model="numBPer" oninput="if(value.length>2)value=value.slice(0,2)" @change="numAFn" placeholder="0" name="" id=""> %</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <div class="tb_premium_left">
            <div class="tb_premium_icon" @click="isSelectFn">
              <div><img v-if="isSelect" :src="selectIconImga" alt="" srcset=""></div>
            </div>
            <p class="tb_premium_a">税延养老C款</p>
            <p class="tb_premium_num"><input type="number" disabled v-model="numC" placeholder="0" name="" id=""> 元</p>
          </div>
          <div class="tb_premium_right">
            <p><input type="number" :disabled="!isSelect" oninput="if(value.length>2)value=value.slice(0,2)" @change="numAFn" placeholder="0" v-model="numCPer" name="" id=""> %</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>C款投资时间</p>
          <div class="tb_box_date three" style="flex:0.9">
            <p @click="isInvestTime = !isInvestTime" style="padding-right:15px;">{{ investTimeDa }}</p>
          </div>
        </li>
      </ul>
      <p class="tb_box_title">个税信息</p>
      <p class="tb_min_title">个税信息请咨询所在单位人力资源部</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <p>单位名称</p>
          <div class="tb_box_date">
            <p>太平人寿保险有限公司</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>{{ taxName }}</p>
          <div class="tb_box_date three">
            <p class="tb_box_code" @click="iscredit=!iscredit">{{ taxNumberTwo }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>个税征收方式</p>
          <div class="tb_box_date three">
            <div class="tb_box_date three">
              <p @click="isShowTax = !isShowTax" class="">{{ taxStyle }}</p>
            </div>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>纳税地</p>
          <div class="tb_box_date three" @click="isAddress = !isAddress">
            <p class="tb_box_date">{{ AddressData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>纳税分局名称</p>
          <div class="tb_box_date">
            <p class="tb_sw_name"><input type="text" v-model="taxBureauName" placeholder="请输入"></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="tb_tk">
      <div class="tb_checked" @click="isAlreadyFn">
        <img v-if="isAlready" :src="selectIconImga" alt="">
      </div>
      <p class="tb_tk_content">
        <span>我已阅读<a>《投保须知》</a>、<a>《保险条款》</a></span>
      </p>
    </div>
    <div class="tb_button">
      <button @click="recordFn">查看购买记录</button>
      <button @click="nextpage">下一步</button>
    </div>
    <!-- 带取消的弹出层月交年交 -->
    <van-actionsheet v-model="isWay" :actions="actions" cancel-text="取消" />
    <!-- C款投资时间 -->
    <van-actionsheet v-model="isInvestTime" :actions="investTimeData" cancel-text="取消" />
    <!-- 个税征收方式 -->
    <van-actionsheet v-model="isShowTax" :actions="taxData" cancel-text="取消" />
    <!-- 时间日期弹出框 -->
    <van-actionsheet v-model="showDate">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="dateFn"
      @cancel="showDate = false"
    />
    </van-actionsheet>
    <!-- 纳税地弹框 -->
    <van-actionsheet v-model="isAddress">
      <div class="onlyAdress">目前仅支持以下地区投保此产品</div>
    <van-area 
    :area-list="AddressDataList"
    :visible-item-count="3"
    @confirm="addressFn"
    @cancel="cancelAddress"
     />
    </van-actionsheet>
    <!-- 信用代码弹框 -->
    <van-dialog
      v-model="iscredit"
      @confirm="suerFn"
    >
      <div class="code_style">
        <hgroup class="code_title">请输入</hgroup>
        <div class="code_radio" :class="checkedSe=='1'?'code_checked':''" @click="selectCode(1)">
          <div>
            <img v-if="checkedSe=='1'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>统一社会信用代码</p>
        </div>
        <p>或</p>
        <div class="code_radio" :class="checkedSe=='2'?'code_checked':''" @click="selectCode(2)">
          <div>
            <img v-if="checkedSe=='2'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>税务登记号</p>
        </div>
        <div class="code_input">
          <input maxlength="20" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  v-model="taxNumber" type="text" placeholder="请输入统一社会信用代码">
        </div>
      </div>
    </van-dialog>
    <!-- 是否进入问答页面 -->
    <van-dialog
      v-model="isEnterQuestion"
      show-cancel-button
      @confirm="questionFn(1)"
      @cancel="questionFn(2)"
      title="风险提示"
      confirm-button-text="继续"
    >
    <div class="tips_enter">
      <p>您选择购买税延养老C款产品，可能获得比较高的投资收益，但也存在比较大的投资风险。</p>
      <p>您需要完成一份<i>风险评估问卷</i>。请您根据自身的风险承受能力，审慎作出投资决定。</p>
    </div>
    </van-dialog>
    <!-- 报错弹出层 -->
    <van-popup v-model="isShowWrong" position="top" :overlay="false">
      <div class="alerWrongStyle">
        {{ wrongData }}
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isShowWrong: false, //报错弹出层
      wrongData: "", //报错内容
      organCode1: "", //税务登记号
      organCode4: "", //社会信用代码
      taxPayerType: "", //个税征收方式代码
      taxPlaceCode: "", //纳税地代码
      taxBureauName: "", //纳税分局名称
      isEnterQuestion: false, //是否进入问答页面
      selectIconImga: require("../../static/img/checkedicon.png"), //绿色小对勾
      selectIconImgb: require("../../static/img/unclickicon.png"), //灰色小对勾
      isAlready: false, //是否已经阅读
      AddressData: "请选择", //纳税地
      isAddress: false, //纳税地方式
      iscredit: false, //信用代码是否显示
      isShowTax: false, //是否显示个税方式
      taxStyle: "代扣代缴", //个税方式默认
      checkedSe: 1, // 信用代码或税务登记
      taxNumber: "", //税务登记号码
      taxName: "统一社会信用代码", //信用号码或税务号码
      taxNumberTwo: "请输入",
      isWay: false, //月交年交
      isWayCode: "4", //
      showDate: false, //时间插件是否展示
      currentDate: new Date(), //时间插件
      maxDate: new Date(),
      minDate: new Date(1900, 1, 1),
      birthdayData: "", //出生日期
      wayData: "月交", //交费方式
      numbermony: "", //交费金额
      numA: "", //税延A款
      numAPer: "", //税延A款百分比
      numB: "", //税延B款
      numBPer: "", //税延B款百分比
      numC: "", //税延C款
      numCPer: "", //税延C款百分比
      isSelectClickFn: true,
      actions: [
        {
          name: "月交",
          callback: this.onClick,
          value: "4"
        },
        {
          name: "年交",
          callback: this.onClick,
          value: "2"
        }
      ],
      taxData: [
        {
          name: "代扣代缴",
          value: "1",
          callback: this.taxClick
        },
        {
          name: "自行申报",
          value: "2",
          callback: this.taxClick
        }
      ],
      //是否选择c款
      isSelect: true,
      //投资时间的两种方式
      isInvestTime: false, //投资时间选择
      investTimeDa: "承保日后的下一个交易日",
      investTimeData: [
        {
          name: "承保日后的下一个交易日",
          callback: this.investTimeFn
        },
        {
          name: "犹豫期结束后的下一个交易日",
          callback: this.investTimeFn
        }
      ],
      //地址选择310000-上海市、320000-江苏省、350000-福建省。
      // 省级下拉框选择“上海市”时，市级下拉框只能选：310000-市辖区、县。
      // 级下拉框选择“江苏省”时，市级下拉框只能选：320500-苏州市,
      // 且新增区级下拉框只能选：320505-虎丘区。省级下拉框选择“福建省”时，
      // 市级下拉框只能选：350100-福州市。
      AddressDataList: {
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
  mounted() {
    this.goHome();
  },
  methods: {
    ...mapActions({
      homeDataFn: "HOMEDATA",
      checkptFn: "CHECKPT" //投保信息录入接口方法
    }),
    goHome() {
      this.homeDataFn({
        successCallback: () => {},
        failCallback: () => {}
      });
    },
    // 统一社会信用代码函数
    suerFn() {
      console.log(this.taxNumber);
      // if (this.taxNumber == "") {
      //   this.taxNumber = "请输入";
      // }
      this.taxNumberTwo = this.taxNumber;
      if (this.taxName == "统一社会信用代码") {
        this.organCode4 = this.taxNumber;
        this.organCode1 = "";
      } else {
        this.organCode1 = this.taxNumber;
        this.organCode4 = "";
      }
      if (this.taxNumberTwo == "" || this.taxNumberTwo == "请输入") {
        this.isworngFn("请输入社会信用代码或税务登记号");
        this.iscredit = true;
        return false;
      }
      if(this.taxNumberTwo.length < 15 || this.taxNumberTwo.length > 20){
        this.isworngFn("输入社会信用代码或税务登记号的格式不正确");
        this.iscredit = true;
        return false;
      }
      // this.iscredit = true;
    },
    selectCode(key) {
      this.checkedSe = key;
      if (key == "1") {
        this.taxName = "统一社会信用代码";
      } else {
        this.taxName = "税务登记号";
      }
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
      this.AddressData = item[0].name + " " + item[1].name + " " + item[2].name;
      this.taxPlaceCode =
        item[0].code + " " + item[1].code + " " + item[2].code;
      this.isAddress = false;
    },
    //地址选择方法取消
    cancelAddress() {
      this.isAddress = false;
    },
    //是否已经阅读
    isAlreadyFn() {
      this.isAlready = !this.isAlready;
    },
    //月交年交方法
    onClick(item) {
      this.wayData = item.name;
      this.isWay = false;
      //4-月交和2-年交
      this.isWayCode = item.value;
      console.log(item.value);
    },
    //交费方式
    taxClick(item) {
      this.taxStyle = item.name;
      console.log(item);
      this.taxPayerType = item.value;
      this.isShowTax = false;
    },
    //投资时间的选择
    investTimeFn(item) {
      this.investTimeDa = item.name;
      this.isInvestTime = false;
    },
    //时间插件确认按钮
    dateFn(item) {
      console.log(new Date().getFullYear() - item.getFullYear());
      this.birthdayData = item.toISOString().slice(0, 10);
      if (
        new Date().getFullYear() - item.getFullYear() > 60 ||
        new Date().getFullYear() - item.getFullYear() < 16
      ) {
        this.isworngFn("被保险人年龄须为16周岁-60周岁");
        this.birthdayData = "";
        return false;
      }
      this.showDate = false;
      if (new Date().getFullYear() - item.getFullYear() > 55) {
        this.isSelect = false;
        this.isSelectClickFn = false;
      } else {
        this.isSelect = true;
        this.isSelectClickFn = true;
      }
    },
    //
    isSelectFn() {
      if (this.isSelectClickFn) {
        this.isSelect = !this.isSelect;
      }
      this.numC = "";
      this.numCPer = "";
    },
    //产品计算
    numAFn() {
      console.log(this.numAPer);
      this.numA = this.numAPer * this.numbermony / 100;
      this.numB = this.numBPer * this.numbermony / 100;
      this.numC = this.numCPer * this.numbermony / 100;
    },
    //时间插件取消按钮
    cancelFn() {
      this.showDate = false;
    },
    //是否进入问答页面
    questionFn(e) {
      if (e == 1) {
        this.$router.push({ path: "/assesspage" });
      } else {
        this.isEnterQuestion = false;
      }
    },
    nextpage() {
      //检查是否输入了出生日期
      if (this.birthdayData == "") {
        this.isworngFn("请输入出生日期");
        return false;
      }
      if (this.isWayCode == "4") {
        if (this.numbermony > 1000) {
          this.isworngFn(
            "三款税延险年交总保费不超过12000元；月交总保费不超过1000元。"
          );
          return false;
        }
      } else if (this.isWayCode == "2") {
        if (this.numbermony > 12000) {
          this.isworngFn(
            "三款税延险年交总保费不超过12000元；月交总保费不超过1000元。"
          );
          return false;
        }
      }
      //判断输入的金额必须未整数
      if (!this.isInteger(this.numbermony)) {
        this.isworngFn("三款税延险总保费100元起售，以100元为单位递增。");
        return false;
      }
      if (!this.isIntegerTwo(this.numA)) {
        this.isworngFn("请输入税延养老A款金额且必须为正整数");
        return false;
      }
      if (!this.isIntegerTwo(this.numB)) {
        this.isworngFn("请输入税延养老B款金额且必须为正整数");
        return false;
      }
      if (this.isSelect) {
        if (!this.isIntegerTwo(this.numC)) {
          this.isworngFn("请输入税延养老C款金额且必须为正整数");
          return false;
        }
      }
      //判断输入金额必须为总数
      // console.log(eval(this.numA) + eval(this.numB) + eval(this.numC))
      if (this.isSelect) {
        if (this.numCPer >= 50) {
          this.isworngFn("请确认C账户的分配比例不大于50%！");
          return false;
        }
        if (
          100 !=
          eval(this.numAPer) + eval(this.numBPer) + eval(this.numCPer)
        ) {
          // console.log(eval(this.numAPer) + eval(this.numBPer) + eval(this.numCPer))
          this.isworngFn("ABC三款的分摊比例之和不等于100！");
          return false;
        }
      } else {
        if (100 != eval(this.numAPer) + eval(this.numBPer)) {
          this.isworngFn("AB两款的分摊比例之和不等于100！");
          return false;
        }
      }

      //输入社会信用代码或税务登记号
      if (this.taxNumberTwo == "" || this.taxNumberTwo == "请输入") {
        this.isworngFn("请输入社会信用代码或税务登记号");
        return false;
      }
      if(this.organCode4.length < 15 || this.organCode4.length > 20){
        this.isworngFn("输入社会信用代码或税务登记号的格式不正确");
        return false;
      }
      //输入纳税地
      if (this.taxPlaceCode == "" || this.taxPlaceCode == "请输入") {
        this.isworngFn("请选择纳税地");
        return false;
      }
      //输入纳税地
      if (this.taxBureauName == "" || this.taxBureauName == "请输入") {
        this.isworngFn("请输入纳税分局名称");
        return false;
      }
      //选择已经阅读
      if (!this.isAlready) {
        this.isworngFn("选择已经阅读");
        return false;
      }
      // 获取页面的所有值放到一个对象中
      let messageDataList = {
        subBirthday: this.birthdayData, //出生日期
        subPayMuch: this.numbermony, //交费金额
        numA: this.numA, //税延养老A款
        numAPer: this.numAPer,
        numB: this.numB, //税延养老B款
        numBPer: this.numBPer,
        numC: this.numC, //税延养老C款
        numCPer: this.numCPer,
        paymentMethod:this.isWayCode,//交费方式
        taxNumberTwo: this.taxNumberTwo, //税务登记号码值
        organCode1: this.organCode1, //税务登记号
        organCode4: this.organCode4, //社会信用代码
        taxPayerType: this.taxPayerType, //个税征收方式
        taxPlaceCode: this.taxPlaceCode, //纳税地代码
        taxBureauName: this.taxBureauName //纳税分局名称
      };
      
      messageDataList = JSON.stringify(messageDataList);
      window.localStorage.setItem('messageDataList', messageDataList)
      console.log(messageDataList);
      let messageData = new FormData();
      messageData.append("messageData", messageDataList);
      this.checkptFn({
        messageData,
        successCallback: () => {
          if (this.isSelect) {
            this.isEnterQuestion = true;
          } else {
            this.$router.push({ path: "/policyholder" });
          }
        },
        failCallback: () => {}
      });
    },
    //跳转至购买记录页面
    recordFn() {
      this.$router.push({ path: "/recordpage" });
    },
    //验证是否是100的整数倍
    isInteger(text) {
      let reg = /^(0|[1-9]\d*00)$/;
      return reg.test(text);
    },
    //校验只让输入正整数
    isIntegerTwo(text) {
      let reg = /^\d*[1-9]{1,}\d*$/;
      return reg.test(text);
    },
    //输入错误提示
    isworngFn(value) {
      this.isShowWrong = true;
      this.wrongData = value;
      setTimeout(() => {
        this.isShowWrong = false;
      }, 1000);
      return false;
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
      .tb_premium_left {
        display: flex;
        flex: 0.8;
        .tb_premium_icon {
          width: 16px;
          div {
            width: 16px;
            height: 16px;
            background: #ffffff;
            border: 1px solid #d0d0d0;
            border-radius: 2px;
            position: absolute;
            top: 31%;
          }

          img {
            width: 100%;
            display: block;
            margin-top: 3px;
          }
        }
        .tb_premium_a {
          flex: 0.5;
          margin-left: 14px;
        }
        .tb_premium_num {
          flex: 0.4;
          input {
            width: 70%;
            text-align: right;
          }
        }
      }
      .tb_premium_right {
        flex: 0.2;
        padding-right: 15px;
        p {
          input {
            width: 70%;
            text-align: right;
          }
        }
      }
      .tb_box_date {
        padding-right: 15px;
        line-height: $heightline;
        flex: 0.8;
        .tb_date_content {
          line-height: $heightline;
          height: $heightline;
          padding-right: 0.8rem;
          box-sizing: border-box;
          width: 100%;
          font-size: $fontsize;
          background: url(../../static/img/dateicon.svg) no-repeat right center;
        }
        p {
          text-align: right;
        }
        p.tb_box_code {
          padding-right: 0.5rem;
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
        .tb_sw_name {
          input {
            width: 100%;
            text-align: right;
          }
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
// 统一社会信用代码
.code_style {
  padding: 0.5rem 0.3rem;
  text-align: center;
  line-height: 0.75rem;
  .code_title {
    font-size: 0.46rem;
    color: #333333;
    text-align: center;
    font-family: PingFangSC-Medium;
    margin-bottom: 0.3rem;
  }
  .code_radio {
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 0.4rem;
    div {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.6rem;
      border: 1px solid #c9c9c9;
      padding: 0px 2px 4px;
      box-sizing: border-box;
      img {
        width: 100%;
        margin-bottom: 8px;
      }
    }
    p {
      margin-left: 0.2rem;
    }
  }
  .code_checked {
    color: #02ad4d;
  }
  .code_input {
    width: 100%;
    margin-top: 0.5rem;
    input {
      width: 100%;
      background: #ffffff;
      border: 1px solid #dddddd;
      line-height: 0.5rem;
      padding: 0.35rem;
      box-sizing: border-box;
    }
  }
}
.onlyAdress {
  background: #ffe8e1;
  text-align: center;
  color: #ff6333;
  font-size: 0.37rem;
  line-height: 1rem;
}
// 提示框 进入问题页面
.tips_enter {
  padding: 15px;
  text-indent: 2em;
  font-size: 0.37rem;
  color: #666666;
  i {
    color: #151515;
    font-weight: bold;
  }
}
//错误弹出层样式
.alerWrongStyle {
  padding: 0.2rem;
  font-size: 0.4rem;
  line-height: 0.58rem;
  color: #ff0000;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.15);
}
.tb_button {
  display: flex;
  button:first-child {
    flex: 0.44;
    background: #fff;
    color: #666;
  }
  button:last-child {
    flex: 0.56;
  }
}
</style>



