<template>
    <div class="buy-page-style">
        <header class="bp_logo">
            <img src="../../static/img/tplogo.png" alt="" srcset="">
        </header>
        <section class="bp_content">
            <ul>
                <li v-for="(bplist, index) in bplists" :key="index" class="bp_list" :class="bplist.linestyle">
                    <hgroup>{{ bplist.listleft }}</hgroup>
                    <p><span :class="bplist.stylefont">{{ bplist.listright }}</span>{{ bplist.listyuan }}</p>
                </li>
            </ul>
            <div class="bp_bank bp_line">
                <div class="bp_bank_message">
                    <div class="bp_bank_img">
                        <img src="../../static/img/paybank.png" alt="" srcset="">
                    </div>
                    <div class="bp_bank_font">
                        <p class="bp_bank_font_top">银行卡支付</p>
                        <p class="bp_bank_font_bottom">提供银行账户信息，免密自动扣款</p>
                    </div>
                </div>
                <div class="bp_bank_checked">
                    <div>
                        <img src="../../static/img/checkedicon.png" alt="" srcset="">
                    </div>
                </div>
            </div>
            <ul>
                <li v-for="(bplist, index) in bplistsTwo" :key="index" class="bp_list bp_listtwo" :class="[bplist.linestyle,bplist.classStyle]">
                    <hgroup>{{ bplist.listleft }}</hgroup>
                    <p class="bp_listtwop">
                      <span class="three" v-if="bplist.Listselect" @click="isbankShow=!isbankShow" :class="bplist.stylefont">{{ bplist.listright }}</span>
                      <span class="three" v-else-if="bplist.Listcertselect" @click="iscertShow=!iscertShow" :class="bplist.stylefont">{{ bplist.listright }}</span>
                      <input  oninput="if(value.length>30)value=value.slice(0,30)" v-else v-model="bplist.listcontent" :disabled="bplist.isDisable"  :placeholder="bplist.listright" :type="bplist.listType">
                    </p>
                </li>
            </ul>
            <div class="bpclause bp_line">
                <div class="bp_checked" @click="isGreen=!isGreen">
                    <img v-if="isGreen" src="../../static/img/checkedicon.png" >
                </div>
                <p class="bp_clause_content"><span v-if="isNeesAuth!='1'" style="color: #02ad4d;">已确认转账信息和银行预留信息一致。<br></span>我已查阅<a @click="isStatement=!isStatement">《保费自动转账授权声明》</a>，并同意授权从该银行账户自动扣取各期保费，首期保费缴纳成功日期为当月1日至24日的保单，续期保险费扣费日则为从下月开始的每月15日；首期保费缴纳成功日期为当月25日至31日的保单，续期保险费扣费日为从隔月开始的每月15日。</p>
            </div>
        </section>
        <div class="bp_btn">
            <button @click="fourJqFnOne">支付</button>
        </div>
        <!-- 银行卡选择 -->
      <van-actionsheet v-model="isbankShow" :actions="bankList" cancel-text="取消" />
      <!-- 证件信息选择 -->
      <van-actionsheet v-model="iscertShow" :actions="certDataList" cancel-text="取消" />
      <!-- <van-actionsheet v-model="iscertShow" :actions="certList" cancel-text="取消" /> -->
      <alertWrong @inputVcode="inputVcode" ref="alertFn"></alertWrong>
      <van-dialog
      v-model="isinputVcode"
      @confirm="suerInputFn"
      show-cancel-button
    >
      <div class="code_style">
        <hgroup class="code_title">银行卡协议支付短信验证码将发送至您尾号为<span style="color: #00c000;">{{ phoneNmoffFour }}</span>的手机，请查收！</hgroup>
        <div class="code_input">
          <input maxlength="20" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  v-model="inputCodeData" type="text" placeholder="请输入验证码">
        </div>
      </div>
    </van-dialog>
      <van-popup v-model="isStatement" class="statement_style">
        <van-icon name="close" class="close_icon" @click="isStatement=!isStatement"/>
        <header>《保费自动转账授权声明》</header>
        <ul>
          <li>1.投保人自愿同意太平人寿保险股份有限公司将该投保人提供的银行账户（以下简称“该账户”）用于保险款项转账支付，或用于与太平人寿保险股份有限公司约定的首期保险费转账支付、续期保险费转账支付等于保险事宜相关的用途。自授权生效起，本人毋需另行个别授权，太平人寿保险有限公司于每期应缴日自该账户自动扣款及转账。首期保费缴纳成功日期为当月1日至24日的保单，续期保险费扣费日则为从下月开始的每月15日；首期保费缴纳成功日期为当月25日至31日的保单，续期保险费扣费日为从隔月开始的每月15日。</li>
          <li>2. 本授权声明自投保人勾选该转账授权声明后立即生效，投保人在该授权声明所依附的保险合同项的权利义务履行完毕后失效。</li>
          <li>3. 投保人同意该账户为本人真实姓名开立的合法有效的个人借记卡账户。</li>
          <li>4. 投保人同意，本授权一经生效不得撤销，太平人寿保险有限公司根据本授权声明所采取的行动和措施的法律后果由本人承担。</li>
          <li>5. 投保人同意，受银行机构、第三方支付机构以及网络等非太平人寿保险有限公司的原因，太平人寿保险有限公司根据本授权声明采取的行动和措施的时效性和结果不承担任何责任。</li>
          <li>6. 投保人同意，本授权声明仅为本人对太平人寿保险有限公司从该账户中扣款转账的授权证明，不作为收付保费的依据，不影响该授权声明所依附的保险合同的双方当事人的权利义务。</li>
          <li>7. 投保人保证提供的银行账户中有足够的金额支付应交保险费，投保人同意，该账户存款余额不足造成转账不成功，因此引起的责任均由投保人承担（注：为避免账户被注销，银行账户中余额要保持>10元）</li>
          <li>8. 投保人同意，以上授权的该账户除用于缴纳首期保险费等第1款约定的用途以外，包括但不限于因撤销投保申请、退保等引起的太平人寿保险股份有限公司需向投保人退费的，太平人寿保险有限公司有权将相关退费退至该账户。</li>
          <li>9. 投保人承诺，投保人因故注销该账户，应重新开立账户，并在【5】日内通知太平人寿保险股份有限公司进行变更。变更完毕后以短信通知的形式告知投保人。投保人同意，因投保人未能及时通知太平人寿保险股份有限公司而引起的责任或损失由投保人承担。</li>
          <li></li>
        </ul>
      </van-popup>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import alertWrong from "../components/alertWrong.vue";
