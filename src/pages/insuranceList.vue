<template>
    <div>
        <header class="tcl_header">
			<img :src="headerImg" width="100%"/>
		</header>
        <section class="tcl_list">
            <ul>
                <li v-for="(item, index) in contentList" :key="index" :class="item.className" @click="queryFn(index)">
                    <div class="tcl_list_img">
                        <img :src="item.contentIcon" alt="">
                    </div>
                    <p class="tcl_list_text">{{ item.contentName }}</p>
                </li>
            </ul>
        </section>
        <van-popup class="is-open-style" v-model="isOpen">账号未绑定</van-popup>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      isOpen: false,
      pageUrl: "https://tpwxcloud.life.cntaiping.com/wxqhb/", //跳转地址
      headerImg: "",
      headerImg1: require("../../static/img/titleImg01.png"),
      headerImg2: require("../../static/img/titleImg02.png"),
      headerImg3: require("../../static/img/titleImg03.png"),
      headerImg4: require("../../static/img/titleImg04.png"),
      headerImg5: require("../../static/img/titleImg05.png"),
      headerImg6: require("../../static/img/titleImg06.png"),
      contentList: []
    };
  },
  created() {
    this.insuranceFn({
      successCallback: result => {
        // console.log("Akuan===========>" + result);
      },
      failCallback: () => {
        // this.isOpen = true
      }
    });
  },
  mounted() {
    this.enterpage();
  },
  methods: {
    ...mapActions({
      insuranceFn: "INSURANCE"
    }),
    //进入页面赋值
    enterpage() {
      console.log(this.$route.query.id);
      // this.headerImg = this.headerImg + this.$route.query.id
      if (this.$route.query.id == 0) {
        this.headerImg = this.headerImg1;
        this.contentList = [
          {
            contentIcon: require("../../static/img/listIcon01.png"),
            contentName: "保单基本信息",
            className: "",
            pageUrlContent: "toPolicyList.html"
          },
          {
            contentIcon: require("../../static/img/listIcon02.png"),
            contentName: "保全变更记录",
            className: "hasLine",
            pageUrlContent: "bqChangeRecordList.html"
          }
        ];
      }
      if (this.$route.query.id == 1) {
        this.headerImg = this.headerImg2;
        this.contentList = [
          {
            contentIcon: require("../../static/img/listIcon01.png"),
            contentName: "账户价值查询",
            className: ""
          }
          // {
          //   contentIcon: require("../../static/img/listIcon02.png"),
          //   contentName: "保单价值查询",
          //   className: "hasLine"
          // },
          // {
          //   contentIcon: require("../../static/img/listIcon03.png"),
          //   contentName: "首期价值查询",
          //   className: "hasLine"
          // },
          // {
          //   contentIcon: require("../../static/img/listIcon04.png"),
          //   contentName: "续期价值查询",
          //   className: "hasLine"
          // },
          // {
          //   contentIcon: require("../../static/img/listIcon05.png"),
          //   contentName: "保全价值查询",
          //   className: "hasLine"
          // }
        ];
      }
      if (this.$route.query.id == 2) {
        this.headerImg = this.headerImg3;
      }
      if (this.$route.query.id == 3) {
        this.headerImg = this.headerImg4;
        this.contentList = [
          {
            contentIcon: require("../../static/img/listIcon01.png"),
            contentName: "首期账单查询",
            className: "",
            pageUrlContent: "sqbdlist.html"
          },
          {
            contentIcon: require("../../static/img/listIcon02.png"),
            contentName: "续期账单查询",
            className: "hasLine",
            pageUrlContent: "toXufeiAccount.html"
          },
          {
            contentIcon: require("../../static/img/listIcon03.png"),
            contentName: "保全账单查询",
            className: "hasLine",
            pageUrlContent: "bqbdlist.html"
          }
        ];
      }
      if (this.$route.query.id == 4) {
        this.headerImg = this.headerImg5;
        this.contentList = [
          {
            contentIcon: require("../../static/img/listIcon01.png"),
            contentName: "手机号码变更",
            className: "",
            pageUrlContent: "toSjbg.html"
          },
          {
            contentIcon: require("../../static/img/listIcon02.png"),
            contentName: "收费账号变更",
            className: "hasLine",
            pageUrlContent: "updatePolicy.html"
          },
          {
            contentIcon: require("../../static/img/listIcon03.png"),
            contentName: "收费地址变更",
            className: "hasLine",
            pageUrlContent: "charge.html"
          },
          {
            contentIcon: require("../../static/img/listIcon04.png"),
            contentName: "电子邮箱变更",
            className: "hasLine",
            pageUrlContent: "toYxbg.html"
          },
          {
            contentIcon: require("../../static/img/listIcon05.png"),
            contentName: "家庭信息变更",
            className: "hasLine",
            pageUrlContent: "toJtxxbg.html"
          },
          {
            contentIcon: require("../../static/img/listIcon06.png"),
            contentName: "单位信息变更",
            className: "hasLine",
            pageUrlContent: "toDwxxbg.html"
          }
        ];
      }
      if (this.$route.query.id == 5) {
        this.headerImg = this.headerImg6;
        this.contentList = [
          {
            contentIcon: require("../../static/img/listIcon01.png"),
            contentName: "理赔报案",
            className: "",
            pageUrlContent: "toEBaoAn.html"
          },
          {
            contentIcon: require("../../static/img/listIcon02.png"),
            contentName: "理赔流程",
            className: "hasLine",
            pageUrlContent: "toLiucheng.html"
          },
          {
            contentIcon: require("../../static/img/listIcon03.png"),
            contentName: "索赔材料",
            className: "hasLine",
            pageUrlContent: "toZliao.html"
          },
          {
            contentIcon: require("../../static/img/listIcon04.png"),
            contentName: "理赔问答",
            className: "hasLine",
            pageUrlContent: "toWenda.html"
          },
          {
            contentIcon: require("../../static/img/listIcon05.png"),
            contentName: "案件进度",
            className: "hasLine",
            pageUrlContent: "toCasemx.html"
          },
          {
            contentIcon: require("../../static/img/listIcon06.png"),
            contentName: "医院信息",
            className: "hasLine",
            pageUrlContent: "toyiyuancx.html"
          }
        ];
      }
      // switch (this.$route.query.id) {
      //   case 0:

      //     break;
      //   case 0:
      //     this.headerImg = this.headerImg2;
      //     break;
      //   case 0:
      //     this.headerImg = this.headerImg3;
      //     break;
      //   case 0:
      //     this.headerImg = this.headerImg4;
      //     break;
      //   case 0:
      //     this.headerImg = this.headerImg5;
      //     break;
      //   case 0:
      //     this.headerImg = this.headerImg6;
      //     break;
      // }
    },
    //跳转页面
    queryFn(index) {
      console.log(this.$route.query.id);
      // console.log(index);
      if (this.$route.query.id == 1) {
        switch (index) {
          case 0:
            this.$router.push({ path: "/accountpage" });

            break;
          default:
          // console.log(index);
        }
      } else {
        window.location.href =
          this.pageUrl + this.contentList[index].pageUrlContent;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tcl_header {
  box-sizing: border-box;
}
.tcl_list {
  ul {
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    li {
      display: flex;
      position: relative;
      padding: 0.33rem 0 0.3rem 0.27rem;
      height: 1.6rem;
      color: #454444;
      box-sizing: border-box;
      .tcl_list_img {
        width: 8%;
        line-height: 0.95rem;
        img {
          width: 100%;
        }
      }
      .tcl_list_text {
        flex: 1;
        line-height: 1rem;
        text-indent: 1.3em;
      }
    }
    li:after {
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
    li.hasLine:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
      z-index: 2;
    }
  }
  ul:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  ul:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
</style>