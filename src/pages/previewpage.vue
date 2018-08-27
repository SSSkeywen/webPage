<template>
    <div class="pre_box">
        <section class="pre_message" :class="index==0?'margin-top-0':''" v-for="(preItem, index) in preContents" :key="index">
            <hgroup class="pre_hgroup">{{ preItem.preTitle }}</hgroup>
            <ul class="pre_ul">
                <li v-for="(item, index) in preItem.precontent" :key="index" :class="item.preaddress">
                    <p :class="item.preaddressleft">{{ item.contentleft }}</p>
                    <div class="pre_content">
                        <p>{{ item.contentright }}</p>
                    </div>
                </li>
            </ul>
        </section>
        <section class="pre_message" v-if="cardMessage">
            <hgroup class="pre_hgroup">证件信息</hgroup>
            <ul class="pre_ul_pt">
                <li v-for="(itemCard, index) in cardListSubmit" :key="index">
                    <p class="pre_pt_title">{{ index+1 }}. {{ itemCard.phIdentity }}{{ itemCard.phName }}{{ itemCard.phCardName }}</p>
                    <div class="pre_pt_content">
                        <div v-for="(item, index) in itemCard.identityCardList" :key="index">
                            <img :src="item.imgSrc" alt="" srcset="">
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="pre_message" v-if="isCrsCount">
            <hgroup class="pre_hgroup">居民税收信息</hgroup>
            <ul class="pre_ul">
                <li v-for="(item, index) in peopleMessageList" style="padding:0.2rem 15px;" class="addressstyle" :key="index" :class="item.preaddress">
                    <p :class="item.preaddressleft" class="addressstyleleft" style="flex:auto;line-height:0.7rem;">{{ item.contentleft }}</p>
                    <div class="pre_content" style="flex:auto;padding-top:0;padding-left:0.2rem;">
                        <p>{{ item.contentright }}</p>
                    </div>
                </li>
            </ul>
        </section>
        <div class="tb_button">
          <button @click="buypage">提交</button>
        </div>
        <alertWrong ref="alertFn"></alertWrong>
    </div>
</template>

