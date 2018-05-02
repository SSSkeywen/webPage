<template>
    <div class="rp_box">
        <ul class="rp_ul">
            <li v-for="(recordItem, index) in recordData" :key="index">
                <hgroup class="rp_title">
                    <p class="rp_title_num">投保单号：<span>{{ recordItem.bdnumber }}</span></p>
                    <p class="rp_title_zt">{{ recordItem.bdstate }}</p>
                </hgroup>
                <div class="rp_content line">
                    <div class="rp_min_img">

                    </div>
                    <div class="rp_min_content">
                        <hgroup>{{ recordItem.bdName }}</hgroup>
                        <div>
                            <p>{{ recordItem.bbTime }}</p>
                            <p>¥ {{ recordItem.bdMoney }}</p>
                        </div>
                    </div>
                </div>
                <div class="rp_pay line" v-if="recordItem.bdstate == '待支付'">
                    <button>立即支付</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recordData: [
                {
                    bdnumber: '006012345676388',
                    bdstate: '待支付',
                    bdName: '太平个人税收递延型养老年金保险',
                    bbTime: '2017-12-12 16:00',
                    bdMoney: '10,000.00'
                },{
                    bdnumber: '006012345676388',
                    bdstate: '已支付',
                    bdName: '太平个人税收递延型养老年金保险',
                    bbTime: '2017-12-12 16:00',
                    bdMoney: '10,000.00'
                },{
                    bdnumber: '006012345676388',
                    bdstate: '已生效',
                    bdName: '太平个人税收递延型养老年金保险',
                    bbTime: '2017-12-12 16:00',
                    bdMoney: '10,000.00'
                }
            ]
        }
    },
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
</style>