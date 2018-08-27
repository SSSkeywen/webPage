<template>
    <div class="tcz_box">
        <header class="tcz_header">
            <img :src="headerImg" width="100%">
            <div class="tcz_title" ref="scales">
                <p>{{ totalSum }}</p>
                <p>账户总价值（元）</p>
            </div>
        </header>
        <section class="tcz_list">
            <ul>
                <li v-for="(item, index) in contentList" :key="index" @click="detailsFn(index)">
                    <div class="tcz_list_content">
                        <div class="tcz_list_one">
                            <img :src="item.iconOne" alt="">
                        </div>
                        <div class="tcz_list_two">
                            <p>{{ item.nameContent }}款账户价值（元）</p>
                            <p>{{ item.contentNo }}</p>
                        </div>
                        <div class="tcz_list_three1">
                            <img :src="enterIcon" width="100%">
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      jumpNewPage: false,
      totalSum: "0",
      accountData: "",
      isBuyC: false,
      headerImg: require("../../static/img/zh_beader_bg.png"),
      enterIcon: require("../../static/img/zhixiang.png"),
      contentList: [
        {
          iconOne: require("../../static/img/tczIconA.png"),
          nameContent: "A",
          contentNo: "0"
        },
        {
          iconOne: require("../../static/img/tczIconB.png"),
          nameContent: "B1",
          contentNo: "0"
        },
        {
          iconOne: require("../../static/img/tczIconC.png"),
          nameContent: "C",
          contentNo: "0"
        }
      ]
    };
  },
  created() {
    // this.accountA();
    // this.accountB();
    // this.accountC();
    this.insuranceFn({
        successCallback: (result) => {
          this.accountData = JSON.parse(window.localStorage.getItem("account"));
    if (
      this.accountData != "" &&
      this.accountData != undefined &&
      this.accountData != null
    ) {
      this.totalSum = this.accountData.countAccountValue;
      this.contentList[0].contentNo = this.accountData.mapA.universalValue;
      this.contentList[1].contentNo = this.accountData.mapB.universalValue;
      // this.contentList[2].contentNo = eval(this.accountData.mapC.castTotalReceiveAmount) * eval(this.accountData.mapC.accumunits)
      if (
        this.contentList[2].contentNo != NaN ||
        this.contentList[2].contentNo != "NaN" ||
        this.contentList[2].contentNo != undefined ||
        this.contentList[2].contentNo != ""
      ) {
        this.contentList[2].contentNo = this.accountData.accountValueC;
      } else {
        this.contentList[2].contentNo = "0";
      }
    } else {
      this.totalSum = '0';
      this.contentList[0].contentNo = "0";
      this.contentList[1].contentNo = "0";
      this.contentList[2].contentNo = "0";
      this.jumpNewPage = true
    }
        },
        failCallback: () => {
        }
      });
    

    // if(this.accountData.mapC.universalValue != '' ||this.accountData.mapC.universalValue != undefined ||this.accountData.mapC.universalValue != null ){
    //   this.contentList[2].contentNo = this.accountData.mapC.universalValue;
    //   this.isBuyC = true
    // }else{
    //   this.contentList[2].contentNo = '0'
    //   this.isBuyC = false
    // }
  },
  mounted() {
    // setTimeout(() => {
    //   this.totalSum =
    //     eval(this.contentList[0].contentNo) + eval(this.contentList[1].contentNo) + eval(this.contentList[2].contentNo);

    // },500);
    // setTimeout(() =>{
    this.$refs.scales.style.height = this.$refs.scales.offsetWidth + "px";
    this.$refs.scales.style.left =
      (window.innerWidth - this.$refs.scales.offsetWidth) / 2 + "px";
    // },550)
  },
  methods: {
    ...mapActions({
      insuranceFn: "INSURANCE"
    }),

    //跳转到账户价值详情页面
    detailsFn(index) {
      // if(this.isBuyC && index == '2'){
      //   return false
      // }
      if(this.jumpNewPage){
        return false
      }
        // return this.jumpNewPage
      this.$router.push({ path: "/details", query: { id: index } });
    },
    //A款数据请求
    accountA() {
      let insuranceData = new FormData();
      insuranceData.append("productId", "4014");
      // insuranceData.append("typt", "app");
      this.insuranceFn({
        insuranceData,
        successCallback: result => {
          // console.log("Akuan===========>" + result);
          this.contentList[0].contentNo = result.universalValue;
          window.localStorage.setItem("accountA", JSON.stringify(result));
        },
        failCallback: () => {}
      });
    },
    //B款数据请求
    accountB() {
      let insuranceData = new FormData();
      insuranceData.append("productId", "4014");
      this.insuranceFn({
        insuranceData,
        successCallback: result => {
          // console.log("Bkuan===========>" + result);
          this.contentList[1].contentNo = result.universalValue;
          window.localStorage.setItem("accountB", JSON.stringify(result));
        },
        failCallback: () => {}
      });
    },
    //C款数据请求
    accountC() {
      let insuranceData = new FormData();
      insuranceData.append("productId", "4015");
      this.insuranceFn({
        insuranceData,
        successCallback: result => {
          console.log(result);
          if (
            result.universalValue == "" ||
            result.universalValue == undefined ||
            result.universalValue == null
          ) {
            this.isBuyC = false;
            this.contentList[2].contentNo = "0";
            return false;
          } else {
            this.isBuyC = true;
          }
          this.contentList[2].contentNo = result.universalValue;
          window.localStorage.setItem("accountC", JSON.stringify(result));
        },
        failCallback: () => {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tcz_box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f3f3f5;
}
.tcz_header {
  position: relative;
  .tcz_title {
    position: absolute;
    top: 0.67rem;
    left: 28%;
    text-align: center;
    color: #fff;
    padding: 0.47rem;
    border: 0.24rem solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-sizing: border-box;
    p {
      font-size: 0.32rem;
      margin-top: 0.13rem;
    }
    p:first-child {
      margin-top: 26%;
      font-size: 0.86rem;
    }
  }
}
.tcz_list {
  margin-top: -1.45rem;
  ul {
    overflow: hidden;
    position: relative;
    li {
      background-color: #ffffff;
      height: 3.1rem;
      border-radius: 7px;
      box-shadow: 0 2px 1px #e9e8e8 inset;
      .tcz_list_content {
        height: 3.1rem;
        border-radius: 7px;
        -webkit-border-radius: 7px;
        box-shadow: 0 -3px 1px #f3f3f5 inset;
        -webkit-box-shadow: 0 -3px 1px #f3f3f5 inset;
        display: flex;
        display: inline-flex;
        display: -webkit-flex;
        padding: 0.4rem 0.77rem;
        box-sizing: border-box;
        line-height: 2.3rem;
        .tcz_list_one {
          width: 12%;
          img {
            width: 100%;
          }
        }
        .tcz_list_two {
          flex: 1;
          text-indent: 0.73rem;
          line-height: 0.87rem;
          color: #6d6c6c;
          p:first-child {
            margin-top: 0.27rem;
            color: #9b9b9b;
            font-size: 0.48rem;
          }
          p:last-child {
            color: #4a4a4a;
            font-size: 0.71rem;
            font-family: "Helveticaiii";
          }
        }
        .tcz_list_three1 {
          width: 0.66rem;
          height: 0.66rem;
          margin-top: 0.77rem;
          img {
            display: block;
          }
        }
      }
    }
  }
}
</style>