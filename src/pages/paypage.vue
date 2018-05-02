<template>
    <div class="pp_box">
        <header class="bp_logo">
            <img src="../../static/img/tplogo.png" alt="" srcset="">
        </header>
        <section class="bp_content">
            <ul class="bp_ul_line">
                <li v-for="(bplist, index) in bplists" :key="index" class="bp_list" :class="bplist.linestyle">
                    <hgroup>{{ bplist.listleft }}</hgroup>
                    <p><span :class="bplist.stylefont">{{ bplist.listright }}</span>{{ bplist.listyuan }}</p>
                </li>
            </ul>
            <ul>
                <li v-for="(bplist, index) in bplistsTwo" :key="index" class="bp_list" :class="bplist.linestyle">
                    <hgroup>{{ bplist.listleft }}</hgroup>
                    <p><span :class="bplist.stylefont">{{ bplist.listright }}</span>{{ bplist.listyuan }}</p>
                </li>
            </ul>
            <ul>
                <li v-for="(bplist, index) in bplistsTree" :key="index" class="bp_list" :class="bplist.linestyle">
                    <hgroup>{{ bplist.listleft }}</hgroup>
                    <p><span :class="bplist.stylefont">{{ bplist.listright }}</span>{{ bplist.listyuan }}</p>
                </li>
            </ul>
        </section>
        <div class="bp_btn">
            <button @click="payFn">完成</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      bplists: [
        {
          listleft: "商品",
          listright: "太平个人税收递延型养老金保险",
          linestyle: "bp_line"
        },{
          listleft: "交易单号",
          listright: "887490287559087634",
          linestyle: "bp_line"
        },
        {
          listleft: "交易时间",
          listright: "2018-01-09 14:12:25",
          linestyle: "bp_line"
        },
        {
          listleft: "当前状态",
          listright: "支付成功",
          linestyle: "bp_line",
        }
      ],
      bplistsTwo: [
        {
          listleft: "联系商家",
          listright: "中国太平95589"
        }
      ],
      bplistsTree: [
        {
          listleft: "总价",
          listright: "￥1000"
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
.pp_box{
    width: 100%;
    height: 100%;
    background-color: rgb(239, 239, 244);
    overflow-y: auto;
}
.bp_logo {
  width: 100%;
  img {
    width: 100%;
  }
}
.bp_content {
  width: 100%;
  ul {
      background-color: #fff;
      margin-top: 10px;
      position: relative;
    li {
      position: relative;
    }
    .bp_list {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      line-height: 1.1rem;
      color: #666;
      font-size: 0.4rem;
      p {
        color: #333333;
        .resfont {
          color: #ff6333;
        }
      }
    }
  }
  ul:first-child{
      margin: 0;
  }
  .bp_ul_line:before {
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
    left: 0;
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
  padding: 0.97rem 0 0.53rem;
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