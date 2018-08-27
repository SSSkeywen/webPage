<template>
  <div class="ben_box">
      <hgroup class="ben_hgroup">
          <p>请选择您保单的身故受益人</p>
      </hgroup>
      <section class="ben_section">
          <hgroup>身故受益人</hgroup>
          <p @click="ispeopleShow=!ispeopleShow">{{ beneficiaryPeople }}</p>    
      </section>
      <section class="ben_sectiontwo" v-if="beneficiaryPeople!='法定受益人'">
          <button class="ben_btn" @click="addbp">添加受益人</button>
      </section>
      <section class="add_box" v-if="beneficiaryPeople!='法定受益人'">
        <ul class="add_box_ul">
          <li class="add_box_li" v-for="(orderItem, index) in orderDataList" :key="index">
            <hgroup>{{ orderItem.orderOne }}</hgroup>
            <ul>
              <li v-for="(orderNumItem, indextwo) in orderItem.orderOneList" @click="amendContent(index,indextwo)" :key="indextwo" class="three">
                <p>{{orderNumItem.realName}} ({{orderNumItem.relationId}})</p>
                <p>比例：{{orderNumItem.beneRate}}%</p>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <div class="tb_button">
        <button @click="bc_submit">下一步</button>
      </div>
      <!-- 法定受益人和指定受益人选择 -->
      <van-actionsheet v-model="ispeopleShow" :actions="peopleName" cancel-text="取消" />
      <!-- 添加受益人 -->
    <addvf-modelo ref="addModelfn" @fetchThree="delectFn" @fetchTwo="ammendFn" @fetch="addbenficiary"></addvf-modelo>
    <alertWrong ref="alertFn"></alertWrong>
    <!-- 选择是否是中国纳税人 -->
    <van-dialog
      v-model="iscredit"
      @confirm="icSubmit"
    >
      <div class="code_style">
        <van-icon name="close" class="code-close-icon" @click="codeClose"/>
        <hgroup class="code_title">请告知我们您的税收居民身份！</hgroup>
        
        
        <div class="code_radio" :class="checkedSe=='1'?'code_checked':''" @click="selectCode(1)">
          <div>
            <img v-if="checkedSe=='1'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>仅为中国税收居民</p>
        </div>
        <div class="code_radio" :class="checkedSe=='2'?'code_checked':''" @click="selectCode(2)">
          <div>
            <img v-if="checkedSe=='2'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>仅为非居民</p>
        </div>
        <div class="code_radio" :class="checkedSe=='3'?'code_checked':''" @click="selectCode(3)">
          <div>
            <img v-if="checkedSe=='3'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>既是中国税收居民又是其他国家（地区）税收居民</p>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import addvfModelo from "../components/addbfModelo";
