<template>
    <div class="rp_box">
        <ul class="rp_ul" v-if="isHasList">
            <li v-for="(recordItem, index) in recordData" :key="index">
                <hgroup class="rp_title">
                    <p class="rp_title_num">投保单号：<span>{{ recordItem.applicationCode }}</span></p>
                    <p class="rp_title_zt">{{ recordItem.bdstate }}</p>
                </hgroup>
                <div class="rp_content line">
                    <div class="rp_min_img">
                      <img :src="listImg" alt="">
                    </div>
                    <div class="rp_min_content">
                        <hgroup>{{ recordItem.bdName }}</hgroup>
                        <div>
                            <p>{{ recordItem.time }}</p>
                            <p>¥ {{ recordItem.money }}</p>
                        </div>
                    </div>
                </div>
                <div class="rp_pay line" v-if="recordItem.bdstate == '待支付'">
                    <button @click="payMany(index)">立即支付</button>
                </div>
            </li>
        </ul>
        <div v-else>
          <p class="nothing">当前没有购买记录！</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      isHasList: true,
      listImg: require('../../static/img/suicon.png'),
      recordData: [
        // {
        //   bdnumber: "006012345676388",
        //   bdstate: "待支付",
        //   bdName: "太平个人税收递延型养老年金保险",
        //   bbTime: "2017-12-12 16:00",
        //   bdMoney: "10,000.00"
        // },
        // {
        //   bdnumber: "006012345676388",
        //   bdstate: "已支付",
        //   bdName: "太平个人税收递延型养老年金保险",
        //   bbTime: "2017-12-12 16:00",
        //   bdMoney: "10,000.00"
        // },
        // {
        //   bdnumber: "006012345676388",
        //   bdstate: "已生效",
        //   bdName: "太平个人税收递延型养老年金保险",
        //   bbTime: "2017-12-12 16:00",
        //   bdMoney: "10,000.00"
        // }
      ]
    };
  },
  created() {
    let openidList = JSON.parse(window.localStorage.getItem("openidList"));
    console.log(openidList.openId);

    let applistData = new FormData();
    applistData.append("open_id", openidList.openId);
    this.applistFN({
      applistData,
      successCallback: result => {
        console.log(result);
        this.isHasList = true;
        for (let item of result) {
          item.bdName = "太平个人税收递延型养老年金保险";
          if (item.applyState == "2") {
            item.bdstate = "待支付";
          } else if (item.applyState == "1") {
            item.bdstate = "支付处理中";
          } else if (item.applyState == "3") {
            item.bdstate = "已支付待承保";
          } else if (item.applyState == "7") {
            item.bdstate = "已撤销";
          } else {
            item.bdstate = "已生效";
          }
        }
        this.recordData = result;
        //   toast1.clear();
        //   this.$router.push({ path: "/buypage" })
      },
      failCallback: result => {
        this.isHasList = false;
        //   toast1.clear();
        //   this.$refs.alertFn.isworngFn(result);
      }
    });
  },
  methods: {
    ...mapActions({
      applistFN: "APPLIST"
    }),
    payMany(index) {
      console.log(this.recordData[index]);
      
      window.localStorage.setItem("recordData", JSON.stringify(this.recordData[index]));
      this.$router.push({ path: "/buypagetwo" })
    }
  }
};
</script>

<style lang="scss" scoped>
.rp_box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(231, 231, 245);
  .rp_ul {
    li {
      margin-top: 0.25rem;
      background-color: #fff;
      position: relative;
      font-size: 0.37rem;
      color: #999999;
      .rp_title {
        line-height: 1rem;
        padding: 0 15px;
        font-size: 0.37rem;
        color: #999999;
        display: flex;
        justify-content: space-between;
        .rp_title_zt {
          color: #02ad4d;
        }
      }
      .rp_content {
        position: relative;
        padding: 10px 15px;
        display: flex;
        .rp_min_img {
          width: 1.4rem;
          height: 1.4rem;
          background: #d8d8d8;
          border: 1px solid #979797;
          img{
            width: 100%;
          }
        }
        .rp_min_content {
          margin-left: 0.265rem;
          line-height: 0.7rem;
          flex: 1;
          hgroup {
            color: #333333;
            font-size: 0.4rem;
          }
          div {
            display: flex;
            justify-content: space-between;
            margin-top: 3px;
          }
        }
      }
      .rp_pay {
        position: relative;
        text-align: right;
        padding: 10px 15px;
        button {
          width: 2.75rem;
          height: 0.76rem;
          border: 1px solid #02ad4d;
          border-radius: 0.76rem;
          background-color: #fff;
          color: #02ad4d;
        }
      }
    }
    .line:before {
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
  }
}
.nothing{
  padding: .5rem;
}
</style>