export default {
  data() {
    return {
      isStatement: false, //是否显示声明
      isbankShow: false, //是否显示银行卡
      isinputVcode: false, //是否输入验证码
      inputCodeData: "", //短信验证码
      phoneNmoffFour: "", //手机号码后四位
      phoneCodeNm: "", //返回的code代码
      SMSSerialNumber: "", //四要素鉴权新加验证码
      isNeesAuth: "",
      bankCode: "",
      iscertShow: false,
      certCode: "01", // 证件信息Code
      certDataList: [], //证件信息
      bankList: [
        {
          name: "工商银行",
          callback: this.bankFn,
          code: "11111"
        },
        {
          name: "商业银行",
          callback: this.bankFn,
          code: "2222"
        }
      ],
      isGreen: false, //是否已经查阅
      bplists: [
        {
          listleft: "订单号",
          listright: "887490287559087634",
          linestyle: "bp_line"
        },
        {
          listleft: "保险名称",
          listright: "太平个人税收递延型养老年金保险",
          linestyle: "bp_line"
        },
        {
          listleft: "应付金额",
          listright: "200.00",
          linestyle: "bp_line",
          stylefont: "resfont",
          listyuan: " 元"
        }
      ],
      bplistsTwo: [
        {
          listleft: "持卡人",
          listright: "请输入",
          listcontent: "",
          linestyle: "bp_line",
          listType: "text",
          isDisable: true
        },
        {
          listleft: "开户银行",
          listright: "请选择",
          listcontent: "",
          linestyle: "bp_line",
          Listselect: true
        },
        {
          listleft: "银行卡号",
          listright: "请输入持卡人本人的银行卡",
          listcontent: "",
          linestyle: "bp_line",
          listType: ""
        },
        {
          //  赵盼加
          listleft: "证件类型",
          listright: "居民身份证",
          listcontent: "",
          linestyle: "bp_line",
          Listcertselect: true
        },
        {
          listleft: "证件号码",
          listright: "请输入",
          listcontent: "",
          linestyle: "bp_line",
          listType: ""
        },
        {
          listleft: "银行预留手机号码",
          listright: "请输入",
          listcontent: "",
          linestyle: "bp_line",
          listType: "",
          classStyle: "flexNew"
        }
      ]
    };
  },
  components: { alertWrong },
  created() {
    let messageDataList = JSON.parse(
      window.localStorage.getItem("messageDataList")
    );
    let buyList = JSON.parse(window.localStorage.getItem("buyList"));
    let policyDataList = JSON.parse(
      window.localStorage.getItem("policyDataList")
    );
    this.bplists[2].listright = messageDataList.subPayMuch;

    this.bplists[0].listright = buyList.hiddenParameters.orderCode;
    this.bplistsTwo[0].listcontent = policyDataList.realName;
    // 赵盼获取身份证号码；
    this.bplistsTwo[4].listcontent = policyDataList.certiCode;
    this.bplistsTwo[5].listcontent = policyDataList.phoneNm;

    //获取是否需要走四要素鉴权
    this.needAuthFn({
      successCallback: result => {
        this.isNeesAuth = result;
        if (result == "1") {
          this.bplistsTwo.splice(3, 4);
        }
      },
      failCallback: () => {}
    });
  },
  mounted() {
    this.bankListFN({
      successCallback: result => {
        for (let item of result) {
          item.callback = this.bankFn;
          item.name = item.bank_name;
        }
        this.bankList = result;
      },
      failCallback: () => {}
    });
    this.certList({
      successCallback: result => {
        console.log(result);
        for (let item of result) {
          item.callback = this.certFn;
          item.name = item.cert_desc;
        }
        this.certDataList = result;
      },
      failCallback: () => {}
    });
  },

  methods: {
    ...mapActions({
      tepToPay: "TEPTOPAY", //支付
      bankListFN: "BANKLIST", //支付
      certList: "CERTLIST", //证件
      fourJqFn: "FOURJQ", //四要素鉴权
      fourJqCodeFn: "FOURJQCODE", //四要素鉴权NEED_AUTH
      needAuthFn: "NEED_AUTH" //四要素鉴权NEED_AUTH
    }),
    //银行卡选择赋值
    bankFn(item) {
      this.bplistsTwo[1].listright = item.name;
      this.bankCode = item.bank_code;
      this.isbankShow = false;
    },
    //赵盼证件类型选择赋值
    certFn(item) {
      this.bplistsTwo[3].listright = item.name;
      this.certCode = item.cert_type_i;
      this.iscertShow = false;
      console.log(this.certCode);
    },
    //四要素鉴权
    fourJqFnOne() {
      if (this.bplistsTwo[0].listcontent == "") {
        this.$refs.alertFn.isworngFn("请输入持卡人姓名！");
        return false;
      }
      if (this.bankCode == "") {
        this.$refs.alertFn.isworngFn("请选择开户银行！");
        return false;
      }
      if (this.bplistsTwo[2].listcontent == "") {
        this.$refs.alertFn.isworngFn("请输入银行卡号！");
        return false;
      }
      if (!this.$toolsTwo.payCardFn(this.bplistsTwo[2].listcontent)) {
        this.$refs.alertFn.isworngFn("银行卡格式不正确！");
        return false;
      }
      //判断是否走四要素鉴权
      if (this.isNeesAuth == "1") {
        if (!this.isGreen) {
          this.$refs.alertFn.isworngFn("请勾选我已查阅保费自动转账授权声明！");
          return false;
        }
        this.payFn();
        return;
      }
      // 赵盼 证件号码验证
      if (this.bplistsTwo[4].listcontent == "") {
        this.$refs.alertFn.isworngFn("证件号码不能为空！");
        return false;
      }
      if (this.certCode == "01") {
        if (!this.$toolsTwo.codeCrad(this.bplistsTwo[4].listcontent)) {
          this.$refs.alertFn.isworngFn(" 证件号码格式不对！");
          return false;
        }
      }
      // 赵盼 手机号校验
      if (this.bplistsTwo[5].listcontent == "") {
        this.$refs.alertFn.isworngFn("手机号码不能为空！");
        return false;
      }
      if (!this.$toolsTwo.phoneFn(this.bplistsTwo[5].listcontent)) {
        this.$refs.alertFn.isworngFn("手机号码格式不对！");
        return false;
      }
      if (!this.isGreen) {
        this.$refs.alertFn.isworngFn("请勾选我已查阅保费自动转账授权声明！");
        return false;
      }

      let openidList = JSON.parse(window.localStorage.getItem("openidList"));
      console.log(openidList);
      let FourData = {
        CARDHOLDERNAME: this.bplistsTwo[0].listcontent,
        NAME: this.bplistsTwo[0].listcontent,
        BANKNAME: this.bplistsTwo[1].listright,
        BANKCODE: this.bankCode,
        CARDNUMBER: this.bplistsTwo[2].listcontent,
        CERT_TYPE: this.certCode, //证件类型
        CERT_CODE: this.bplistsTwo[4].listcontent, //银行卡号
        PHONENUMER: this.bplistsTwo[5].listcontent, //手机号码
        openId: openidList.openId //手机号码
      };
      FourData = JSON.stringify(FourData);
      console.log(FourData);
      let FourJqData = new FormData();
      FourJqData.append("payData", FourData);
      const toast2 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      this.fourJqFn({
        FourJqData,
        successCallback: () => {
          toast2.clear();
          this.payFn();
          // this.$router.push({ path: "/paypage" });
        },
        failCallback: (result, resultCode) => {
          toast2.clear();
          console.log(resultCode);
          this.phoneCodeNm = resultCode;
          if (resultCode == "2") {
            this.SMSSerialNumber = result;
            this.inputVcode();
          } else {
            this.$refs.alertFn.isworngFn(result);
          }
        }
      });
    },
    //填写验证码
    inputVcode() {
      console.log(11111);

      if (this.phoneCodeNm == "2") {
        this.phoneNmoffFour = this.bplistsTwo[5].listcontent.substring(7, 11);
        this.inputCodeData = "";
        this.isinputVcode = true;
      }
    },
    //提交验证码
    suerInputFn() {
      console.log(this.inputCodeData);
      if (this.inputCodeData == "") {
        this.$refs.alertFn.isworngFn("请输入短信验证码！");
        this.isinputVcode = true;
        return false;
      }
      let openidList = JSON.parse(window.localStorage.getItem("openidList"));
      let FourData = {
        CARDHOLDERNAME: this.bplistsTwo[0].listcontent,
        NAME: this.bplistsTwo[0].listcontent,
        BANKNAME: this.bplistsTwo[1].listright,
        BANKCODE: this.bankCode,
        CARDNUMBER: this.bplistsTwo[2].listcontent,
        CERT_TYPE: this.certCode, //证件类型
        CERT_CODE: this.bplistsTwo[4].listcontent, //银行卡号
        PHONENUMER: this.bplistsTwo[5].listcontent, //手机号码
        openId: openidList.openId, //手机号码
        VALIDATIONCODE: this.inputCodeData, //验证码
        SMSSerialNumber: this.SMSSerialNumber //新加验证码
      };
      FourData = JSON.stringify(FourData);
      console.log(FourData);
      const toast3 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      let FourJqCodeData = new FormData();
      FourJqCodeData.append("payData", FourData);
      this.fourJqCodeFn({
        FourJqCodeData,
        successCallback: result => {
          toast3.clear();
          // this.$refs.alertFn.isworngFn(result);
          this.payFn();
          // this.$router.push({ path: "/paypage" });
        },
        failCallback: result => {
          toast3.clear();
          this.$refs.alertFn.isworngFn(result);
        }
      });
    },
    payFn() {
      let payData;
      if (this.isNeesAuth == "1") {
        payData = {
          CARDHOLDERNAME: this.bplistsTwo[0].listcontent,
          BANKNAME: this.bplistsTwo[1].listright,
          BANKCODE: this.bankCode,
          CARDNUMBER: this.bplistsTwo[2].listcontent
          // CERT_TYPE: this.certCode, //证件类型
          // CERT_CODE: this.bplistsTwo[4].listcontent, //银行卡号
          // PHONENUMER: this.bplistsTwo[5].listcontent //手机号码
          // openId: openidList.openId, //手机号码
          // VALIDATIONCODE: this.inputCodeData  //验证码
        };
      } else {
        payData = {
          CARDHOLDERNAME: this.bplistsTwo[0].listcontent,
          BANKNAME: this.bplistsTwo[1].listright,
          BANKCODE: this.bankCode,
          CARDNUMBER: this.bplistsTwo[2].listcontent,
          CERT_TYPE: this.certCode, //证件类型
          CERT_CODE: this.bplistsTwo[4].listcontent, //银行卡号
          PHONENUMER: this.bplistsTwo[5].listcontent //手机号码
          // openId: openidList.openId, //手机号码
          // VALIDATIONCODE: this.inputCodeData  //验证码
        };
      }
      payData = JSON.stringify(payData);
      console.log(payData);
      // return false
      let buyList = JSON.parse(window.localStorage.getItem("buyList"));
      buyList = JSON.stringify(buyList);

      let messageDataList = JSON.parse(
        window.localStorage.getItem("messageDataList")
      );
      messageDataList = JSON.stringify(messageDataList);

      let cardListData = JSON.parse(
        window.localStorage.getItem("cardListData")
      );
      cardListData = JSON.stringify(cardListData);

      let policyDataList = JSON.parse(
        window.localStorage.getItem("policyDataList")
      );
      policyDataList = JSON.stringify(policyDataList);

      let openidList = JSON.parse(window.localStorage.getItem("openidList"));
      openidList = JSON.stringify(openidList);

      let questScore = JSON.parse(window.localStorage.getItem("questScore"));
      questScore = JSON.stringify(questScore);

      let policyBenes = JSON.parse(window.localStorage.getItem("policyBenes"));
      policyBenes = JSON.stringify(policyBenes);
      let payListData = new FormData();
      payListData.append("messageData", messageDataList);
      payListData.append("cardListData", cardListData);
      payListData.append("policyData", policyDataList);
      payListData.append("openidList", openidList);
      payListData.append("questScore", questScore);
      payListData.append("policyBenes", policyBenes);
      payListData.append("payData", payData);
      payListData.append("buyList", buyList);

      const toast1 = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      this.tepToPay({
        payListData,
        successCallback: () => {
          toast1.clear();
          this.$router.push({ path: "/paypage" });
        },
        failCallback: result => {
          toast1.clear();
          this.$refs.alertFn.isworngFn(result, true);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bp_logo {
  width: 100%;
  img {
    width: 100%;
  }
}
.bp_content {
  width: 100%;
  background-color: #fff;
  ul {
    li {
      position: relative;
    }
    .bp_list {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      line-height: 1.1rem;
      color: #333333;
      font-size: 0.4rem;
      p {
        color: #999999;
        flex: 0.8;
        text-align: right;
        input {
          // text-align: right;
          width: 100%;
          color: #999999;
        }
        .resfont {
          color: #ff6333;
        }
      }
    }
    .bp_listtwo {
      hgroup {
        flex: 0.25;
      }

      p.bp_listtwop {
        flex: 0.75;
        span {
          width: 100%;
          text-align: left;
          display: block;
          position: relative;
        }
      }
    }
    .bp_listtwo.flexNew {
      hgroup {
        flex: 0.5;
      }
    }
  }
  .bp_line:before {
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
  .bp_bank {
    display: flex;
    position: relative;
    padding: 15px;
    box-sizing: border-box;
    justify-content: space-between;
    .bp_bank_message {
      display: flex;
      .bp_bank_img {
        flex: 0.18;
        img {
          width: 100%;
        }
      }
      .bp_bank_font {
        flex: 0.7;
        padding-left: 6px;
        box-sizing: border-box;
        .bp_bank_font_top {
          color: #333333;
          font-size: 0.4rem;
        }
        .bp_bank_font_bottom {
          color: #999;
          font-size: 0.29rem;
        }
      }
    }
    .bp_bank_checked {
      width: 0.55rem;
      height: 0.55rem;
      border: 1px solid #c9c9c9;
      border-radius: 50%;
      padding: 0 2.6px 1px;
      box-sizing: border-box;
      margin-top: 0.2rem;
      img {
        width: 100%;
        margin-bottom: 2px;
      }
    }
  }
  .bpclause {
    display: flex;
    position: relative;
    padding: 15px;
    .bp_checked {
      width: 16px;
      height: 16px;
      background: #ffffff;
      border: 1px solid #d0d0d0;
      border-radius: 2px;
      box-sizing: border-box;
      img {
        width: 100%;
        margin-bottom: 6px;
      }
    }
    .bp_clause_content {
      font-size: 0.37rem;
      color: #999999;
      margin-left: 15px;
      flex: 0.95;
      text-align: justify;
      a {
        color: #02ad4d;
      }
    }
  }
}
.bp_btn {
  width: 100%;
  padding: 0.67rem 0 0.53rem;
  text-align: center;
  button {
    width: 8.87rem;
    height: 1.25rem;
    background: #02ad4d;
    border: 1px solid rgba(5, 5, 5, 0.08);
    border-radius: 5px;
    color: #fff;
    font-size: 0.47rem;
  }
}
// 条款样式
.statement_style {
  z-index: 2001;
  width: 9rem;
  padding: 0.5rem;
  box-sizing: border-box;
  height: 90%;
  border-radius: 7px;
  header {
    text-align: center;
    padding: 0 0 0.2rem;
    font-size: 0.45rem;
  }
  ul {
    height: 93%;
    overflow-y: auto;
    text-indent: 1.5em;
    li {
      margin-bottom: 0.2rem;
      text-align: justify;
    }
  }
  .close_icon {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    font-size: 0.55rem;
    color: #ff6333;
  }
}
.code_style {
  padding: 10px 5% 20px;
  position: relative;
  // border-bottom: 0.5px solid #e5e5e5;
  line-height: 24px;
  text-align: justify;
  font-size: 16px;
  color: #666;
  .code_title {
    color: #333333;
    text-align: left;
  }
  .code_input {
    width: 100%;
    margin-top: 10px;
    input {
      width: 100%;
      background: #ffffff;
      border: 1px solid #dddddd;
      line-height: 0.5rem;
      padding: 0.35rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 7px;
      border: 1px solid #dedede;
      border-radius: 7px;
      height: 36px;
      padding: 3px;
      font-size: 15px;
    }
  }
}
</style>