<script>
import alertWrong from "../components/alertWrong";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      isCrsExempt: "", //判断是否显示居民税收信息
      isCrsCount: true, //
      cardMessage: false, //是否显示证件信息
      cardListSubmit: [],
      peopleMessageList: [
        //居民税收信息
        {
          preaddress: "addressstyle",
          preaddressleft: "addressstyleleft",
          contentleft: "税收居民身份类型",
          contentright: ""
        }
      ],
      preContents: [
        {
          preTitle: "投保信息",
          precontent: [
            {
              contentleft: "投保人(即被保人)姓名",
              contentright: ""
            },
            {
              contentleft: "证件类型",
              contentright: "身份证"
            },
            {
              contentleft: "证件号码",
              contentright: ""
            },
            {
              contentleft: "证件有效期",
              contentright: ""
            },
            {
              contentleft: "出生日期",
              contentright: ""
            },
            {
              contentleft: "性别",
              contentright: ""
            },
            {
              contentleft: "职业",
              contentright: ""
            },
            {
              contentleft: "所在地区",
              contentright: ""
            },
            {
              contentleft: "详细地址",
              contentright: "",
              preaddress: "addressstyle",
              preaddressleft: "addressstyleleft"
            },
            {
              contentleft: "邮政编码",
              contentright: ""
            },
            {
              contentleft: "电子邮箱",
              contentright: ""
            },
            {
              contentleft: "手机号码",
              contentright: ""
            },
            {
              contentleft: "续期缴费成功通知方式",
              contentright: "短信"
            },
            {
              contentleft: "各类通知书查询方式",
              contentright: "自助查询"
            }
          ]
        },
        {
          preTitle: "个税信息",
          precontent: [
            {
              contentleft: "单位名称",
              contentright: ""
            },
            {
              contentleft: "统一社会信用代码",
              contentright: ""
            },
            {
              contentleft: "证件号码",
              contentright: ""
            },
            {
              contentleft: "个税征收方式",
              contentright: ""
            },
            {
              contentleft: "纳税地",
              contentright: ""
            },
            {
              contentleft: "纳税分局名称",
              contentright: ""
            }
          ]
        },
        {
          preTitle: "身故受益人信息",
          precontent: [
            {
              contentleft: "身故受益人",
              contentright: ""
            }
          ]
        },
        {
          preTitle: "保障方案",
          precontent: [
            {
              contentleft: "交费年限",
              contentright: "交至国家规定退休年龄"
            },
            {
              contentleft: "交费方式",
              contentright: ""
            },
            {
              contentleft: "交费金额",
              contentright: ""
            },
            {
              contentleft: "税延养老A款",
              contentright: ""
            },
            {
              contentleft: "税延养老B1款",
              contentright: ""
            }
          ]
        }
      ]
    };
  },
  components: {
    alertWrong
  },
  created() {
    //判断是否显示居民税收信息
    let isCrsExempt = JSON.parse(window.localStorage.getItem("isCrsExempt"));
    console.log(isCrsExempt.isCrsExempt);
    this.isCrsExempt = isCrsExempt.isCrsExempt;

    let messageDataList = JSON.parse(
      window.localStorage.getItem("messageDataList")
    );
    let cardListData = JSON.parse(window.localStorage.getItem("cardListData"));
    let policyDataList = JSON.parse(
      window.localStorage.getItem("policyDataList")
    );
    console.log(messageDataList);
    console.log(messageDataList.taxCodeName);
    console.log(policyDataList);
    //证件信息
    this.cardListSubmit = cardListData;
    this.preContents[2].precontent[0].contentright = policyDataList.beneName;
    //身故受益人信息beneName
    if (cardListData) {
      this.cardMessage = true;
    } else {
      this.cardMessage = false;
      // this.preContents[2].precontent[0].contentright = "法定受益人";
    }
    // 数据导入
    this.preContents[0].precontent[0].contentright = policyDataList.realName;
    this.preContents[0].precontent[2].contentright = policyDataList.certiCode;
    this.preContents[0].precontent[3].contentright =
      policyDataList.certiValidate;
    console.log(policyDataList.certiValidate);
    if (policyDataList.certiValidate == "9999-09-09") {
      this.preContents[0].precontent[3].contentright = "永久有效";
    }
    this.preContents[0].precontent[4].contentright = policyDataList.birthday;
    if (policyDataList.gender == "M") {
      this.preContents[0].precontent[5].contentright = "男";
    } else {
      this.preContents[0].precontent[5].contentright = "女";
    }
    this.preContents[0].precontent[6].contentright = policyDataList.jobName;
    this.preContents[0].precontent[7].contentright =
      policyDataList.livingAddress;
    this.preContents[0].precontent[8].contentright = policyDataList.addressData;
    this.preContents[0].precontent[9].contentright = policyDataList.zip;
    this.preContents[0].precontent[10].contentright = policyDataList.Email;
    this.preContents[0].precontent[11].contentright = policyDataList.phoneNm;
    this.preContents[1].precontent[0].contentright = messageDataList.jobCom;
    this.preContents[1].precontent[1].contentleft = messageDataList.taxCodeName;
    if (messageDataList.taxCodeName == "统一社会信用代码") {
      this.preContents[1].precontent[1].contentright =
        messageDataList.organCode4;
    } else {
      this.preContents[1].precontent[1].contentright =
        messageDataList.organCode1;
    }
    this.preContents[1].precontent[2].contentright = policyDataList.certiCode;
    this.preContents[1].precontent[3].contentright = messageDataList.taxStyle;
    this.preContents[1].precontent[4].contentright =
      messageDataList.AddressData;
    this.preContents[1].precontent[5].contentright =
      messageDataList.taxBureauName;

    // 保障方案
    this.preContents[3].precontent[1].contentright = messageDataList.wayData;
    this.preContents[3].precontent[2].contentright = messageDataList.subPayMuch;
    this.preContents[3].precontent[3].contentright =
      messageDataList.numAPer + "% | " + messageDataList.numA;
    this.preContents[3].precontent[4].contentright =
      messageDataList.numBPer + "% | " + messageDataList.numB;

    if (this.isCrsExempt != "Y") {
      //税收信息导入
      let checkedData =
        JSON.parse(window.localStorage.getItem("checkedData")) ||
        "仅为中国税收居民";
      console.log(checkedData);
      this.peopleMessageList[0].contentright = checkedData;
      // if(checkedData ==)
      if (checkedData != "仅为中国税收居民") {
        let nonResidentTax = JSON.parse(
          window.localStorage.getItem("nonResidentTax")
        );
        this.peopleMessageList.push({
          contentleft: "姓（英文或拼音）",
          contentright: nonResidentTax.familyName
        });
        this.peopleMessageList.push({
          contentleft: "名（英文或拼音）",
          contentright: nonResidentTax.givenNames
        });
        //现居地
        this.peopleMessageList.push({
          contentleft: "现居地址国（英文或拼音）",
          contentright: nonResidentTax.currentEnCountry
        });
        this.peopleMessageList.push({
          contentleft: "现居地址省（英文或拼音）",
          contentright: nonResidentTax.currentAddressEn1
        });
        this.peopleMessageList.push({
          contentleft: "现居地址市（英文或拼音）",
          contentright: nonResidentTax.currentAddressEn2
        });
        this.peopleMessageList.push({
          contentleft: "现居地址详细地址（英文或拼音）",
          contentright: nonResidentTax.currentAddressEn3
        });
        if (nonResidentTax.currentEnCountry == "China") {
          if (
            nonResidentTax.currentCountry != "" &&
            nonResidentTax.currentCountry != "请选择" &&
            nonResidentTax.currentCountry != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "现居地址国（中文）",
              contentright: nonResidentTax.currentCountry
            });
          }
          if (
            nonResidentTax.currentAddress1 != "" &&
            nonResidentTax.currentAddress1 != "请选择" &&
            nonResidentTax.currentAddress1 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "现居地址省（中文）",
              contentright: nonResidentTax.currentAddress1
            });
          }
          if (
            nonResidentTax.currentAddress2 != "" &&
            nonResidentTax.currentAddress2 != "请选择" &&
            nonResidentTax.currentAddress2 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "现居地址市（中文）",
              contentright: nonResidentTax.currentAddress2
            });
          }
          if (
            nonResidentTax.currentAddress3 != "" &&
            nonResidentTax.currentAddress3 != "请选择" &&
            nonResidentTax.currentAddress3 != undefined
          ) {
            console.log(nonResidentTax.currentAddress3);
            this.peopleMessageList.push({
              contentleft: "现居地址区（中文）",
              contentright: nonResidentTax.currentAddress3
            });
          }

          if (
            nonResidentTax.currentAddress4 != "" &&
            nonResidentTax.currentAddress4 != "请选择" &&
            nonResidentTax.currentAddress4 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "现居地址详细地址（中文）",
              contentright: nonResidentTax.currentAddress4
            });
          }
        }

        //出生地
        this.peopleMessageList.push({
          contentleft: "出生地址国（英文或拼音）",
          contentright: nonResidentTax.birthEnCountry
        });
        this.peopleMessageList.push({
          contentleft: "出生地址省（英文或拼音）",
          contentright: nonResidentTax.birthAddressEn1
        });
        this.peopleMessageList.push({
          contentleft: "出生地址市（英文或拼音）",
          contentright: nonResidentTax.birthAddressEn2
        });
        this.peopleMessageList.push({
          contentleft: "出生地址详细地址（英文或拼音）",
          contentright: nonResidentTax.birthAddressEn3
        });

        if (nonResidentTax.birthEnCountry == "China") {
          if (
            nonResidentTax.birthCountry != "" &&
            nonResidentTax.birthCountry != "请选择" &&
            nonResidentTax.birthCountry != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "出生地址国（中文）",
              contentright: nonResidentTax.birthCountry
            });
          }
          if (
            nonResidentTax.birthAddress1 != "" &&
            nonResidentTax.birthAddress1 != "请选择" &&
            nonResidentTax.birthAddress1 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "出生地址省（中文）",
              contentright: nonResidentTax.birthAddress1
            });
          }
          if (
            nonResidentTax.birthAddress2 != "" &&
            nonResidentTax.birthAddress2 != "请选择" &&
            nonResidentTax.birthAddress2 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "出生地址市（中文）",
              contentright: nonResidentTax.birthAddress2
            });
          }
          if (
            nonResidentTax.birthAddress3 != "" &&
            nonResidentTax.birthAddress3 != "请选择" &&
            nonResidentTax.birthAddress3 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "出生地址区（中文）",
              contentright: nonResidentTax.birthAddress3
            });
          }
          if (
            nonResidentTax.birthAddress4 != "" &&
            nonResidentTax.birthAddress4 != "请选择" &&
            nonResidentTax.birthAddress4 != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "出生地址详细地址（中文）",
              contentright: nonResidentTax.birthAddress4
            });
          }
        }

        //税收国家信
        let numIndex = 1;
        for (let item of nonResidentTax.taxInfo) {
          this.peopleMessageList.push({
            contentleft: "税收居民国" + numIndex++,
            contentright: item.taxCountry
          });
          if (
            item.taxPayerId != "" &&
            item.taxPayerId != "请选择" &&
            item.taxPayerId != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "居民国纳税人识别号",
              contentright: item.taxPayerId
            });
          }
          if (
            item.taxIdNoneReason != "" &&
            item.taxIdNoneReason != "请选择" &&
            item.taxIdNoneReason != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "无居民地纳税人识别号原因",
              contentright: item.taxIdNoneReason
            });
          }
          if (
            item.taxIdNoneNote != "" &&
            item.taxIdNoneNote != "请选择" &&
            item.taxIdNoneNote != undefined
          ) {
            this.peopleMessageList.push({
              contentleft: "未能取得纳税人识别号具体原因",
              contentright: item.taxIdNoneNote
            });
          }
        }
      }
    }else{
      this.isCrsCount = false
    }
    // console.log(nonResidentTax)
  },
  methods: {
    ...mapActions({
      tepsubmitInfo: "TEPSUBMITINFO"
    }),
    buypage() {
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


      let checkedData = '';
      var nonResidentTax = '';
      var checkedDataNum ='';
      if(this.isCrsExempt != 'Y'){
      //是否为中国纳税人
      checkedData =
        JSON.parse(window.localStorage.getItem("checkedData")) ||
        "仅为中国税收居民";
      
      if (checkedData == "仅为中国税收居民") {
        checkedDataNum = "1";
      } else if (checkedData == "仅为非居民") {
        checkedDataNum = "2";
      } else {
        checkedDataNum = "3";
      }
      console.log(checkedData);
      
      if (checkedData != "仅为中国税收居民") {
        nonResidentTax = JSON.parse(
          window.localStorage.getItem("nonResidentTax")
        );
        console.log(nonResidentTax);
        for (let item of nonResidentTax.taxInfo) {
          console.log(item.taxIdNoneReason);
          if (item.taxIdNoneReason == "居民国（地区）不发放纳税人识别号") {
            item.taxIdNoneReason = "A";
          } else if (item.taxIdNoneReason == "账户持有人未能取得纳税人识别号") {
            item.taxIdNoneReason = "B";
          }
        }
        if (nonResidentTax.currentEnCountry != "China") {
          nonResidentTax.currentCountry = "";
          nonResidentTax.currentAddress1 = "";
          nonResidentTax.currentAddress2 = "";
          nonResidentTax.currentAddress3 = "";
          nonResidentTax.currentAddress4 = "";
        }
        if (nonResidentTax.birthEnCountry != "China") {
          nonResidentTax.birthCountry = "";
          nonResidentTax.birthAddress1 = "";
          nonResidentTax.birthAddress2 = "";
          nonResidentTax.birthAddress3 = "";
          nonResidentTax.birthAddress4 = "";
        }

        nonResidentTax = JSON.stringify(nonResidentTax);
      } else {
        nonResidentTax = "";
      }
      }
      // console.log(checkedDataNum)
      //item.taxIdNoneReason
      console.log("--------------questScore");
      let toast1 = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 20000
      });
      let tepsubmitData = new FormData();
      tepsubmitData.append("messageData", messageDataList);
      tepsubmitData.append("cardListData", cardListData);
      tepsubmitData.append("policyData", policyDataList);
      tepsubmitData.append("openidList", openidList);
      tepsubmitData.append("questScore", questScore);
      tepsubmitData.append("policyBenes", policyBenes);
      tepsubmitData.append("taxpayerType", checkedDataNum);
      if (checkedData != "仅为中国税收居民") {
        tepsubmitData.append("nonResidentTax", nonResidentTax);
        console.log(checkedDataNum);
        console.log(nonResidentTax);
      }

      this.tepsubmitInfo({
        tepsubmitData,
        successCallback: () => {
          toast1.clear();
          this.$router.push({ path: "/buypage" });
        },
        failCallback: result => {
          toast1.clear();
          this.$refs.alertFn.isworngFn(result);
        }
      });
      // this.$router.push({ path: "/buypage" });
    }
  }
};
</script>

