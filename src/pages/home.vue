<template>
  <div class="home_box">
    <header class="tc_banner">
        <img :src="headerImg"/>
    </header>
    <section class="tc_content_list">
        <ul>
            <li v-for="(item, index) in contentList" :key="index" @click="goShopping(index)">
                <div class="tc_img_top">
                    <img :src="item.contentIcon"/>
                </div>
                <p class="tc_text_bottom">{{ item.contentName }}</p>
            </li>
        </ul>
    </section>
    <section class="tc_list_one">
        <ul>
            <li v-for="(itemTow, index) in contentListTwo" :key="index" :class="itemTow.hasLine" @click="policyFn(index)">
                <div class="tc_list_top">
                    <img :src="itemTow.contentTwoIocn" alt="">
                </div>
                <p class="tc_list_bottom">{{ itemTow.contentTwoName }}</p>
            </li>
        </ul>
    </section>
    <section class="tc_list_one">
        <ul>
            <li v-for="(itemTow, index) in contentListThree" :key="index" :class="itemTow.hasLine" @click="policyFn(index+4)">
                <div class="tc_list_top">
                    <img :src="itemTow.contentTwoIocn" alt="">
                </div>
                <p class="tc_list_bottom">{{ itemTow.contentTwoName }}</p>
            </li>
        </ul>
    </section>
    <!-- <van-button type="default">默认按钮</van-button> -->
    <alertWrong ref="alertFn"></alertWrong>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import alertWrong from "../components/alertWrong.vue";
export default {
  data() {
    return {
      isOpen: false,
      pageUrl: "https://tpwxcloud.life.cntaiping.com/wxqhb/", //跳转地址
      headerImg: require("../../static/img/banner_one.jpg"),
      contentList: [
        {
          contentIcon: require("../../static/img/list_icon_one.png"),
          contentName: "产品介绍"
        },
        {
          contentIcon: require("../../static/img/list_icon_two.png"),
          contentName: "利益演示"
        },
        {
          contentIcon: require("../../static/img/list_icon_three.png"),
          contentName: "我要购买"
        }
      ],
      contentListTwo: [
        {
          contentTwoIocn: require("../../static/img/icon01.png"),
          contentTwoName: "我的保单",
          hasLine: ""
        },
        {
          contentTwoIocn: require("../../static/img/icon02.png"),
          contentTwoName: "账户价值查询",
          hasLine: "hasLine"
        },
        {
          contentTwoIocn: require("../../static/img/icon03.png"),
          contentTwoName: "缴费变更",
          hasLine: "hasLine"
        },
        {
          contentTwoIocn: require("../../static/img/icon04.png"),
          contentTwoName: "账单及发票",
          hasLine: "hasLine"
        }
      ],
      contentListThree: [
        {
          contentTwoIocn: require("../../static/img/icon05.png"),
          contentTwoName: "保全通",
          hasLine: ""
        },
        {
          contentTwoIocn: require("../../static/img/icon06.png"),
          contentTwoName: "理赔通",
          hasLine: "hasLine"
        }
      ]
    };
  },
  components:{alertWrong},
  mounted(){
    // this.insuranceFn({
    //     successCallback: (result) => {
          
    //     },
    //     failCallback: () => {
    //     }
    //   });
  },
  methods: {
    ...mapActions({
      insuranceFn: "INSURANCE"
    }),
    goShopping(index) {
      if (index == "2") {
        window.localStorage.removeItem("messageDataList");
        window.localStorage.removeItem("buyList");
        window.localStorage.removeItem("policyBenes");
        window.localStorage.removeItem("policyDataList");
        window.localStorage.removeItem("questScore");
        window.localStorage.removeItem("recordData");
        window.localStorage.removeItem("answerData");
        window.localStorage.removeItem("checkedData");
        window.localStorage.removeItem("nonResidentTax");
        this.$router.push({ path: "/tbmessage" });
      }
      if (index == "1") {
        window.location.href = "TaxExtension_Index.html";
      }
      if (index == "0") {
        window.location.href = "TaxExtensionactivities.html";
      }
    },
    policyFn(index) {
      // switch(index){
      //     case 0:
      if (index == "2") {
        this.$refs.alertFn.isworngFn("该功能尚未开放，敬请期待。");
        return false;
      }
      if (index == "1") {
        window.location.href = 'accountQueryIndexPage.html'
        return false;
      }
      this.$router.push({ path: "/insuranceList", query: { id: index } });
      //     break;
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
.home_box {
  background: #f3f3f5;
  height: 100%;
  overflow-y: auto;
  font-size: 0.4rem;
}
.tc_banner {
  img {
    width: 100%;
  }
}
.tc_content_list {
  // margin-top: 0.15rem;
  background: #fff;
  padding: 0.43rem 0.35rem 0.41rem;
  ul {
    display: flex;
    font-size: 0.4rem;
    li {
      flex: 1;
      text-align: center;
    }
    .tc_img_top {
      img {
        width: 1.47rem;
      }
    }
    .tc_text_bottom {
      margin-top: 0.21rem;
      font-size:0.37rem;
      color:rgba(51,51,51,1);
    }
  }
}
.tc_list_one {
  margin-top: 0.13rem;
  ul {
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    li {
      display: flex;
      position: relative;
      padding: 0.19rem 0 0.19rem 0.27rem;
      height: 1.47rem;
      box-sizing: border-box;
      .tc_list_top {
        width: 1.56rem;
        img {
          width: 1.09rem;
          float: right;
        }
      }
      .tc_list_bottom {
        flex: 1;
        line-height: 1.09rem;
        text-indent: 1.3em;
        font-size:0.37rem;
        color:rgba(51,51,51,1);
      }
    }
    li.hasLine:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid rgba(221,221,221,1);
      color: rgba(221,221,221,1);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 0.61rem;
      z-index: 2;
    }
  }
  // ul:before {
  //   content: " ";
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   height: 1px;
  //   border-top: 1px solid #e5e5e5;
  //   color: #e5e5e5;
  //   -webkit-transform-origin: 0 0;
  //   transform-origin: 0 0;
  //   -webkit-transform: scaleY(0.5);
  //   transform: scaleY(0.5);
  //   z-index: 2;
  // }
  // ul:after {
  //   content: " ";
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   height: 1px;
  //   border-bottom: 1px solid #e5e5e5;
  //   color: #e5e5e5;
  //   -webkit-transform-origin: 0 100%;
  //   transform-origin: 0 100%;
  //   -webkit-transform: scaleY(0.5);
  //   transform: scaleY(0.5);
  //   z-index: 2;
  // }
}
.is-open-style {
  width: 8rem;
  padding: 10px;
  text-align: center;
  border-radius: 7px;
}
</style>


