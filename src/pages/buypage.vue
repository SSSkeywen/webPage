<template>
    <div>
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
                <li v-for="(bplist, index) in bplistsTwo" :key="index" class="bp_list" :class="bplist.linestyle">
                    <hgroup>{{ bplist.listleft }}</hgroup>
                    <p><span :class="bplist.stylefont">{{ bplist.listright }}</span>{{ bplist.listyuan }}</p>
                </li>
            </ul>
            <div class="bpclause bp_line">
                <div class="bp_checked">
                    <img src="../../static/img/checkedicon.png" alt="" srcset="">
                </div>
                <p class="bp_clause_content">我已查阅<a>《保费自动转账授权声明》</a>，并同意授权从该银行账户自动扣取各期保费</p>
            </div>
        </section>
        <div class="bp_btn">
            <button @click="payFn">支付</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      bplists: [
        {
          listleft: "订单号",
          listright: "887490287559087634",
          linestyle: "bp_line"
        },
        {
          listleft: "保险名称",
          listright: "太平百万医疗",
          linestyle: "bp_line"
        },
        {
          listleft: "应付金额",
          listright: "200.00",
          linestyle: "bp_line",
          stylefont: "resfont",
          listyuan: "元"
        }
      ],
      bplistsTwo: [
        {
          listleft: "持卡人",
          listright: "张三",
          linestyle: "bp_line"
        },
        {
          listleft: "开户银行",
          listright: "请选择",
          linestyle: "bp_line"
        },
        {
          listleft: "银行卡号",
          listright: "请输入持卡人本人的银行卡",
          linestyle: "bp_line"
        }
      ]
    };
  },
  methods: {
    payFn() {
      this.$router.push({ path: '/paypage'})
    }
  },
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
        .resfont {
          color: #ff6333;
        }
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
        margin-bottom: 2px;
      }
    }
    .bp_clause_content {
      font-size: 0.37rem;
      color: #999999;
      margin-left: 15px;
      flex: 0.95;
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
</style>