import alertWrong from "../components/alertWrong";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      machOne: "",
      machTwo: "",
      showcontent: false,
      ispeopleShow: false, //法定受益人和指定受益人
      beneficiaryPeople: "法定受益人", //默认为法定受益人
      beneficiaryCode: "1",
      ispeopleAdd: false, //添加收益人
      addPeopleList: [],
      selectIconImga: require("../../static/img/checkedicon.png"), //绿色小对勾
      iscredit: false, //是否3
      isCrsExempt: "",
      checkedData: "",
      checkedDatas: [
        "仅为中国税收居民",
        "仅为非居民",
        "既是中国税收居民又是其他国家（地区）税收居民"
      ],
      checkedSe: "",
      peopleName: [
        {
          name: "法定受益人",
          value: "1",
          callback: this.peopleFn
        },
        {
          name: "指定受益人",
          value: "2",
          callback: this.peopleFn
        }
      ],
      //受益人顺序内容
      orderDataList: [
        {
          orderOne: "受益顺序 1",
          orderOneList: []
        },
        {
          orderOne: "受益顺序 2",
          orderOneList: []
        }
      ]
    };
  },
  components: {
    addvfModelo,
    alertWrong
  },
  created() {
    let isCrsExempt = JSON.parse(window.localStorage.getItem("isCrsExempt"));
    console.log(isCrsExempt.isCrsExempt);
    this.isCrsExempt = isCrsExempt.isCrsExempt;
  },
  mounted() {
    this.saveContent();
  },
  methods: {
    ...mapActions({
      addPolicy: "ADDPOLICY" //添加受益人方法
    }),
    //增加受益人方法
    addbp() {
      let num = [];
      this.$refs.addModelfn.openModle(num, false);
    },
    amendContent(index, indextwo) {
      this.machOne = index;
      this.machTwo = indextwo;
      this.$refs.addModelfn.openModle(
        this.orderDataList[index].orderOneList[indextwo],
        true,
        index
      );
    },
    //删除受益人方法
    delectFn() {
      this.orderDataList[this.machOne].orderOneList.splice(this.machTwo, 1);
    },
    //修改受益人方法
    ammendFn(policyList) {
      this.orderDataList[this.machOne].orderOneList.splice(this.machTwo, 1);
      if (policyList.beneOrder == "1") {
        if (this.orderDataList[0].orderOneList.length > 3) {
          this.$refs.alertFn.isworngFn(" 每项受益人最多为4人！");
          return false;
        }
        this.orderDataList[0].orderOneList.push(policyList);
      } else {
        if (this.orderDataList[1].orderOneList.length > 3) {
          this.$refs.alertFn.isworngFn(" 每项受益人最多为4人！");
          return false;
        }
        this.orderDataList[1].orderOneList.push(policyList);
      }
      this.ispeopleAdd = true;
    },
    //增加收益人
    addbenficiary(policyList) {
      if (policyList.beneOrder == "1") {
        if (this.orderDataList[0].orderOneList.length > 3) {
          this.$refs.alertFn.isworngFn(" 每项受益人最多为4人！");
          return false;
        }
        this.orderDataList[0].orderOneList.push(policyList);
      } else {
        if (this.orderDataList[1].orderOneList.length > 3) {
          this.$refs.alertFn.isworngFn(" 每项受益人最多为4人！");
          return false;
        }
        this.orderDataList[1].orderOneList.push(policyList);
      }
      this.ispeopleAdd = true;
    },
    //受益人选择方法
    peopleFn(item) {
      this.beneficiaryCode = item.value;
      this.beneficiaryPeople = item.name;
      this.ispeopleShow = false;
    },
    //下一步
    bc_submit() {
      if (this.beneficiaryPeople == "法定受益人") {
        let policyDataList = JSON.parse(
          window.localStorage.getItem("policyDataList")
        );
        policyDataList.beneType = this.beneficiaryCode;
        policyDataList.beneName = this.beneficiaryPeople;
        let policyDataListB = JSON.stringify(policyDataList);
        window.localStorage.setItem("policyDataList", policyDataListB);
        window.localStorage.removeItem("cardListData");
        window.localStorage.removeItem("policyBenes");
        // this.$router.push({ path: "/previewpage" });
        if (this.isCrsExempt != "Y") {
          this.iscredit = true;
        } else {
          this.$router.push({ path: "/previewpage" });
        }
        // this.iscredit = true;
        return false;
      }
      let oneBox = 0;
      for (let item of this.orderDataList[0].orderOneList) {
        oneBox = parseInt(oneBox) + parseInt(item.beneRate);
      }
      let oneBoxTwo = 0;
      for (let item of this.orderDataList[1].orderOneList) {
        oneBoxTwo = parseInt(oneBoxTwo) + parseInt(item.beneRate);
      }
      if (
        (oneBox == 100 && oneBoxTwo == 0) ||
        (oneBox == 0 && oneBoxTwo == 100) ||
        (oneBox == 100 && oneBoxTwo == 100)
      ) {
      } else {
        this.$refs.alertFn.isworngFn(
          "同一受益人顺序的受益比列合计值必须为100%！"
        );
        return false;
      }
      let messageDataList = JSON.parse(
        window.localStorage.getItem("messageDataList")
      );
      let messageDataListB = JSON.stringify(messageDataList);
      let policyDataList = JSON.parse(
        window.localStorage.getItem("policyDataList")
      );
      policyDataList.beneType = this.beneficiaryCode;
      policyDataList.beneName = this.beneficiaryPeople;
      let policyDataListB = JSON.stringify(policyDataList);
      window.localStorage.setItem("policyDataList", policyDataListB);
      let policyBenesA = JSON.stringify(this.orderDataList);
      window.localStorage.setItem("policyBenes", policyBenesA);
      let policyBenesData = new FormData();
      policyBenesData.append("policyBenes", policyBenesA);
      policyBenesData.append("messageData", messageDataListB);
      policyBenesData.append("policyData", policyDataListB);

      let toast1 = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 20000
      });

      this.addPolicy({
        policyBenesData,
        successCallback: key => {
          toast1.clear();
          if (key == "yes") {
            this.$router.push({ path: "/identitycardpage" });
          } else {
            window.localStorage.removeItem("cardListData");
            // this.iscredit = true;
            // this.$router.push({ path: "/previewpage" });
            if (this.isCrsExempt != "Y") {
              this.iscredit = true;
            } else {
              this.$router.push({ path: "/previewpage" });
            }
          }
        },
        failCallback: result => {
          toast1.clear();
          this.$refs.alertFn.isworngFn(result);
        }
      });
    },
    selectCode(key) {
      this.checkedSe = key;
      this.checkedData = this.checkedDatas[key - 1];
    },
    //进入CRS页面
    icSubmit() {
      console.log(this.checkedData);
      if (this.isCrsExempt != "Y") {
        if (this.checkedSe == "") {
          this.iscredit = true;
          this.$refs.alertFn.isworngFn(
            "温馨提示：您还没有选择您的税收居民身份类型，请先选择！"
          );
          return false;
        }
      } else {
        this.checkedSe = "1";
      }
      window.localStorage.setItem(
        "checkedData",
        JSON.stringify(this.checkedData)
      );
      this.iscredit = true;
      if (this.checkedSe == "1") {
        this.$router.push({ path: "/previewpage" });
      } else {
        this.$router.push({ path: "/policyholder2" });
      }
      //this.$router.push({ path: "/previewpage" });
    },
    codeClose() {
      this.iscredit = false;
    },
    //保存的内容
    saveContent() {
      let policyDataList = JSON.parse(
        window.localStorage.getItem("policyDataList")
      );
      let policyBenes = JSON.parse(window.localStorage.getItem("policyBenes"));
      console.log(policyBenes);

      if (
        policyBenes != "" &&
        policyBenes != undefined &&
        policyBenes != null
      ) {
        this.beneficiaryCode = "1";
        this.beneficiaryPeople = "指定受益人";
        console.log(policyDataList);
        console.log("success-------------------------------");
        this.orderDataList = policyBenes;
        this.ispeopleAdd = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ben_box {
  background-color: rgb(231, 231, 245);
  font-family: PingFangSC-Regular;
  min-height: 100%;
  width: 100%;
  .ben_hgroup {
    background-color: rgba(2, 173, 77, 0.15);
    color: rgb(2, 173, 77);
    text-align: center;
    line-height: 0.68rem;
    font-size: 0.34rem;
  }
  .ben_section {
    height: 2.1rem;
    font-family: PingFangSC-Regular;
    line-height: 2.1rem;
    background: #fff;
    position: relative;
    padding: 0 0.76rem 0 0.66rem;
    font-size: 0.47rem;
    color: #666666;
    display: flex;
    hgroup {
      flex: 1;
    }
    p {
      flex: 1;
      color: #333333;
      text-align: right;
    }
  }
  .ben_sectiontwo {
    height: 2.1rem;
    background: #fff;
    position: relative;
    padding: 0 0.76rem 0 0.66rem;
    display: flex;
    text-align: center;
    padding-top: 0.52rem;
    box-sizing: border-box;
    .ben_btn {
      width: 4.24rem;
      height: 1.06rem;
      border: 1px solid #02ad4d;
      color: #02ad4d;
      border-radius: 1.06rem;
      margin: 0 auto;
      background: #fff;
      font-size: 0.47rem;
    }
  }
  .tb_button {
    button {
      position: fixed;
      bottom: 0;
      z-index: 9;
    }
  }
  .ben_section:after {
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
  .ben_sectiontwo:before {
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
    left: 10px;
    right: 10px;
    z-index: 2;
  }
}
.addmen_style {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(231, 231, 245);
  //   .tb_button {
  //     button {
  //       position: inherit;
  //       bottom: 0;
  //     }
  //   }
}

//受益人顺序块
.add_box {
  .add_box_ul {
    .add_box_li {
      background-color: #fff;
      margin-top: 10px;
      hgroup {
        text-align: center;
        background: #fafafb;
        color: #333333;
        font-size: 0.42rem;
        line-height: 1.2rem;
      }
      ul {
        li {
          display: flex;
          justify-content: space-between;
          color: #666666;
          font-size: 0.42rem;
          padding: 0 15px;
          height: 1.4rem;
          line-height: 1.4rem;
          position: relative;
          p:last-child {
            padding-right: 15px;
          }
        }
      }
    }
  }
}
//小三角和横线样式
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
  top: 48%;
  right: 15px;
  margin-top: -4px;
}
.code_style {
  padding: 0.5rem 0.3rem;
  text-align: center;
  line-height: 0.75rem;
  position: relative;
  .code-close-icon {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 0.6rem;
    color: #c9c9c9;
  }
  .code_title {
    font-size: 0.46rem;
    color: #333333;
    text-align: center;
    font-family: PingFangSC-Medium;
    margin-bottom: 0.3rem;
  }
  .code_radio {
    display: flex;
    font-size: 0.4rem;
    width: 80%;
    margin: 0 auto;
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
      text-align: justify;
      flex: 1;
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
</style>