<style lang="scss" scoped>
.pre_box {
  background-color: #e7e7f5;
  // height: 100%;
  overflow-y: auto;
  .pre_message {
    background: #fff;
    margin-top: 0.37rem;
    box-sizing: border-box;
    font-size: 0.4rem;
    .pre_hgroup {
      width: 100%;
      height: 1.4rem;
      line-height: 1.4rem;
      background: #fafafa;
      color: #333333;
      text-align: center;
    }
    .pre_ul {
      li {
        width: 100%;
        height: 1.1rem;
        line-height: 1.1rem;
        background: #fafafa;
        color: #666;
        display: flex;
        padding: 0 15px;
        box-sizing: border-box;
        justify-content: space-between;
        .pre_content {
          color: #333333;
          flex: 0.9;
          text-align: right;
          overflow-x: auto;
        }
      }
      li.addressstyle {
        height: auto;
        .addressstyleleft {
          flex: 0.3;
        }
        div {
          flex: 0.6;
          line-height: 0.7rem;
          padding: 0.2rem 0 0 0;
          box-sizing: border-box;
          text-align: right;
        }
      }
    }
    .pre_ul_pt {
      background-color: #e7e7f5;
      li {
        width: 100%;
        padding: 0 15px 15px;
        box-sizing: border-box;
        margin-bottom: 5px;
        background: #fff;
        .pre_pt_title {
          height: 1.4rem;
          line-height: 1.4rem;
          font-size: 0.4rem;
          color: #333333;
        }
        .pre_pt_content {
          display: flex;
          justify-content: space-between;
          text-align: center;
          position: relative;
          div {
            flex: 0.43;
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .tb_button {
    margin-top: 0.37rem;
  }
}
.margin-top-0 {
  margin-top: 0 !important;
}
</style>